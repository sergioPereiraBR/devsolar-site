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

  if (value === null || value === undefined || !isFinite(number)) {
    return 'N/A';
  }
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short',
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

  // Garante que todos os itens tenham 'Payback' ou cai para 'Economia - Investimento'
  const chartData: Dado[] = (dataLocal.dataResume ?? dataLocal.data ?? []).map(
    (item) => {
      const ano = Number(item.Ano) || 0;
      const economia = Number(item.Economia) || 0;
      const custo = Number(item.Custo) || 0;

      // Se Payback não for informado, calcula como Economia - Investimento
      const paybackVal =
        item.Payback !== undefined && item.Payback !== null
          ? Number(item.Payback)
          : economia - (dataLocal.investimentoEstimado || 0);

      return {
        Ano: ano,
        Economia: economia,
        Custo: custo,
        Payback: isNaN(paybackVal) ? 0 : paybackVal,
      };
    },
  );

  // Cálculo seguro do Domínio do Eixo Y (suporta min/max no Recharts sem quebrar)
  const yValues = chartData.map((d) => d.Payback);
  const minY = yValues.length > 0 ? Math.min(...yValues) : -15000;
  const maxY = yValues.length > 0 ? Math.max(...yValues) : 400000;

  // Arredonda o mínimo para baixo e o máximo para cima de forma segura
  const domainMin = isFinite(minY) ? Math.floor(minY * 1) : 'auto';
  const domainMax = isFinite(maxY) ? Math.ceil(maxY * 1.05) : 'auto';

  const summary = [
    {
      category: 'Economia Acumulada (25 Anos)',
      total: currencyFormatter(dataLocal.economiaAcumulada),
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
    <>
      <div className="mx-0 w-full max-w-none px-0 sm:mx-auto sm:max-w-7xl sm:px-0">
        <h2 className="font-medium text-footer-color dark:text-gray-50">
          Custo Evitado e Ganho Financeiro Estimado (25 Anos)
        </h2>
        <p className="text-sm/6 text-gray-500 dark:text-gray-500">
          Os valores apresentados são estimativas e projeções baseadas no seu
          consumo atual (
          {currencyFormatter(dataLocal.custoMensalInformado, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            notation: 'standard',
          })}
          ). Para um projeto sob medida para seu imóvel,{' '}
          <strong>fale com nossos especialistas</strong> e descubra como
          aproveitar ao <strong>máximo o retorno do seu investimento</strong>{' '}
          com a <strong>DEV Solar</strong>.
        </p>

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
                  width={80}
                  domain={[domainMin, domainMax]}
                  tickFormatter={(value) => currencyFormatter(value)}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value: number) => [
                    currencyFormatter(value),
                    'Saldo Acumulado',
                  ]}
                  labelFormatter={(label) => `Ano ${label}`}
                />

                {/* Linha do Ponto Zero de Payback */}
                <ReferenceLine
                  y={0}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{
                    value: 'Linha do Payback',
                    fill: '#ef4444',
                    fontSize: 12,
                    fontWeight: 500,
                    position: 'insideTopRight', // <-- Fixa o texto na extremidade superior direita da linha
                    dy: -18, // <-- Distância de 6px acima da linha para não colar
                    dx: 5, // <-- Afasta ligeiramente do eixo Y para não poluir
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
      </div>
    </>
  );
};

export default Example;
