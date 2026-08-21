import { CalculadorPrecoDinamico } from './CalculadorPrecoDinamico';

/**
 * Interface unificada de premissas técnicas e financeiras
 */
export interface PremissasSolar {
  TAXA_ENERGIA_RS_KWH: number;
  PERCENTUAL_FIO_B_NA_TARIFA: number;
  PERDA_SISTEMA_PERCENT: number;
  POTENCIA_PAINEL_W: number;
  INFLACAO_ENERGIA_ANUAL: number;
  TAXA_DESCONTO_VPL: number;
  DEGRADACAO_PAINEL_ANO1: number;
  DEGRADACAO_PAINEL_ANOS_SEGUINTES: number;
  VIDA_UTIL_SISTEMA_ANOS: number;
  IRRADIACAO_MEDIA_ANUAL_KWH_M2_DIA: number;
}

/**
 * Constantes globais do sistema (Single Source of Truth)
 */
export const PREMISSAS_SOLAR: PremissasSolar = {
  TAXA_ENERGIA_RS_KWH: 1.18,
  PERCENTUAL_FIO_B_NA_TARIFA: 0.28, // Fio B equivale a ~28% da tarifa total
  PERDA_SISTEMA_PERCENT: 25,
  POTENCIA_PAINEL_W: 620,
  INFLACAO_ENERGIA_ANUAL: 0.06, // 6.0% a.a.
  TAXA_DESCONTO_VPL: 0.10, // 10.0% TMA / Taxa de Risco
  DEGRADACAO_PAINEL_ANO1: 0.02, // 2.0% no ano 1
  DEGRADACAO_PAINEL_ANOS_SEGUINTES: 0.0055, // 0.55% a.a.
  VIDA_UTIL_SISTEMA_ANOS: 25,
  IRRADIACAO_MEDIA_ANUAL_KWH_M2_DIA: 5.5,
};

/**
 * Tabela e instância padrão de cálculo de preço dinâmico do kit
 */
export const DADOS_FAIXAS_PADRAO = [
  { valor_faixa: 12000.0, conta_de: 400.0, conta_ate: 499.99 },
  { valor_faixa: 13000.0, conta_de: 500.0, conta_ate: 699.99 },
  { valor_faixa: 15000.0, conta_de: 700.0, conta_ate: 899.99 },
  { valor_faixa: 17000.0, conta_de: 900.0, conta_ate: 1099.99 },
  { valor_faixa: 19000.0, conta_de: 1100.0, conta_ate: 1199.99 },
  { valor_faixa: 22000.0, conta_de: 1200.0, conta_ate: 1399.99 },
  { valor_faixa: 24000.0, conta_de: 1400.0, conta_ate: 1599.99 },
  { valor_faixa: 26000.0, conta_de: 1500.0, conta_ate: 1799.99 },
];

export const calculadorPrecoPadrao = new CalculadorPrecoDinamico(DADOS_FAIXAS_PADRAO);

export function calcularPrecoPadrao(valorConta: number): number | null {
  try {
    return calculadorPrecoPadrao.calcular(valorConta);
  } catch (error) {
    console.error('Erro ao calcular preço dinâmico:', error);
    return null;
  }
}

/**
 * Percentual de cobrança da TUSD Fio B conforme Marco Legal (Lei 14.300/2022)
 */
export function getPercentualFioB(ano: number): number {
  if (ano <= 2022) return 0;
  if (ano === 2023) return 0.15;
  if (ano === 2024) return 0.30;
  if (ano === 2025) return 0.45;
  if (ano === 2026) return 0.60;
  if (ano === 2027) return 0.75;
  if (ano === 2028) return 0.90;
  return 1.0; // 2029 em diante: 100%
}

/**
 * Funções auxiliares de formatação de valores para consistência em relatórios e UI
 */
export const currencyFormatter = (value: number): string => {
  if (value === undefined || value === null || isNaN(value)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const percentFormatter = (value: number): string => {
  if (value === undefined || value === null || isNaN(value)) return '0,0%';
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
};