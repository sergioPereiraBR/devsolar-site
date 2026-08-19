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

export function calcularEconomiaSolar(custoMensalRs) {
  // Constantes de Cálculo
  const TAXA_ENERGIA_RS_KWH = 1.18;
  const PERDA_SISTEMA_PERCENT = 25; // % de perdas (PR de 75%)
  const POTENCIA_PAINEL_W = 570;
  const INFLACAO_ENERGIA_ANUAL = 0.06; // Reajuste tarifário anual estimado (6%)
  const TAXA_DESCONTO_VPL = 0.1; // Taxa Mínima de Atratividade para o VPL (ex: 10% a.a.)
  const DEGRADACAO_PAINEL_ANO1 = 0.02; // Degradação típica ano 1 (2%)
  const DEGRADACAO_PAINEL_ANOS_SEGUINTES = 0.0055; // Degradação anual seguinte (0.55%)
  const VIDA_UTIL_SISTEMA_ANOS = 25;

  if (!custoMensalRs || custoMensalRs < 300 || custoMensalRs > 999999999.99) {
    return {
      error: 'Custo mensal inválido',
      dataResume: [],
      text_payback: 'N/A',
    };
  }

  // 1. Dados de Consumo
  const consumoTotalKwhMes = custoMensalRs / TAXA_ENERGIA_RS_KWH;
  const consumoTotalKwhAno = consumoTotalKwhMes * 12;
  const consumoMediaKwhDia = consumoTotalKwhAno / 365.25;

  // 2. Dados de Irradiacao e Eficiência
  const eficienciaSistema = 1 - PERDA_SISTEMA_PERCENT / 100; // 0.75
  const irradiacaoMediaAnualKwhM2Dia = 5.5; // Exemplo RJ (kWh/m²/dia)

  // 3. Potencial do Sistema (Ajuste no Dimensionamento)
  // Potência kWp necessária considerando o PR (Performance Ratio)
  const potenciaSistemaKwpNecessaria =
    consumoMediaKwhDia / (irradiacaoMediaAnualKwhM2Dia * eficienciaSistema);

  const quantidadePaineis = Math.ceil(
    potenciaSistemaKwpNecessaria / (POTENCIA_PAINEL_W / 1000),
  );

  const potenciaRealSistemaKwp = quantidadePaineis * (POTENCIA_PAINEL_W / 1000);

  // 4. Produção Anual do Ano 1 (kWp * Irradiação * 365.25 * Eficiência)
  const geracaoAno1Kwh =
    potenciaRealSistemaKwp *
    irradiacaoMediaAnualKwhM2Dia *
    365.25 *
    eficienciaSistema;

  // 5. Investimento
  const investimento = calcularPrecoPadrao(custoMensalRs) || 0;

  const acumulado = [];
  let economiaAcumulada = 0.0;
  let custoEvitadoAcumulado = 0.0;
  let paybackAnos = 0;
  let geracaoAnoAtual = geracaoAno1Kwh;

  const fc = [-1 * investimento];

  const anoAtualReal = new Date().getFullYear();

  for (let ano = 1; ano <= VIDA_UTIL_SISTEMA_ANOS; ano++) {
    // Tarifas e inflação energética
    const taxaEnergiaAtualizada =
      TAXA_ENERGIA_RS_KWH * Math.pow(1 + INFLACAO_ENERGIA_ANUAL, ano - 1);

    // Economia gerada no ano
    const economiaAno = geracaoAnoAtual * taxaEnergiaAtualizada;
    economiaAcumulada += economiaAno;

    fc.push(economiaAno);

    // Custo estimado sem energia solar
    const custoSemSolarAno = consumoTotalKwhAno * taxaEnergiaAtualizada;
    custoEvitadoAcumulado += custoSemSolarAno;

    // Cálculo do Payback
    if (paybackAnos === 0 && economiaAcumulada >= investimento) {
      paybackAnos = ano;
    }

    acumulado.push({
      Ano: anoAtualReal + ano,
      Economia: Number(economiaAcumulada.toFixed(2)),
      Custo: Number(custoEvitadoAcumulado.toFixed(2)),
      Payback: Number((economiaAcumulada - investimento).toFixed(2)),
    });

    // Degradação para o próximo ano
    const taxaDegradacao =
      ano === 1 ? DEGRADACAO_PAINEL_ANO1 : DEGRADACAO_PAINEL_ANOS_SEGUINTES;
    geracaoAnoAtual *= 1 - taxaDegradacao;
  }

  // Resumo para gráficos/cards
  const indices = [0, 1, 2, 3, 4, 9, 14, 19, VIDA_UTIL_SISTEMA_ANOS - 1].filter(
    (i) => i < acumulado.length,
  );
  const dataResume = indices.map((index) => acumulado[index]);

  // Formatação do Payback
  let textPayback = `Mais de ${VIDA_UTIL_SISTEMA_ANOS} anos`;
  if (paybackAnos > 0) {
    textPayback = paybackAnos <= 1 ? `Menos de 1 ano` : `~ ${paybackAnos} anos`;
  }

  // Indicadores Financeiros
  const reduction = (economiaAcumulada / custoEvitadoAcumulado) * 100;
  const roi_calc =
    investimento > 0
      ? ((economiaAcumulada - investimento) / investimento) * 100
      : 0;
  const vpl_calc = calculateNPV(TAXA_DESCONTO_VPL, fc);
  const tir_calc = tir(fc);

  return {
    text_payback: textPayback,
    data: acumulado,
    dataResume: dataResume,
    potenciaEstimadaKwp: Number(potenciaRealSistemaKwp.toFixed(2)),
    investimentoEstimado: investimento,
    custoMensalInformado: custoMensalRs,
    economiaAcumulada: Number(economiaAcumulada.toFixed(2)),
    tir: tir_calc,
    vpl: vpl_calc,
    roi: roi_calc,
    taxCostReduct: Number(reduction.toFixed(2)),
    projecao: VIDA_UTIL_SISTEMA_ANOS,
  };
}
