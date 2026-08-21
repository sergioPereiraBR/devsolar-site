'use client';

import React from 'react';
import {
  Area,
  CartesianGrid,
  Legend,
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="space-y-1.5 rounded-lg border border-gray-200 bg-white p-3 text-xs shadow-lg dark:border-gray-800 dark:bg-gray-900">
        <p className="font-semibold text-gray-900 dark:text-gray-100">
          Ano {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <div
            key={`item-${index}`}
            className="flex items-center justify-between space-x-4"
          >
            <span style={{ color: entry.color }} className="font-medium">
              {entry.name}:
            </span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {currencyFormatter(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
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

  // Montagem das fatias de composição empilhada por ano
  const chartData = (dataProject.dataResume ?? dataProject.data ?? []).map(
    (item, index) => {
      const ano = Number(item.Ano) || 0;
      const economiaBruta = Number(item.EconomiaBruta) || 0;
      const custoFioB = Number(item.CustoFioB) || 0;
      const reservaOM = Number(item.ReservaOM) || 0;
      const saldoLiquido =
        index === 0 ? -investimentoInicial : Number(item.Payback) || 0;

      // Fatias positivas para visualização empilhada do valor bruto
      const retornoLiquidoReal = Math.max(0, saldoLiquido);
      const amortizacaoInvestimento = Math.min(
        investimentoInicial,
        economiaBruta,
      );

      return {
        Ano: ano,
        Payback: saldoLiquido,
        'Investimento Inicial': amortizacaoInvestimento,
        'Tarifa Fio B (Lei 14.300/22)': custoFioB,
        'Reserva Operacional (O&M)': reservaOM,
        'Retorno Líquido Real': retornoLiquidoReal,
        EconomiaBruta: economiaBruta,
      };
    },
  );

  const ultimoPayback =
    chartData.length > 0 ? chartData[chartData.length - 1].Payback : 0;
  const ultimaEconomiaBruta =
    chartData.length > 0
      ? chartData[chartData.length - 1].EconomiaBruta
      : 100000;

  const maxY = ultimaEconomiaBruta > 0 ? ultimaEconomiaBruta : 100000;
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
          Visualização detalhada da composição da economia bruta de{' '}
          {economiaTotalBruta} ao longo do tempo para este projeto de
          investimento com uma conta de energia de{' '}
          {dataProject.custoMensalInformado}, destacando o retorno líquido real
          de {currencyFormatter(ultimoPayback)} limpo, já descontados uma
          reserva para O&M, a quitação do investimento e o custo da Tarifa Fio B
          (Lei 14.300/22) de {currencyFormatter(custoFioBTotal)}.
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

      <div ref={chartContainerRef} className="mt-8 h-96 w-full">
        {isChartContainerReady && chartData.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart
              data={chartData}
              margin={{ top: 12, right: 12, left: 8, bottom: 24 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="Ano" tick={{ fontSize: 12 }} />
              <YAxis
                width={90}
                domain={[domainMin, maxY]}
                ticks={customTicks}
                tick={<CustomYAxisTick maxY={maxY} />}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{ fontSize: '12px' }}
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

              {/* Camadas Empilhadas da Composição (StackID = 1) */}
              <Area
                type="monotone"
                dataKey="Investimento Inicial"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.7}
              />
              <Area
                type="monotone"
                dataKey="Tarifa Fio B (Lei 14.300/22)"
                stackId="1"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.7}
              />
              <Area
                type="monotone"
                dataKey="Reserva Operacional (O&M)"
                stackId="1"
                stroke="#6b7280"
                fill="#6b7280"
                fillOpacity={0.7}
              />
              <Area
                type="monotone"
                dataKey="Retorno Líquido Real"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.85}
              />

              {/* Curva de Fluxo de Caixa / Saldo Acumulado Real (Linha de destaque) */}
              <Area
                type="monotone"
                dataKey="Payback"
                stroke="#ff9e00"
                fill="transparent"
                strokeWidth={3}
                name="Saldo Acumulado Real"
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legenda de Cores Detalhada */}
      <div className="mt-6 space-y-3 rounded-lg border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/40">
        <p className="text-xs text-gray-600 dark:text-gray-300">
          <strong className="font-semibold text-gray-900 dark:text-gray-100">
            Detalhamento das Cores no Gráfico:
          </strong>
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-xs text-gray-600 dark:text-gray-300">
          <li>
            <span className="mr-1.5 inline-block h-3 w-3 rounded-sm bg-blue-500 align-middle"></span>
            <strong>Investimento Inicial:</strong> Quitação progressiva do custo
            do sistema (
            <strong>-{currencyFormatter(investimentoInicial)}</strong> no Ano
            0).
          </li>
          <li>
            <span className="mr-1.5 inline-block h-3 w-3 rounded-sm bg-red-500 align-middle"></span>
            <strong>Tarifa Fio B (Lei 14.300/22):</strong> Dedução acumulada de{' '}
            <strong>{currencyFormatter(custoFioBTotal)}</strong> relativa ao uso
            do sistema de distribuição sobre a energia injetada.
          </li>
          <li>
            <span className="mr-1.5 inline-block h-3 w-3 rounded-sm bg-gray-500 align-middle"></span>
            <strong>Reserva Operacional (O&M):</strong> Provisão acumulada de{' '}
            <strong>{currencyFormatter(reservaOMTotal)}</strong> reservada para
            manutenção preventiva e troca de peças a partir do payback.
          </li>
          <li>
            <span className="mr-1.5 inline-block h-3 w-3 rounded-sm bg-emerald-500 align-middle"></span>
            <strong>Retorno Líquido Real:</strong> Ganho financeiro limpo
            acumulado que atinge{' '}
            <strong>{currencyFormatter(ultimoPayback)}</strong> ao final do
            projeto.
          </li>
          <li>
            <span className="mr-1.5 inline-block h-3 w-3 rounded-sm bg-[#ff9e00] align-middle"></span>
            <strong>Linha Amarela (Saldo Acumulado Real):</strong> Representa o
            balanço de caixa exato partindo do saldo negativo inicial até
            alcançar o lucro positivo acumulado.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResumoDados;
