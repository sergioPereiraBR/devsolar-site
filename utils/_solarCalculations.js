import { calculateNPV, tir } from '@/utils/financialCalculations';

import { CalculadorPrecoDinamico } from './CalculadorPrecoDinamico';

const DADOS_FAIXAS_PADRAO = [
  { valor_faixa: 12000.0, conta_de: 400.0, conta_ate: 499.99 },
  { valor_faixa: 13000.0, conta_de: 500.0, conta_ate: 699.99 },
  { valor_faixa: 15000.0, conta_de: 700.0, conta_ate: 899.99 },
  { valor_faixa: 17000.0, conta_de: 900.0, conta_ate: 1099.99 },
  { valor_faixa: 19000.0, conta_de: 1100.0, conta_ate: 1199.99 },
  { valor_faixa: 22000.0, conta_de: 1200.0, conta_ate: 1399.99 },
  { valor_faixa: 24000.0, conta_de: 1400.0, conta_ate: 1599.99 },
  { valor_faixa: 26000.0, conta_de: 1500.0, conta_ate: 1799.99 },
];

const calculadorPrecoPadrao = new CalculadorPrecoDinamico(DADOS_FAIXAS_PADRAO);

function calcularPrecoPadrao(valorConta) {
  try {
    return calculadorPrecoPadrao.calcular(valorConta);
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Percentual de cobrança da TUSD Fio B conforme Marco Legal (Lei 14.300/2022)
function getPercentualFioB(ano) {
  if (ano <= 2022) return 0;
  if (ano === 2023) return 0.15;
  if (ano === 2024) return 0.3;
  if (ano === 2025) return 0.45;
  if (ano === 2026) return 0.6;
  if (ano === 2027) return 0.75;
  if (ano === 2028) return 0.9;
  return 1.0; // 2029 em diante: 100%
}

export function calcularEconomiaSolar(
  custoMensalRs,
  percentualConsumoDiurno = 0.3, // 30% consumo direto (sem Fio B), 70% injetado na rede
  percentualReservaOMPósPayback = 0.05, // 5% de reserva O&M aplicada após o payback
) {
  const TAXA_ENERGIA_RS_KWH = 1.18;
  const PERCENTUAL_FIO_B_NA_TARIFA = 0.28; // Fio B equivale a ~28% da tarifa total
  const PERDA_SISTEMA_PERCENT = 25;
  const POTENCIA_PAINEL_W = 620;
  const INFLACAO_ENERGIA_ANUAL = 0.06;
  const TAXA_DESCONTO_VPL = 0.1;
  const DEGRADACAO_PAINEL_ANO1 = 0.02;
  const DEGRADACAO_PAINEL_ANOS_SEGUINTES = 0.0055;
  const VIDA_UTIL_SISTEMA_ANOS = 25;

  if (!custoMensalRs || custoMensalRs < 300 || custoMensalRs > 999999999.99) {
    return {
      error: 'Custo mensal inválido',
      dataResume: [],
      text_payback: 'N/A',
    };
  }

  const pctDiurno = Math.min(Math.max(percentualConsumoDiurno, 0), 1);
  const pctInjetado = 1 - pctDiurno;

  // 1. Consumo e Dimensionamento
  const consumoTotalKwhMes = custoMensalRs / TAXA_ENERGIA_RS_KWH;
  const consumoTotalKwhAno = consumoTotalKwhMes * 12;
  const consumoMediaKwhDia = consumoTotalKwhAno / 365.25;

  const eficienciaSistema = 1 - PERDA_SISTEMA_PERCENT / 100;
  const irradiacaoMediaAnualKwhM2Dia = 5.5;

  const potenciaSistemaKwpNecessaria =
    consumoMediaKwhDia / (irradiacaoMediaAnualKwhM2Dia * eficienciaSistema);

  const quantidadePaineis = Math.ceil(
    potenciaSistemaKwpNecessaria / (POTENCIA_PAINEL_W / 1000),
  );

  const potenciaRealSistemaKwp = quantidadePaineis * (POTENCIA_PAINEL_W / 1000);

  const geracaoAno1Kwh =
    potenciaRealSistemaKwp *
    irradiacaoMediaAnualKwhM2Dia *
    365.25 *
    eficienciaSistema;

  const investimento = calcularPrecoPadrao(custoMensalRs) || 0;
  const anoAtualReal = new Date().getFullYear();

  // Ano 0: Saldo Inicia Negativo no valor do investimento
  const acumulado = [
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

  const fc = [-1 * investimento];

  for (let ano = 1; ano <= VIDA_UTIL_SISTEMA_ANOS; ano++) {
    const anoCalendario = anoAtualReal + (ano - 1);
    const tarifaBrutaAno =
      TAXA_ENERGIA_RS_KWH * Math.pow(1 + INFLACAO_ENERGIA_ANUAL, ano - 1);

    // Custo do Fio B por kWh no ano vigente
    const valorFioBCheioKwh = tarifaBrutaAno * PERCENTUAL_FIO_B_NA_TARIFA;
    const custoFioBKwh = valorFioBCheioKwh * getPercentualFioB(anoCalendario);

    // Economia Bruta do ano (Valor sem considerar descontos)
    const economiaBrutaAno = geracaoAnoAtual * tarifaBrutaAno;
    economiaBrutaAcumulada += economiaBrutaAno;

    // Desconto do Fio B incidindo desde o ano 1 sobre a fatia injetada
    const custoFioBAno = geracaoAnoAtual * pctInjetado * custoFioBKwh;
    custoFioBAcumulado += custoFioBAno;

    // Economia líquida do ano antes da Reserva de O&M
    const economiaLiquidaAno = economiaBrutaAno - custoFioBAno;

    // Reserva O&M só incide se o saldo já estiver positivo ou a partir do momento em que cruzar o zero
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
      ano === 1 ? DEGRADACAO_PAINEL_ANO1 : DEGRADACAO_PAINEL_ANOS_SEGUINTES;
    geracaoAnoAtual *= 1 - taxaDegradacao;
  }

  const indices = [0, 1, 2, 3, 4, 9, 14, 19, VIDA_UTIL_SISTEMA_ANOS - 1].filter(
    (i) => i < acumulado.length,
  );
  const dataResume = indices.map((index) => acumulado[index]);

  let textPayback = `Mais de ${VIDA_UTIL_SISTEMA_ANOS} anos`;
  if (paybackAnos > 0) {
    textPayback = paybackAnos <= 1 ? `Menos de 1 ano` : `~ ${paybackAnos} anos`;
  }

  const reduction = (economiaBrutaAcumulada / custoEvitadoSemSolar) * 100;
  const roi_calc =
    investimento > 0 ? (saldoCaixaAcumulado / investimento) * 100 : 0;
  const vpl_calc = calculateNPV(TAXA_DESCONTO_VPL, fc);
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
    projecao: VIDA_UTIL_SISTEMA_ANOS,
  };
}
