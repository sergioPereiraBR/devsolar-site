'use client';

import React from 'react';

// 1. Contrato de Premissas Unificado (Fonte Única da Verdade)
export interface PremissasCalculo {
  custoMensalInformado: number;
  taxaEnergiaKwh: number;
  percentualFioBTarifa: number;
  perdaSistemaPercent: number;
  potenciaPainelW: number;
  inflacaoEnergiaAnual: number;
  taxaDescontoVpl: number; // TMA / Taxa de Risco do VPL
  degradacaoAno1: number;
  degradacaoAnosSeguintes: number;
  vidaUtilAnos: number;
  reservaOMPercent: number;
}

interface TextoExplicativoProps {
  premissas: PremissasCalculo;
}

const currencyFormatter = (value: number): string => {
  if (value === undefined || value === null || isNaN(value)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const percentFormatter = (value: number): string => {
  if (value === undefined || value === null || isNaN(value)) return '0%';
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
};

export const TextoExplicativoCalculo: React.FC<TextoExplicativoProps> = ({
  premissas,
}) => {
  // Derivação automática dos dados diretos da fonte de origem
  const performanceRatio = (100 - premissas.perdaSistemaPercent) / 100;

  return (
    <div className="mt-6 space-y-4 rounded-lg border border-gray-100 bg-gray-50/50 p-4 text-xs/5 text-gray-600 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-300">
      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        Composição da Economia e Premissas do Cálculo
      </p>

      <p>
        Projeção financeira baseada na conta de energia mensal de{' '}
        <strong className="text-gray-900 dark:text-gray-100">
          {currencyFormatter(premissas.custoMensalInformado)}
        </strong>
        , considerando o ciclo operacional do sistema de{' '}
        <strong>{premissas.vidaUtilAnos} anos</strong>:
      </p>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Tarifa Base e Reajustes:</strong> Considera a tarifa média
          inicial de{' '}
          <strong className="text-gray-900 dark:text-gray-100">
            {currencyFormatter(premissas.taxaEnergiaKwh)}/kWh
          </strong>{' '}
          com reajuste tarifário anual estimado (inflação energética) de{' '}
          <strong className="text-gray-900 dark:text-gray-100">
            {percentFormatter(premissas.inflacaoEnergiaAnual)} a.a.
          </strong>
        </li>

        <li>
          <strong>Dimensionamento e Desempenho:</strong> Módulos com potência
          unitária de <strong>{premissas.potenciaPainelW}W</strong>, Performance
          Ratio (PR) de <strong>{percentFormatter(performanceRatio)}</strong> (
          {premissas.perdaSistemaPercent}% de perdas técnicas) e taxa de
          degradação física de{' '}
          <strong>
            {percentFormatter(premissas.degradacaoAno1)} no 1º ano
          </strong>{' '}
          e{' '}
          <strong>
            {percentFormatter(premissas.degradacaoAnosSeguintes)} a.a.
          </strong>{' '}
          nos anos subsequentes.
        </li>

        <li>
          <strong>Incidência da TUSD Fio B (Lei 14.300/22):</strong> Encargo
          aplicado sobre a fatia de energia injetada/compensada, considerando
          que o Fio B representa{' '}
          <strong>{percentFormatter(premissas.percentualFioBTarifa)}</strong> da
          tarifa total. Escalonamento progressivo legal:
          <div className="mt-1 font-mono text-[11px] text-gray-500 dark:text-gray-400">
            • 2023: 15% | 2024: 30% | 2025: 45% <br />
            • 2026: 60% | 2027: 75% | 2028: 90% <br />• 2029 em diante: 100% da
            tarifa Fio B.
          </div>
        </li>

        <li>
          <strong>Reserva Operacional (O&M):</strong> Provisão técnica de{' '}
          <strong className="text-gray-900 dark:text-gray-100">
            {percentFormatter(premissas.reservaOMPercent)}
          </strong>{' '}
          aplicada sobre os ganhos líquidos após a quitação do investimento
          (payback) para manutenção preventiva e reposição de equipamentos.
        </li>

        <li>
          <strong>Indicadores Financeiros e Taxa de Risco:</strong> Considera a
          inflação energética acumulada de{' '}
          <strong>
            {percentFormatter(premissas.inflacaoEnergiaAnual)} a.a.
          </strong>{' '}
          e aplica uma Taxa Mínima de Atratividade (TMA / Taxa de Risco) de{' '}
          <strong className="text-gray-900 dark:text-gray-100">
            {percentFormatter(premissas.taxaDescontoVpl)} a.a.
          </strong>{' '}
          para a atualização a valor presente (VPL), além do cálculo da Taxa
          Interna de Retorno (TIR) e Retorno sobre Investimento (ROI).
        </li>
      </ul>
    </div>
  );
};
