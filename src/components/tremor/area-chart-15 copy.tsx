'use client';

import { AreaChart } from '@/components/tremor/AreaChart';
import { cx } from '@/lib/utils';


function currencyFormatter(number: number) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 1,
    notation: 'compact',
    compactDisplay: 'short',
  });

  return formatter.format(number);
}

interface Dado {
  ['Ano']: number;
  ['Economia']: number;
  ['Custo']: number;
  ['Payback']: number;
}

interface Project {
  ['text_payback']: string;
  ['data']: Dado[];
  ['dataResume']: Dado[];
  ['potenciaEstimadaKwp']: number;
  ['investimentoEstimado']: number;
  ['custoMensalInformado']: number;
  ['economiaAcumulada']: number;
  ['tir']: number;
  ['vpl']: number;
  ['roi']: number;
  ['taxCostReduct']: number;
  ['projecao']: number;
}

interface ResumoDadosProps {
  dataProject: Project;
}

const Example: React.FC<ResumoDadosProps> = ({ dataProject }) => {

  const dataLocal: Project = dataProject;

  const getMaxValue = () => {
    if (!dataLocal.data || dataLocal.data.length === 0) return 1000;

    const max = Math.max(...dataLocal.data.map(item => item.Economia));
    const roundedMax = Math.ceil(max / 100) * 100; // Arredonda para cima em múltiplos de 100
    return roundedMax;
  };

  const summary = [
    {
      category: 'Economia Acumulada',
      total: currencyFormatter(dataLocal.economiaAcumulada),
      color: 'bg-[#ff9e00] dark:bg-[#ff9e00]',
    },
    {
      category: 'Redução de Custos (%)',
      total: dataLocal.taxCostReduct.toFixed(1) + '%',
      color: 'bg-emerald-500 dark:bg-emerald-500',
    },
    {
      category: 'VPL - Valor Presente Líquido',
      total: currencyFormatter(dataLocal.vpl),
      color: 'bg-[#004dcd] dark:bg-[#004dcd]',
    },
    {
      category: 'TIR - Taxa Interna de Retorno',
      total: dataLocal.tir.toFixed(1) + '%',
      color: 'bg-[#004dcd] dark:bg-[#004dcd]',
    },
    {
      category: 'ROI - Retorno Sobre o Investimento',
      total: dataLocal.roi.toFixed(1) + '%',
      color: 'bg-[#004dcd] dark:bg-[#004dcd]',
    },
  ];

  return (
    <>
      <div className="sm:mx-auto sm:max-w-7xl m-1">
        <h1 className="font-medium text-gray-900 dark:text-gray-50">
          Economia Calculada
        </h1>
        <p className="text-sm/6 text-gray-500 dark:text-gray-500">
          Para maior precisão das informações fornecidas <strong>consulte nossos especialistas</strong>. Com o cálculo na mão, você já pode chamar a <strong>DEV Solar</strong> e pensar no que vai fazer com <strong>sua economia</strong>.
        </p>
        <ul role="list" className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
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
              {item.color !== null ? (
                <p className="pl-3 text-sm text-gray-500 dark:text-gray-500">
                  {item.category}
                </p>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {item.category}
                </p>
              )}
            </li>
          ))}
        </ul>

        <AreaChart
          data={dataLocal.dataResume}
          index="Ano"
          categories={['Economia']}
          minValue={0}
          maxValue={getMaxValue()}
          colors={['primary', 'emerald']}
          showLegend={false}
          yAxisWidth={90}
          valueFormatter={currencyFormatter}
          fill="solid"
          className="mt-10 hidden h-72 sm:block"
        />
      </div>
    </>
  );
}

export default Example;