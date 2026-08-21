// calcularEconomiaSolar.ts

import { calculateNPV, tir } from '@/utils/financialCalculations';
import {
    PREMISSAS_SOLAR,
    PremissasSolar,
    calcularPrecoPadrao,
    getPercentualFioB,
} from './premissasSolar';

export interface DadoAcumulado {
  Ano: number;
  EconomiaBruta: number;
  CustoFioB: number;
  ReservaOM: number;
  Payback: number;
  CustoSemSolar: number;
}

// Extensão do tipo de premissas com os valores específicos da rodada de cálculo
export type PremissasSolarComValoresCalculo = PremissasSolar & {
  custoMensalRs: number;
  percentualConsumoDiurno: number;
  percentualReservaOMPósPayback: number;
};

export interface ResultadoCalculoEconomia {
  text_payback: string;
  data: DadoAcumulado[];
  dataResume: DadoAcumulado[];
  potenciaEstimadaKwp: number;
  investimentoEstimado: number;
  custoMensalInformado: number;
  economiaAcumulada: number;
  custoFioBTotal: number;
  reservaOMTotal: number;
  retornoLiquidoReal: number;
  tir: number;
  vpl: number;
  roi: number;
  taxCostReduct: number;
  projecao: number;
  error?: string;
  premissas: PremissasSolarComValoresCalculo; // Tipagem atualizada para o retorno completo
}

/**
 * Função principal para realização de cálculos de economia solar fotovoltaica.
 */
export function calcularEconomiaSolar(
  custoMensalRs: number,
  percentualConsumoDiurno: number = 0.3, // 30% consumo direto, 70% injetado na rede
  percentualReservaOMPósPayback: number = 0.05, // 5% após o payback
  premissasCustomizadas?: Partial<PremissasSolar>,
): ResultadoCalculoEconomia {
  // Fusão garantindo a precedência correta dos argumentos de chamada
  const premissas: PremissasSolarComValoresCalculo = {
    ...PREMISSAS_SOLAR,
    ...premissasCustomizadas,
    custoMensalRs,
    percentualConsumoDiurno,
    percentualReservaOMPósPayback,
  };

  if (!custoMensalRs || custoMensalRs < 300 || custoMensalRs > 999999999.99) {
    return {
      error: 'Custo mensal inválido',
      text_payback: 'N/A',
      data: [],
      dataResume: [],
      potenciaEstimadaKwp: 0,
      investimentoEstimado: 0,
      custoMensalInformado: custoMensalRs || 0,
      economiaAcumulada: 0,
      custoFioBTotal: 0,
      reservaOMTotal: 0,
      retornoLiquidoReal: 0,
      tir: 0,
      vpl: 0,
      roi: 0,
      taxCostReduct: 0,
      projecao: premissas.VIDA_UTIL_SISTEMA_ANOS,
      premissas: premissas,
    };
  }

  const pctDiurno = Math.min(Math.max(percentualConsumoDiurno, 0), 1);
  const pctInjetado = 1 - pctDiurno;

  // 1. Consumo e Dimensionamento
  const consumoTotalKwhMes = custoMensalRs / premissas.TAXA_ENERGIA_RS_KWH;
  const consumoTotalKwhAno = consumoTotalKwhMes * 12;
  const consumoMediaKwhDia = consumoTotalKwhAno / 365.25;

  const eficienciaSistema = 1 - premissas.PERDA_SISTEMA_PERCENT / 100;

  const potenciaSistemaKwpNecessaria =
    consumoMediaKwhDia / (premissas.IRRADIACAO_MEDIA_ANUAL_KWH_M2_DIA * eficienciaSistema);

  const quantidadePaineis = Math.ceil(
    potenciaSistemaKwpNecessaria / (premissas.POTENCIA_PAINEL_W / 1000),
  );

  const potenciaRealSistemaKwp = quantidadePaineis * (premissas.POTENCIA_PAINEL_W / 1000);

  const geracaoAno1Kwh =
    potenciaRealSistemaKwp *
    premissas.IRRADIACAO_MEDIA_ANUAL_KWH_M2_DIA *
    365.25 *
    eficienciaSistema;

  const investimento = calcularPrecoPadrao(custoMensalRs) || 0;
  const anoAtualReal = new Date().getFullYear();

  // Ano 0: Saldo Inicia Negativo no valor do investimento
  const acumulado: DadoAcumulado[] = [
    {
      Ano: anoAtualReal,
      EconomiaBruta: 0,
      CustoFioB: 0,
      ReservaOM: 0,
      Payback: Number((-1 * investimento).toFixed(2)),
      CustoSemSolar: 0,
    },
  ];

  let saldoCaixaAcumulado = -investimento;
  let economiaBrutaAcumulada = 0;
  let custoFioBAcumulado = 0;
  let reservaOMAcumulada = 0;
  let custoEvitadoSemSolar = 0;
  let paybackAnos = 0;
  let geracaoAnoAtual = geracaoAno1Kwh;

  const fc: number[] = [-1 * investimento];

  for (let ano = 1; ano <= premissas.VIDA_UTIL_SISTEMA_ANOS; ano++) {
    const anoCalendario = anoAtualReal + (ano - 1);
    const tarifaBrutaAno =
      premissas.TAXA_ENERGIA_RS_KWH * Math.pow(1 + premissas.INFLACAO_ENERGIA_ANUAL, ano - 1);

    // Custo do Fio B por kWh no ano vigente
    const valorFioBCheioKwh = tarifaBrutaAno * premissas.PERCENTUAL_FIO_B_NA_TARIFA;
    const custoFioBKwh = valorFioBCheioKwh * getPercentualFioB(anoCalendario);

    // Economia Bruta do ano (sem descontos)
    const economiaBrutaAno = geracaoAnoAtual * tarifaBrutaAno;
    economiaBrutaAcumulada += economiaBrutaAno;

    // Desconto do Fio B incidindo sobre a fatia injetada
    const custoFioBAno = geracaoAnoAtual * pctInjetado * custoFioBKwh;
    custoFioBAcumulado += custoFioBAno;

    // Economia líquida do ano antes da Reserva de O&M
    const economiaLiquidaAno = economiaBrutaAno - custoFioBAno;

    // Reserva O&M só incide se o saldo já estiver positivo ou após cruzar o zero
    let reservaOMAno = 0;
    if (saldoCaixaAcumulado + economiaLiquidaAno > 0) {
      reservaOMAno = economiaLiquidaAno * percentualReservaOMPósPayback;
    }
    reservaOMAcumulada += reservaOMAno;

    // Saldo Final do Ano
    const ganhoLiquidoRealAno = economiaLiquidaAno - reservaOMAno;
    saldoCaixaAcumulado += ganhoLiquidoRealAno;

    fc.push(ganhoLiquidoRealAno);

    const custoSemSolarAno = consumoTotalKwhAno * tarifaBrutaAno;
    custoEvitadoSemSolar += custoSemSolarAno;

    if (paybackAnos === 0 && saldoCaixaAcumulado >= 0) {
      paybackAnos = ano;
    }

    acumulado.push({
      Ano: anoAtualReal + ano,
      EconomiaBruta: Number(economiaBrutaAcumulada.toFixed(2)),
      CustoFioB: Number(custoFioBAcumulado.toFixed(2)),
      ReservaOM: Number(reservaOMAcumulada.toFixed(2)),
      Payback: Number(saldoCaixaAcumulado.toFixed(2)),
      CustoSemSolar: Number(custoEvitadoSemSolar.toFixed(2)),
    });

    const taxaDegradacao =
      ano === 1 ? premissas.DEGRADACAO_PAINEL_ANO1 : premissas.DEGRADACAO_PAINEL_ANOS_SEGUINTES;
    geracaoAnoAtual *= 1 - taxaDegradacao;
  }

  const indices = [0, 1, 2, 3, 4, 9, 14, 19, premissas.VIDA_UTIL_SISTEMA_ANOS - 1].filter(
    (i) => i < acumulado.length,
  );
  const dataResume = indices.map((index) => acumulado[index]);

  let textPayback = `Mais de ${premissas.VIDA_UTIL_SISTEMA_ANOS} anos`;
  if (paybackAnos > 0) {
    textPayback = paybackAnos <= 1 ? `Menos de 1 ano` : `~ ${paybackAnos} anos`;
  }

  const reduction = (economiaBrutaAcumulada / custoEvitadoSemSolar) * 100;
  const roi_calc = investimento > 0 ? (saldoCaixaAcumulado / investimento) * 100 : 0;
  const vpl_calc = calculateNPV(premissas.TAXA_DESCONTO_VPL, fc);
  const tir_calc = tir(fc);

  return {
    text_payback: textPayback,
    data: acumulado,
    dataResume: dataResume,
    potenciaEstimadaKwp: Number(potenciaRealSistemaKwp.toFixed(2)),
    investimentoEstimado: investimento,
    custoMensalInformado: custoMensalRs,
    economiaAcumulada: Number(economiaBrutaAcumulada.toFixed(2)),
    custoFioBTotal: Number(custoFioBAcumulado.toFixed(2)),
    reservaOMTotal: Number(reservaOMAcumulada.toFixed(2)),
    retornoLiquidoReal: Number(saldoCaixaAcumulado.toFixed(2)),
    tir: tir_calc,
    vpl: vpl_calc,
    roi: roi_calc,
    taxCostReduct: Number(reduction.toFixed(2)),
    projecao: premissas.VIDA_UTIL_SISTEMA_ANOS,
    premissas: premissas,
  };
}