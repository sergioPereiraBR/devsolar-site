//import { irr as calculateLibraryIRR } from 'irr'; // Importa a função da biblioteca
import calculateLibraryIRR from 'irr';


/**
 * Calcula o Valor Presente Líquido (NPV) de uma série de fluxos de caixa.
 * @param {number} rate - A taxa de desconto por período (ex: 0.1 para 10%).
 * @param {number[]} cashFlows - Um array de fluxos de caixa, começando com o investimento inicial (FC0, geralmente negativo) no índice 0.
 * @returns {number} O Valor Presente Líquido.
 */
export function calculateNPV(rate, cashFlows) {
    if (!cashFlows || cashFlows.length === 0) {
        return 0;
    }
    let npv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
        npv += (cashFlows[t] || 0) / Math.pow(1 + rate, t);
    }
    return npv;
}

/**
 * Calcula a Taxa Interna de Retorno (TIR/IRR) para uma série de fluxos de caixa.
 * AVISO: Esta é uma implementação iterativa BÁSICA e pode não convergir
 * para todos os casos ou ser imprecisa. Recomenda-se usar uma biblioteca
 * financeira dedicada (ex: 'financejs', 'irr') em produção.
 * @param {number[]} cashFlows - Array de fluxos de caixa (FC0, FC1, ...).
 * @param {number} [guess=0.1] - Uma estimativa inicial para a taxa.
 * @param {number} [maxIterations=100] - Número máximo de iterações.
 * @param {number} [tolerance=1e-6] - Tolerância para considerar o NPV como zero.
 * @returns {number | NaN} A Taxa Interna de Retorno estimada ou NaN se não convergir.

export function calculateIRR(cashFlows, guess = 0.1, maxIterations = 100, tolerance = 1e-6) {
    if (!cashFlows || cashFlows.length < 2 || cashFlows[0] >= 0) {
        // Precisa de investimento inicial negativo e pelo menos um fluxo futuro
        return NaN;
    }

    let rate = guess;
    let iteration = 0;

    // Usa uma variação simples do método da Secante ou busca
    let lowerBound = -0.99; // Evita taxa de -100%
    let upperBound = 10.0;  // Limite superior arbitrário
    let npv = calculateNPV(rate, cashFlows);

    while (iteration < maxIterations) {
        if (Math.abs(npv) < tolerance) {
            return rate; // Convergiu
        }

        // Atualiza limites baseado no sinal do NPV
        if (npv > 0) {
            lowerBound = rate;
        } else {
            upperBound = rate;
        }

        // Calcula a próxima estimativa (média simples, poderia ser mais sofisticado)
        let nextRate = (lowerBound + upperBound) / 2;

        // Evita ficar preso se os limites forem iguais
        if (Math.abs(nextRate - rate) < tolerance / 10) break; // Parada se a taxa mudar pouco

        rate = nextRate;
        npv = calculateNPV(rate, cashFlows);
        iteration++;
    }

    console.warn("Cálculo da TIR pode não ter convergido.");
    return NaN; // Não convergiu
}
     */

/**
 * Calcula o Período de Payback Simples.
 * @param {number[]} cashFlows - Array de fluxos de caixa (FC0 negativo, FC1, ...).
 * @returns {number | Infinity} O período de payback (pode ser fracionado) ou Infinity se nunca for recuperado.
 */
export function calculateSimplePayback(cashFlows) {
    if (!cashFlows || cashFlows.length < 1 || cashFlows[0] >= 0) {
        return Infinity; // Sem investimento inicial ou sem fluxos futuros
    }
    const initialInvestment = Math.abs(cashFlows[0]);
    let cumulativeCashFlow = 0;
    for (let t = 1; t < cashFlows.length; t++) {
        const previousCumulative = cumulativeCashFlow;
        cumulativeCashFlow += (cashFlows[t] || 0);
        if (cumulativeCashFlow >= initialInvestment) {
            // Payback ocorre neste período (t)
            // Interpolação para valor fracionado:
            const investmentRemaining = initialInvestment - previousCumulative;
            const cashFlowThisPeriod = cashFlows[t] || 0;
            if (cashFlowThisPeriod <= 0) return Infinity; // Evita divisão por zero se fluxo for não positivo
            return (t - 1) + (investmentRemaining / cashFlowThisPeriod);
        }
    }
    return Infinity; // Payback não ocorre dentro do período
}

/**
 * Calcula o Período de Payback Descontado.
 * @param {number} rate - A taxa de desconto por período.
 * @param {number[]} cashFlows - Array de fluxos de caixa (FC0 negativo, FC1, ...).
 * @returns {number | Infinity} O período de payback descontado ou Infinity.
 */
export function calculateDiscountedPayback(rate, cashFlows) {
    if (!cashFlows || cashFlows.length < 1 || cashFlows[0] >= 0) {
        return Infinity;
    }
    const initialInvestment = Math.abs(cashFlows[0]);
    let cumulativeDiscountedCashFlow = 0;
    for (let t = 1; t < cashFlows.length; t++) {
        const previousCumulative = cumulativeDiscountedCashFlow;
        const discountedCashFlow = (cashFlows[t] || 0) / Math.pow(1 + rate, t);
        cumulativeDiscountedCashFlow += discountedCashFlow;
        if (cumulativeDiscountedCashFlow >= initialInvestment) {
            const investmentRemaining = initialInvestment - previousCumulative;
            if (discountedCashFlow <= 0) return Infinity;
            // Interpola usando fluxos descontados
            return (t - 1) + (investmentRemaining / discountedCashFlow);
        }
    }
    return Infinity;
}

/**
 * Calcula o Custo Médio Ponderado de Capital (WACC).
 * @param {number} marketValueEquity - Valor de mercado do capital próprio (E).
 * @param {number} marketValueDebt - Valor de mercado da dívida (D).
 * @param {number} costOfEquity - Custo do capital próprio (Ke, como decimal).
 * @param {number} costOfDebt - Custo da dívida antes dos impostos (Kd, como decimal).
 * @param {number} taxRate - Alíquota de imposto corporativo (T, como decimal).
 * @returns {number} O WACC como decimal.
 */
export function calculateWACC(marketValueEquity, marketValueDebt, costOfEquity, costOfDebt, taxRate) {
    const totalCapital = marketValueEquity + marketValueDebt;
    if (totalCapital <= 0) return NaN; // Evita divisão por zero

    const weightEquity = marketValueEquity / totalCapital;
    const weightDebt = marketValueDebt / totalCapital;

    const wacc = (weightEquity * costOfEquity) + (weightDebt * costOfDebt * (1 - taxRate));
    return wacc;
}

/**
 * Calcula o Retorno sobre o Capital Investido (ROIC).
 * @param {number} nopat - Lucro Operacional Líquido Após Impostos (NOPAT).
 * @param {number} investedCapital - Capital Investido Total.
 * @returns {number} O ROIC como decimal.
 */
export function calculateROIC(nopat, investedCapital) {
    if (investedCapital === 0) return NaN;
    return nopat / investedCapital;
}

/**
 * Calcula a Taxa de Retorno Incremental (IRR Incremental) entre dois projetos.
 * @param {number[]} cashFlowsA - Fluxos de caixa do Projeto A (base).
 * @param {number[]} cashFlowsB - Fluxos de caixa do Projeto B (alternativa).
 * @param {number} [guess=0.1] - Estimativa inicial para a TIR.
 * @returns {number | NaN} A TIR Incremental ou NaN se não convergir/inválido.
 */
export function calculateIncrementalIRR(cashFlowsA, cashFlowsB, guess = 0.1) {
    const maxLength = Math.max(cashFlowsA.length, cashFlowsB.length);
    const incrementalFlows = [];
    for (let t = 0; t < maxLength; t++) {
        const cfA = cashFlowsA[t] || 0;
        const cfB = cashFlowsB[t] || 0;
        incrementalFlows.push(cfB - cfA);
    }
    // Reutiliza a função calculateIRR nos fluxos incrementais
    return calculateIRR(incrementalFlows, guess);
}

/**
 * Calcula a Taxa Interna de Retorno Modificada (MIRR).
 * @param {number[]} cashFlows - Array de fluxos de caixa (FC0, FC1, ...).
 * @param {number} financeRate - Taxa para descontar fluxos negativos (custo de capital/WACC).
 * @param {number} reinvestRate - Taxa para reinvestir fluxos positivos.
 * @returns {number | NaN} A MIRR como decimal ou NaN se inválido.
 */
export function calculateMIRR(cashFlows, financeRate, reinvestRate) {
    if (!cashFlows || cashFlows.length < 2) return NaN;

    const n = cashFlows.length - 1; // Número de períodos após o inicial
    let pvNegativeFlows = 0;
    let fvPositiveFlows = 0;

    cashFlows.forEach((cf, t) => {
        if (cf < 0) {
            pvNegativeFlows += Math.abs(cf) / Math.pow(1 + financeRate, t); // Traz negativos a valor presente
        } else if (cf > 0) {
            fvPositiveFlows += cf * Math.pow(1 + reinvestRate, n - t); // Leva positivos a valor futuro
        }
    });

    if (pvNegativeFlows <= 0 || fvPositiveFlows <= 0) {
        // Não é possível calcular se não houver saídas ou entradas (ou se o inicial for positivo)
        return NaN;
    }

    const mirr = Math.pow(fvPositiveFlows / pvNegativeFlows, 1 / n) - 1;
    return mirr;
}

/**
 * Calcula o Índice de Lucratividade (PI).
 * @param {number} rate - A taxa de desconto por período.
 * @param {number[]} cashFlows - Array de fluxos de caixa (FC0 negativo, FC1, ...).
 * @returns {number | NaN} O Índice de Lucratividade ou NaN se o investimento inicial for zero ou positivo.
 */
export function calculatePI(rate, cashFlows) {
    if (!cashFlows || cashFlows.length < 1 || cashFlows[0] >= 0) {
        return NaN;
    }
    const initialInvestment = Math.abs(cashFlows[0]);
    let pvFutureCashFlows = 0;
    for (let t = 1; t < cashFlows.length; t++) {
        pvFutureCashFlows += (cashFlows[t] || 0) / Math.pow(1 + rate, t);
    }
    return pvFutureCashFlows / initialInvestment;
}

/**
 * Calcula o Valor Econômico Adicionado (EVA).
 * @param {number} nopat - Lucro Operacional Líquido Após Impostos (NOPAT).
 * @param {number} investedCapital - Capital Investido Total.
 * @param {number} wacc - Custo Médio Ponderado de Capital (WACC, como decimal).
 * @returns {number} O EVA.
 */
export function calculateEVA(nopat, investedCapital, wacc) {
    const capitalCharge = investedCapital * wacc;
    return nopat - capitalCharge;
}

/**
 * Calcula o Valor Presente dos Fluxos de Caixa Futuros (base da metodologia DCF).
 * Exclui o fluxo de caixa inicial (t=0).
 * @param {number} rate - A taxa de desconto por período.
 * @param {number[]} cashFlows - Array de fluxos de caixa (FC0, FC1, ...).
 * @returns {number} O valor presente dos fluxos de caixa de t=1 até n.
 */
export function calculateDCFValue(rate, cashFlows) {
    if (!cashFlows || cashFlows.length < 2) {
        return 0;
    }
    let dcfValue = 0;
    for (let t = 1; t < cashFlows.length; t++) {
        dcfValue += (cashFlows[t] || 0) / Math.pow(1 + rate, t);
    }
    return dcfValue;
}

// Importa a função da biblioteca 'irr' (certifique-se de que o nome importado esteja correto)
// Pode ser 'irr', 'IRR', etc., dependendo de como a biblioteca exporta.
// Verifique a documentação ou o código-fonte da biblioteca 'irr'.
// Assumindo que a função exportada se chama 'irr':
// Ou, se a exportação padrão for a função:
// import calculateLibraryIRR from 'irr';

/**
 * Calcula a Taxa Interna de Retorno (TIR/IRR) usando uma biblioteca dedicada.
 * @param {number[]} cashFlows - Array de fluxos de caixa (FC0, FC1, ...).
 * @param {number} [guess] - Estimativa inicial (opcional, depende da biblioteca).
 * @returns {number | NaN} A Taxa Interna de Retorno ou NaN se não convergir ou ocorrer erro.
 */
export function calculateIRR(cashFlows, guess) {
    try {
        // A biblioteca 'irr' pode esperar apenas os fluxos.
        // Verifique a documentação dela para opções como 'guess'.
        // Passa o 'guess' se ele foi fornecido.
        const result = guess !== undefined
            ? calculateLibraryIRR(cashFlows, guess)
            : calculateLibraryIRR(cashFlows);

        // A biblioteca pode retornar null, NaN ou lançar erro em caso de falha.
        // Adicionamos isFinite para cobrir casos de Infinity/-Infinity também.
        if (result === null || isNaN(result) || !isFinite(result)) {
            console.warn("Cálculo da TIR pela biblioteca falhou ou não convergiu.");
            return NaN; // Retorna NaN em caso de falha ou resultado inválido
        }
        return result; // Retorna o resultado numérico válido
    } catch (error) {
        console.error("Erro ao calcular TIR com a biblioteca:", error);
        return NaN; // Retorna NaN se ocorrer um erro durante a execução
    }
}

// Exemplo de uso (igual ao anterior, mas sem tipos explícitos):
/*
const fluxosExemplo = [-10000, 3000, 3500, 4000, 4500];
const minhaTIR = calculateIRR(fluxosExemplo); // Pode passar um guess: calculateIRR(fluxosExemplo, 0.05)
console.log("TIR Estimada:", minhaTIR);
*/

/*
 * Calcula o Valor Presente Líquido para
 * um período constante sem inversão de sinal
 *
 * @taxa => taxa de desconto
 * @montantes => vetor com os valores com os recebimentos ou pagamentos
 * -100,30,30,10,10,10,10
 */
export function vpl(taxa, montantes) {
    var ret = montantes[0];

    for (var i = 1; i < montantes.length; i++)
        ret += montantes[i] / Math.pow((1.0 + taxa), i);
    return ret;
}

/*
 * Calcula a Taxa Interna de Retorno
 *
 * @montantes => vetor com os valores
 */
export function tir(montantes) {
    var ret = -1000000000.0;
    var juros_inicial = -1.0;
    var juros_medio = 0.0;
    var juros_final = 1.0;
    var vpl_inicial = 0.0;
    var vpl_final = 0.0;
    var vf = 0.0;
    var erro = 1e-5;

    for (var i = 0; i < 100; i++) {
        vpl_inicial = vpl(juros_inicial, montantes);
        vpl_final = vpl(juros_final, montantes);
        if (sinal(vpl_inicial) != sinal(vpl_final))
            break;
        juros_inicial -= 1.0;
        juros_final += 1.0;
    };
    var count = 0;
    for (; ;) {
        // Busca por Bisseção
        var juros_medio = (juros_inicial + juros_final) / 2.0;
        var vpl_medio = vpl(juros_medio, montantes)

        if (Math.abs(vpl_medio) <= erro) {
            // Resultado foi encontrado
            return juros_medio * 100.0;
        };
        if (sinal(vpl_inicial) == sinal(vpl_medio)) {
            juros_inicial = juros_medio;
            vpl_inicial = vpl(juros_medio, montantes);
        } else {
            juros_final = juros_medio;
            vpl_final = vpl(juros_medio, montantes);
        };
        if (++count > 10000)
            throw "looping inválido";
    };
    return ret;
};

function sinal(x) {
    return x < 0.0 ? -1 : 1;
}


