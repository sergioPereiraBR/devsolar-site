'use client';

import { AreaChart } from '@/components/tremor/AreaChart'; // Supondo que esta é a importação correta
import { cx } from '@/lib/utils'; // Supondo que esta é a importação correta
// import '@/styles/tremor-tailwind.css';
import React from 'react'; // Import React se não estiver

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

const currencyFormatter = (value: unknown): string => { // Especifica o retorno como string

    // Verifica se o valor é null, undefined ou não pode ser convertido para número finito
    const number = Number(value); // Tenta converter para número

    if (value === null || value === undefined || !isFinite(number)) {
        console.warn(`currencyFormatter recebeu valor inválido ou não finito: ${typeof value}`, value);
        return 'N/A'; // Ou '-', ou ''
    }
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0, // Sem centavos para valores grandes
        notation: 'compact',
        compactDisplay: 'short',
    });
    return formatter.format(number);
};

const percentFormatter = (number: number): string => {
    if (typeof number !== 'number' || isNaN(number) || !isFinite(number)) {
        return 'N/A'; // Ou um valor padrão
    }
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });
    return formatter.format(number / 100); // Assumindo que o número é ex: 15.5 para 15.5%
};
// Ou se o número já for decimal (ex: 0.155):
// return formatter.format(number);


const Example: React.FC<ResumoDadosProps> = ({ dataProject }) => {
    // Adiciona uma verificação inicial para dataProject null ou com erro
    if (!dataProject) {
        // Você pode retornar null ou uma mensagem indicando que não há dados
        console.warn("dataProject não fornecido ou contém erro:", dataProject);
        return <div className="text-center p-4 text-red-500">Erro ao carregar dados do gráfico.</div>;
    }

    // Usa os dados passados diretamente
    const dataLocal: Project = dataProject;

    const getMaxValue = () => {
        // Usa data (dados completos) para calcular o máximo
        if (!dataLocal.data || dataLocal.data.length === 0) return 10000; // Um fallback razoável
        // Garante que estamos comparando números
        const maxEconomia = Math.max(...dataLocal.data.map(item => Number(item.Economia) || 0));
        // Arredonda para o próximo múltiplo de 1000 ou 10000 para uma escala mais limpa
        const magnitude = Math.pow(10, Math.floor(Math.log10(maxEconomia)));
        const roundedMax = Math.ceil(maxEconomia / (magnitude / 2)) * (magnitude / 2); // Arredonda para múltiplos de 500, 5000, etc.

        return Math.max(roundedMax, 1000); // Garante um valor mínimo para o eixo
    };

    // Formata os totais do sumário usando os formatters
    const summary = [
        { category: 'Economia Acumulada (25 Anos)', total: currencyFormatter(dataLocal.economiaAcumulada), color: 'bg-[#ff9e00]' },
        { category: 'Redução Média de Custos', total: percentFormatter(Number(dataLocal.taxCostReduct)), color: 'bg-emerald-500' },
        { category: 'VPL (Valor Presente Líquido)', total: currencyFormatter(Number(dataLocal.vpl)), color: 'bg-blue-500' }, // Cor diferente
        { category: 'TIR (Taxa Interna de Retorno)', total: percentFormatter(dataLocal.tir), color: 'bg-blue-500' }, // Multiplica TIR por 100 se ela for decimal
        { category: 'ROI (Retorno s/ Investimento)', total: percentFormatter(Number(dataLocal.roi)), color: 'bg-blue-500' },
    ];

    return (
        <>
            <div className="sm:mx-auto sm:max-w-7xl m-1">
                <h1 className="font-medium text-footer-color dark:text-gray-50">
                    Economia Calculada | Garantia Standard
                </h1>
                <p className="text-sm/6 text-gray-500 dark:text-gray-500">
                    Para maior precisão das informações fornecidas <strong>consulte nossos especialistas</strong>. Com o cálculo na mão, você já pode chamar a <strong>DEV Solar</strong> e pensar no que vai fazer com <strong>sua economia</strong>.
                </p>
                <ul role="list" className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-5">
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

                {/* Gráfico AreaChart */}
                <AreaChart
                    data={dataProject.dataResume} // Usa os dados resumidos
                    index={"Ano"} // Eixo X
                    categories={['Economia']}
                    minValue={0}// Define mínimo do eixo Y
                    maxValue={getMaxValue()} // Define máximo do eixo Y (opcional, auto geralmente funciona)
                    colors={['primary']} // Cores Tremor (ajuste) - use primary/secondary se definido no tema
                    showLegend={false}
                    yAxisWidth={80} // Ajuste a largura do eixo Y se necessário
                    valueFormatter={currencyFormatter} // Formata valores do eixo Y e tooltips
                    fill={"solid"} // Estilo de preenchimento do gradiente
                    className={"mt-8 h-80"} // Margem acima e altura fixa - REMOVIDO 'hidden' e 'sm:block'
                />
            </div>
        </>
    );
}

export default Example;