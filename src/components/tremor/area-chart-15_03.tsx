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

interface CustomYAxisTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: number;
  };
  maxY: number;
}

const CustomYAxisTick: React.FC<CustomYAxisTickProps> = ({
  x = 0,
  y = 0,
  payload,
  maxY,
}) => {
  if (!payload) return null;
  const value = payload.value;

  // Formatação do texto
  let text = currencyFormatter(value, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  if (value === 0) {
    text = 'R$ 0';
  }

  // Estilização condicional ff9e00 10b981
  const isNegative = value < 0;
  const isMax = Math.abs(value - maxY) < 1; // Verifica se é o valor máximo

  const fill = isMax ? '#ff9e00' : isNegative ? '#ef4444' : '#6b7280'; // Verde se máximo, Vermelho se negativo e Cinza padrão se positivo
  const fontWeight = isMax ? 700 : 400; // Negrito apenas no valor máximo

  // Ajuste fino vertical (dy) para afastar o R$ 0 do valor negativo
  let dyOffset = 4;
  if (value === 0) {
    dyOffset = -1; // Sobe o R$ 0 para não colidir com o valor negativo
  } else if (isNegative) {
    dyOffset = 6; // Desce ligeiramente o valor negativo
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

// // Componente de Tick Customizado para afastar o R$ 0 do -R$ 71k
// const CustomYAxisTick = (props: any) => {
//   const { x, y, payload } = props;
//   const value = payload.value;

//   // Trata a legenda do Zero
//   let text = currencyFormatter(value, {
//     minimumFractionDigits: 1,
//     maximumFractionDigits: 1,
//   });
//   let dyOffset = 4; // Padrão de alinhamento vertical

//   if (value === 0) {
//     text = 'R$ 0';
//     dyOffset = -1; // <-- Move APENAS o rótulo "R$ 0" para CIMA
//   } else if (value < 0) {
//     dyOffset = 5; // <-- Move ligeiramente o valor negativo para BAIXO
//   }

//   return (
//     <g transform={`translate(${x},${y})`}>
//       <text
//         x={0}
//         y={0}
//         dy={dyOffset}
//         textAnchor="end"
//         fill="#6b7280"
//         fontSize={11}
//       >
//         {text}
//       </text>
//     </g>
//   );
// };

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
    minimumFractionDigits: 1, // <-- Controla o mínimo de casas decimais (ex: R$ 2,4 mi)
    maximumFractionDigits: 1, // <-- Controla o máximo de casas decimais
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

  // Garante que o investimento dinâmico seja respeitado
  const investimentoInicial =
    Math.abs(Number(dataLocal.investimentoEstimado)) || 0;

  // Mapeamento seguro dos dados
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

  // 1. Define o valor máximo do gráfico como a Economia Acumulada Total (ex: 3.6 mi)
  // const totalEconomiaAcumulada = Number(dataLocal.economiaAcumulada) || 0;

  // Pega o último ponto do gráfico ou a economia acumulada como o limite máximo cravado
  // const maxY =
  //   totalEconomiaAcumulada > 0
  //     ? totalEconomiaAcumulada
  //     : Math.max(...chartData.map((d) => d.Payback), 100000);

  // const domainMin = -investimentoInicial; // Ex: -71000
  // const domainMax = maxY; // Cravado em R$ 3,6 mi (Economia Acumulada)

  // Pega o valor exato do último ano da série temporal (Ano 2050)
  const ultimoPayback =
    chartData.length > 0 ? chartData[chartData.length - 1].Payback : 0;

  const maxY = ultimoPayback > 0 ? ultimoPayback : 100000;

  const domainMin = -investimentoInicial;
  const domainMax = maxY; // Agora o topo do eixo Y será exatamente igual ao valor de 2050

  // 2. Cria 4 divisões bem espaçadas acima do zero até o máximo (3,6 mi)
  const numSteps = 4;
  const positiveTicks = Array.from({ length: numSteps }, (_, i) =>
    Math.round(((i + 1) * maxY) / numSteps),
  );

  // // Cálculo do maior valor positivo
  // const yValues = chartData.map((d) => d.Payback);
  // const maxY = yValues.length > 0 ? Math.max(...yValues) : 400000;

  // const domainMin = -investimentoInicial;
  // const domainMax = isFinite(maxY) ? Math.ceil(maxY * 1.02) : 'auto';

  // // --- GERADOR DE MAIS TICKS NO EIXO Y ---
  // // Aumenta o número de divisões (6 passos positivos para gerar mais linhas de referência)
  // const numSteps = 4;
  // const positiveTicks = Array.from({ length: numSteps }, (_, i) =>
  //   Math.round(((i + 1) * maxY) / numSteps),
  // );

  // Combina o valor inicial negativo, o zero e as marcas positivas adicionais
  const customTicks = [domainMin, 0, ...positiveTicks];

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
                {/* <YAxis
                  width={85}
                  domain={[domainMin, domainMax]}
                  ticks={customTicks} // <-- Força a exibição de mais valores no eixo Y
                  interval={0} // <-- Impede o Recharts de ocultar valores
                  tickFormatter={(value) => currencyFormatter(value)}
                  tick={{ fontSize: 11 }}
                /> */}
                <YAxis
                  width={90}
                  domain={[domainMin, domainMax]}
                  ticks={customTicks}
                  interval={0}
                  tickFormatter={(value) => {
                    // Se for o zero, mostra simplesmente "R$ 0" para não colidir com "-R$ 71,0 mil"
                    if (value === 0) return 'R$ 0';

                    return currencyFormatter(value, {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    });
                  }}
                  tick={<CustomYAxisTick maxY={maxY} />} // <-- Usa o tick customizado com ajuste de offset
                  allowDataOverflow={true}
                />
                <Tooltip
                  formatter={(value: number) => [
                    currencyFormatter(value),
                    'Saldo Acumulado',
                  ]}
                  labelFormatter={(label) => `Ano ${label}`}
                />

                {/* Linha do Ponto Zero de Payback 3b82f6 */}
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
      </div>
    </>
  );
};

export default Example;
