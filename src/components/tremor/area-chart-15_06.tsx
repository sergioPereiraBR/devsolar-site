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
  EconomiaBruta: number;
  CustoFioB: number;
  ReservaOM: number;
  Payback: number;
}

interface Project {
  text_payback: string;
  data: Dado[];
  dataResume: Dado[];
  potenciaEstimadaKwp: number;
  investimentoEstimado: number;
  custoMensalInformado: number;
  economiaAcumulada: number;
  custoFioBTotal?: number;
  reservaOMTotal?: number;
  retornoLiquidoReal?: number;
  tir: number;
  vpl: number;
  roi: number;
  taxCostReduct: number;
  projecao: number;
}

interface ResumoDadosProps {
  dataProject: Project;
}

const currencyFormatter = (
  value: unknown,
  options?: Intl.NumberFormatOptions,
): string => {
  const number = Number(value);
  if (value === null || value === undefined || !isFinite(number)) return 'N/A';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    ...options,
  }).format(number);
};

const percentFormatter = (number: number): string => {
  if (typeof number !== 'number' || isNaN(number) || !isFinite(number))
    return 'N/A';
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(number / 100);
};

const CustomYAxisTick = ({ x = 0, y = 0, payload, maxY }: any) => {
  if (!payload) return null;
  const value = payload.value;

  let text = currencyFormatter(value);
  if (value === 0) text = 'R$ 0';

  const isNegative = value < 0;
  const isMax = Math.abs(value - maxY) < 1;

  const fill = isMax ? '#ff9e00' : isNegative ? '#ef4444' : '#6b7280';
  const fontWeight = isMax ? 700 : 400;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={value === 0 ? -1 : isNegative ? 6 : 4}
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

const ResumoDados: React.FC<ResumoDadosProps> = ({ dataProject }) => {
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
    const observer = new ResizeObserver(() => updateSize());
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (!dataProject)
    return (
      <div className="p-4 text-center text-red-500">
        Erro ao carregar dados.
      </div>
    );

  const investimentoInicial =
    Math.abs(Number(dataProject.investimentoEstimado)) || 0;
  const chartData: Dado[] = (
    dataProject.dataResume ??
    dataProject.data ??
    []
  ).map((item, index) => ({
    Ano: Number(item.Ano) || 0,
    EconomiaBruta: Number(item.EconomiaBruta) || 0,
    CustoFioB: Number(item.CustoFioB) || 0,
    ReservaOM: Number(item.ReservaOM) || 0,
    Payback: index === 0 ? -investimentoInicial : Number(item.Payback) || 0,
  }));

  const ultimoPayback =
    chartData.length > 0 ? chartData[chartData.length - 1].Payback : 0;
  const maxY = ultimoPayback > 0 ? ultimoPayback : 100000;
  const domainMin = -investimentoInicial;

  const positiveTicks = Array.from({ length: 4 }, (_, i) =>
    Math.round(((i + 1) * maxY) / 4),
  );
  const customTicks = [domainMin, 0, ...positiveTicks];

  const economiaTotalBruta = Number(dataProject.economiaAcumulada) || 0;
  const custoFioBTotal = Number(dataProject.custoFioBTotal) || 0;
  const reservaOMTotal = Number(dataProject.reservaOMTotal) || 0;

  const summary = [
    {
      category: 'Retorno Líquido Real (25 Anos)',
      total: currencyFormatter(ultimoPayback),
      color: 'bg-[#ff9e00]',
    },
    {
      category: 'Redução Média de Custos',
      total: percentFormatter(Number(dataProject.taxCostReduct)),
      color: 'bg-emerald-500',
    },
    {
      category: 'VPL (Valor Presente Líquido)',
      total: currencyFormatter(Number(dataProject.vpl)),
      color: 'bg-blue-500',
    },
    {
      category: 'TIR (Taxa Interna de Retorno)',
      total: percentFormatter(dataProject.tir),
      color: 'bg-blue-500',
    },
    {
      category: 'ROI (Retorno s/ Investimento)',
      total: percentFormatter(Number(dataProject.roi)),
      color: 'bg-blue-500',
    },
  ];

  return (
    <div className="mx-0 w-full max-w-none px-0 sm:mx-auto sm:max-w-7xl">
      <div className="mt-6 space-y-3 rounded-lg border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/40">
        <h2 className="font-medium text-gray-900 dark:text-gray-50">
          Composição de Valores e Fluxo Financeiro (25 Anos)
        </h2>
        <p className="text-sm text-gray-500">
          Projeção do fluxo de caixa iniciando no valor negativo do investimento
          e registrando o abatimento do Fio B e a reserva de O&M até a quitação
          e obtenção do lucro líquido.
        </p>
      </div>

      <ul role="list" className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-5">
        {summary.map((item, index) => (
          <li key={index}>
            <div className="flex space-x-1">
              <span
                className={cx(item.color, 'w-1 shrink-0 rounded')}
                aria-hidden={true}
              />
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                {item.total}
              </p>
            </div>
            <p className="pl-3 text-sm text-gray-500">{item.category}</p>
          </li>
        ))}
      </ul>

      <div ref={chartContainerRef} className="mt-8 h-80 w-full">
        {isChartContainerReady && chartData.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart
              data={chartData}
              margin={{ top: 12, right: 12, left: 8, bottom: 12 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="Ano" tick={{ fontSize: 12 }} />
              <YAxis
                width={90}
                domain={[domainMin, maxY]}
                ticks={customTicks}
                tick={<CustomYAxisTick maxY={maxY} />}
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
                  value: 'Ponto de Payback (R$ 0)',
                  fill: '#3b82f6',
                  fontSize: 12,
                  position: 'insideTopRight',
                  dy: -18,
                }}
              />
              <Area
                type="monotone"
                dataKey="Payback"
                stroke="#ff9e00"
                fill="#ff9e00"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Composição detalhada dos custos */}
      <div className="mt-6 space-y-3 rounded-lg border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/40">
        <p className="text-xs text-gray-600 dark:text-gray-300">
          <strong className="font-semibold text-gray-900 dark:text-gray-100">
            Composição Detalhada dos Valores Acumulados:
          </strong>
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-xs text-gray-600 dark:text-gray-300">
          <li>
            <strong>Investimento Inicial (Ano 0):</strong> Quitação do sistema
            no valor de{' '}
            <span className="font-medium text-red-500">
              -{currencyFormatter(investimentoInicial)}
            </span>{' '}
            (ponto de partida do fluxo de caixa).
          </li>
          <li>
            <strong>Tarifa Fio B (Lei 14.300/22):</strong> Dedução progressiva
            acumulada de{' '}
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {currencyFormatter(custoFioBTotal)}
            </span>{' '}
            sobre a energia injetada na rede desde o ano 1.
          </li>
          <li>
            <strong>Reserva Operacional (O&M):</strong> Reserva técnica
            acumulada de{' '}
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {currencyFormatter(reservaOMTotal)}
            </span>{' '}
            aplicada sobre os ganhos excedentes após o ponto de payback.
          </li>
          <li>
            <strong>Economia Bruta Potencial:</strong> Total de{' '}
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {currencyFormatter(economiaTotalBruta)}
            </span>{' '}
            em energia gerada.
          </li>
          <li>
            <strong>Retorno Líquido Real (Saldo Final):</strong> Saldo limpo
            acumulado de{' '}
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {currencyFormatter(ultimoPayback)}
            </span>{' '}
            no seu bolso ao final de 25 anos.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResumoDados;
