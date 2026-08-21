'use client';

import React from 'react';
import {
  Area,
  CartesianGrid,
  AreaChart as RechartsAreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { cx } from '@/lib/utils';

interface Dado {
  Ano: number;
  Economia: number;
  Custo: number;
  Payback?: number;
}

interface Project {
  text_payback: string;
  data: Dado[];
  dataResume: Dado[];
  potenciaEstimadaKwp: number;
  investimentoEstimado: number;
  custoMensalInformado: number;
  economiaAcumulada: number;
  tir: number;
  vpl: number;
  roi: number;
  taxCostReduct: number;
  projecao: number;
}

interface ResumoDadosProps {
  dataProject: Project;
}

interface CustomYAxisTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: number;
  };
  maxY: number;
}

const currencyFormatter = (
  value: unknown,
  options?: Intl.NumberFormatOptions,
): string => {
  const number = Number(value);

  if (value === null || value === undefined || !isFinite(number)) {
    return 'N/A';
  }
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    ...options,
  });
  return formatter.format(number);
};

const percentFormatter = (number: number): string => {
  if (typeof number !== 'number' || isNaN(number) || !isFinite(number)) {
    return 'N/A';
  }
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return formatter.format(number / 100);
};

const CustomYAxisTick: React.FC<CustomYAxisTickProps> = ({
  x = 0,
  y = 0,
  payload,
  maxY,
}) => {
  if (!payload) return null;
  const value = payload.value;

  let text = currencyFormatter(value, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  if (value === 0) {
    text = 'R$ 0';
  }

  const isNegative = value < 0;
  const isMax = Math.abs(value - maxY) < 1;

  const fill = isMax ? '#ff9e00' : isNegative ? '#ef4444' : '#6b7280';
  const fontWeight = isMax ? 700 : 400;

  let dyOffset = 4;
  if (value === 0) {
    dyOffset = -1;
  } else if (isNegative) {
    dyOffset = 6;
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={dyOffset}
        textAnchor="end"
        fill={fill}
        fontWeight={fontWeight}
        fontSize={11}
      >
        {text}
      </text>
    </g>
  );
};

const Example: React.FC<ResumoDadosProps> = ({ dataProject }) => {
  const chartContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [isChartContainerReady, setIsChartContainerReady] =
    React.useState(false);

  React.useEffect(() => {
    const element = chartContainerRef.current;
    if (!element) return;

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      setIsChartContainerReady(rect.width > 0 && rect.height > 0);
    };

    updateSize();

    if (typeof ResizeObserver === 'undefined') {
      const timeoutId = window.setTimeout(updateSize, 0);
      return () => window.clearTimeout(timeoutId);
    }

    const observer = new ResizeObserver(() => updateSize());
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  if (!dataProject) {
    return (
      <div className="p-4 text-center text-red-500">
        Erro ao carregar dados do gráfico.
      </div>
    );
  }

  const dataLocal: Project = dataProject;

  const investimentoInicial =
    Math.abs(Number(dataLocal.investimentoEstimado)) || 0;

  // Mapeamento dinâmico da série de Payback Líquido
  const chartData: Dado[] = (dataLocal.dataResume ?? dataLocal.data ?? []).map(
    (item, index) => {
      const ano = Number(item.Ano) || 0;
      const economia = Number(item.Economia) || 0;
      const custo = Number(item.Custo) || 0;

      let paybackVal: number;
      if (index === 0) {
        paybackVal = -investimentoInicial;
      } else {
        paybackVal =
          item.Payback !== undefined && item.Payback !== null
            ? Number(item.Payback)
            : economia - investimentoInicial;
      }

      return {
        Ano: ano,
        Economia: economia,
        Custo: custo,
        Payback: isNaN(paybackVal) ? 0 : paybackVal,
      };
    },
  );

  // Obtém o Saldo Líquido Final dinâmico
  const ultimoPayback =
    chartData.length > 0 ? (chartData[chartData.length - 1].Payback ?? 0) : 0;

  const maxY = ultimoPayback > 0 ? ultimoPayback : 100000;
  const domainMin = -investimentoInicial;
  const domainMax = maxY;

  // Geração de ticks dinâmicos para o eixo Y
  const numSteps = 4;
  const positiveTicks = Array.from({ length: numSteps }, (_, i) =>
    Math.round(((i + 1) * maxY) / numSteps),
  );

  const customTicks = [domainMin, 0, ...positiveTicks];

  // Economia Bruta Total em 25 anos
  const economiaTotalAcumulada = Number(dataLocal.economiaAcumulada) || 0;

  // Custos com Fio B e operação (Economia Bruta - Retorno Líquido - Investimento)
  const custosOperacionaisEFioB = Math.max(
    0,
    economiaTotalAcumulada - ultimoPayback - investimentoInicial,
  );

  const summary = [
    {
      category: 'Retorno Líquido Real (25 Anos)',
      total: currencyFormatter(ultimoPayback),
      color: 'bg-[#ff9e00]',
    },
    {
      category: 'Redução Média de Custos',
      total: percentFormatter(Number(dataLocal.taxCostReduct)),
      color: 'bg-emerald-500',
    },
    {
      category: 'VPL (Valor Presente Líquido)',
      total: currencyFormatter(Number(dataLocal.vpl)),
      color: 'bg-blue-500',
    },
    {
      category: 'TIR (Taxa Interna de Retorno)',
      total: percentFormatter(dataLocal.tir),
      color: 'bg-blue-500',
    },
    {
      category: 'ROI (Retorno s/ Investimento)',
      total: percentFormatter(Number(dataLocal.roi)),
      color: 'bg-blue-500',
    },
  ];

  return (
    <div className="mx-0 w-full max-w-none px-0 sm:mx-auto sm:max-w-7xl sm:px-0">
      <div className="mt-6 space-y-3 rounded-lg border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/40">
        <h2 className="font-medium text-footer-color dark:text-gray-50">
          Retorno Financeiro e Projeção de Economia (25 Anos)
        </h2>

        <p className="text-sm/6 text-gray-500 dark:text-gray-500">
          Estimativas baseadas no seu consumo mensal informado de{' '}
          <span className="font-medium text-gray-900 dark:text-gray-200">
            {currencyFormatter(dataLocal.custoMensalInformado, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              notation: 'standard',
            })}
          </span>
          . Para um estudo personalizado para o seu imóvel, fale com{' '}
          <strong>nossos especialistas</strong> e descubra como{' '}
          <strong>maximizar a rentabilidade do seu projeto</strong> com a{' '}
          <strong>DEV Solar</strong>.
        </p>
      </div>

      <ul
        role="list"
        className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-5"
      >
        {summary.map((item, index) => (
          <li key={index}>
            <div className="flex space-x-1">
              {item.color && (
                <span
                  className={cx(item.color, 'w-1 shrink-0 rounded')}
                  aria-hidden={true}
                />
              )}
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                {item.total}
              </p>
            </div>
            <p className="pl-3 text-sm text-gray-500 dark:text-gray-500">
              {item.category}
            </p>
          </li>
        ))}
      </ul>

      {/* Gráfico de Economia e Payback */}
      <div
        ref={chartContainerRef}
        className="mt-8 h-80 min-h-[20rem] w-full min-w-0 max-w-none overflow-x-auto px-0"
      >
        {isChartContainerReady && chartData.length > 0 ? (
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={0}
            minHeight={320}
          >
            <RechartsAreaChart
              data={chartData}
              margin={{ top: 12, right: 12, left: 8, bottom: 12 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="Ano" tick={{ fontSize: 12 }} />
              <YAxis
                width={90}
                domain={[domainMin, domainMax]}
                ticks={customTicks}
                interval={0}
                tick={<CustomYAxisTick maxY={maxY} />}
                allowDataOverflow={true}
              />
              <Tooltip
                formatter={(value: number) => [
                  currencyFormatter(value),
                  'Saldo Acumulado',
                ]}
                labelFormatter={(label) => `Ano ${label}`}
              />

              <ReferenceLine
                y={0}
                stroke="#3b82f6"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: 'Linha do Payback',
                  fill: '#3b82f6',
                  fontSize: 12,
                  fontWeight: 500,
                  position: 'insideTopRight',
                  dy: -18,
                  dx: 5,
                }}
              />

              <Area
                type="monotone"
                dataKey="Payback"
                stroke="#ff9e00"
                fill="#ff9e00"
                fillOpacity={0.2}
                strokeWidth={2}
                isAnimationActive={false}
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        ) : null}
      </div>

      {/* Rodapé do Gráfico: Explicativo + Aviso da Lei 14.300/22 */}
      <div className="mt-6 space-y-3 rounded-lg border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/40">
        <p className="text-xs/5 text-gray-600 dark:text-gray-300">
          <strong className="font-semibold text-gray-900 dark:text-gray-100">
            Entenda o Ganho Líquido Acumulado:
          </strong>{' '}
          Este gráfico reflete o <strong>ganho real</strong> gerado no seu bolso
          ao longo de 25 anos:
        </p>

        <ul className="list-disc space-y-1 pl-5 text-xs/5 text-gray-600 dark:text-gray-300">
          <li>
            <strong>Economia Bruta Gerada:</strong> Projeção de{' '}
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {currencyFormatter(economiaTotalAcumulada)}
            </span>{' '}
            em custos evitados na conta de luz.
          </li>
          <li>
            <strong>Deduções Previstas:</strong> Já contempla a quitação do
            investimento inicial ({currencyFormatter(investimentoInicial)}) e os
            custos com o reajuste progressivo da tarifa do Fio B (Lei
            14.300/2022) e operação (
            {currencyFormatter(custosOperacionaisEFioB)}).
          </li>
          <li>
            <strong>Retorno Líquido Real:</strong> Resultado limpo de{' '}
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {currencyFormatter(ultimoPayback)}
            </span>{' '}
            disponível no seu bolso.
          </li>
        </ul>
        <p className="border-t border-gray-200/60 pt-1.5 text-[12px]/4 italic text-gray-600 dark:border-gray-800 dark:text-gray-400">
          * Os resultados apresentados são estimativas baseadas no seu{' '}
          <strong>perfil atual de consumo</strong> e nas regras de compensação
          da Lei 14.300/2022. Para validar as projeções e obter uma{' '}
          <strong>proposta sob medida</strong>, consulte{' '}
          <strong>nossa equipe</strong> de especialistas.
        </p>
      </div>
    </div>
  );
};

export default Example;
