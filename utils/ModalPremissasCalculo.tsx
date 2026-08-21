'use client';

import React, { useEffect } from 'react';
import { HelpCircle, ShieldCheck, X } from 'lucide-react';

import { PremissasSolarComValoresCalculo } from './calcularEconomiaSolar';

interface ModalPremissasProps {
  isOpen: boolean;
  onClose: () => void;
  premissas?: PremissasSolarComValoresCalculo;
}

const currencyFormatter = (value?: number): string => {
  if (value === undefined || value === null || isNaN(value)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const percentFormatter = (value?: number): string => {
  if (value === undefined || value === null || isNaN(value)) return '0%';
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
};

export const ModalPremissasCalculo: React.FC<ModalPremissasProps> = ({
  isOpen,
  onClose,
  premissas,
}) => {
  // Efeito para fechar o modal com a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !premissas) return null;

  const performanceRatio =
    (100 - (premissas.PERDA_SISTEMA_PERCENT ?? 25)) / 100;

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm duration-200">
      {/* Container Principal do Balão Modal */}
      <div
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-gray-200 bg-white p-6 text-gray-700 shadow-2xl dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-15 w-15 mt-0 text-blue-500" />
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Premissas e Base de Cálculo da Simulação
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Conteúdo Explicativo com Premissas Reais */}
        <div className="mt-4 space-y-4 text-xs leading-relaxed">
          <p>
            Esta projeção financeira de{' '}
            <strong>{premissas.VIDA_UTIL_SISTEMA_ANOS} anos</strong> é calculada
            de forma personalizada para uma conta de energia de{' '}
            <strong className="text-gray-900 dark:text-gray-100">
              {currencyFormatter(premissas.custoMensalRs)}
            </strong>
            , utilizando as seguintes variáveis técnicas e regulatórias:
          </p>

          <ul className="space-y-3">
            <li className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
              <strong className="mb-0.5 block font-semibold text-gray-900 dark:text-gray-100">
                • Tarifa Base e Inflação Energética:
              </strong>
              Considera tarifa média inicial de{' '}
              <strong className="text-gray-900 dark:text-gray-100">
                {currencyFormatter(premissas.TAXA_ENERGIA_RS_KWH)}/kWh
              </strong>{' '}
              e reajuste tarifário anual estimado de{' '}
              <strong className="text-gray-900 dark:text-gray-100">
                {percentFormatter(premissas.INFLACAO_ENERGIA_ANUAL)} a.a.
              </strong>
            </li>

            <li className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
              <strong className="mb-0.5 block font-semibold text-gray-900 dark:text-gray-100">
                • Dimensionamento e Eficiência dos Equipamentos:
              </strong>
              Projetado com painéis de{' '}
              <strong>{premissas.POTENCIA_PAINEL_W}W</strong>, Performance Ratio
              (PR) de <strong>{percentFormatter(performanceRatio)}</strong> (
              {premissas.PERDA_SISTEMA_PERCENT}% de perdas em cabos, conexões,
              equipamentos e no aumento de temperatura ambiente) e degradação da
              eficiência dos módulos ao longo da vida útil de{' '}
              <strong>
                {percentFormatter(premissas.DEGRADACAO_PAINEL_ANO1)} no 1º ano
              </strong>{' '}
              e{' '}
              <strong>
                {percentFormatter(premissas.DEGRADACAO_PAINEL_ANOS_SEGUINTES)}{' '}
                a.a.
              </strong>{' '}
              nos anos seguintes.
            </li>

            <li className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
              <strong className="mb-0.5 block font-semibold text-gray-900 dark:text-gray-100">
                • TUSD Fio B / Marco Legal da GD (Lei 14.300/22):
              </strong>
              Incidência do encargo sobre a fatia de energia injetada na rede (
              {percentFormatter(1 - premissas.percentualConsumoDiurno)} injeção
              / {percentFormatter(premissas.percentualConsumoDiurno)} consumo
              direto). O Fio B representa aprox.{' '}
              <strong>
                {percentFormatter(premissas.PERCENTUAL_FIO_B_NA_TARIFA)}
              </strong>{' '}
              da tarifa total.
            </li>

            <li className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
              <strong className="mb-0.5 block font-semibold text-gray-900 dark:text-gray-100">
                • Reserva de Manutenção (O&M):
              </strong>
              Provisão técnica de{' '}
              <strong className="text-gray-900 dark:text-gray-100">
                {percentFormatter(premissas.percentualReservaOMPósPayback)}
              </strong>{' '}
              aplicada sobre os ganhos após a quitação do investimento (payback)
              para garantias, trocas de inversores e limpezas.
            </li>

            <li className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
              <strong className="mb-0.5 block font-semibold text-gray-900 dark:text-gray-100">
                • Indicadores Financeiros (VPL, TIR e ROI):
              </strong>
              Aplica Taxa Mínima de Atratividade (TMA) de{' '}
              <strong className="text-gray-900 dark:text-gray-100">
                {percentFormatter(premissas.TAXA_DESCONTO_VPL)} a.a.
              </strong>{' '}
              para cálculo do Valor Presente Líquido (VPL).
            </li>
          </ul>

          <div className="flex items-start gap-2 border-t border-gray-100 pt-2 text-[11px] text-gray-500 dark:border-gray-800 dark:text-gray-400">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <p>
              Simulação regulatória de acordo com a ANEEL e a Lei 14.300/22. Os
              valores podem oscilar com variações na tarifa da concessionária
              local, consumo mínimo, taxa de iluminação pública (CIP/COSIP) e
              tributos.
            </p>
          </div>
        </div>

        {/* Rodapé do Modal */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
