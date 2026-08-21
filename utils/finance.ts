interface FinancialInput {
  valorMensal: number;       // Entrada 1
  valorFinal: number;        // Entrada 2
  periodosMeses: number;     // Entrada 3
}

interface FinancialOutput {
  taxaMensal: number;        // Saída 1 (%)
  taxaAnual: number;         // Saída 2 (%)
}

export function calcularTaxas(input: FinancialInput): FinancialOutput {
  const P = input.valorMensal;
  const VF = input.valorFinal;
  const n = input.periodosMeses;

  // 1. Método Numérico para encontrar a Taxa Mensal (Aproximação de Newton-Raphson)
  let taxaMensalDecimal = 0.01; // Palpite inicial (1%)
  const precisao = 1e-7;
  const maxIteracoes = 100;

  for (let i = 0; i < maxIteracoes; i++) {
    // Equação base: P * (((1 + i)^n - 1) / i) - VF = 0
    const t = 1 + taxaMensalDecimal;
    const tPowN = Math.pow(t, n);
    const tPowNMinus1 = Math.pow(t, n - 1);

    // Função f(i)
    const f = P * ((tPowN - 1) / taxaMensalDecimal) - VF;

    // Derivada f'(i)
    const df = P * ((n * tPowNMinus1 * taxaMensalDecimal - (tPowN - 1)) / (taxaMensalDecimal * taxaMensalDecimal));

    const proximaTaxa = taxaMensalDecimal - f / df;

    // Se a mudança for menor que a precisão aceitável, encontramos a taxa
    if (Math.abs(proximaTaxa - taxaMensalDecimal) < precisao) {
      taxaMensalDecimal = proximaTaxa;
      break;
    }

    taxaMensalDecimal = proximaTaxa;
  }

  // 2. Cálculo da Taxa Anual a partir da Mensal
  const taxaAnualDecimal = Math.pow(1 + taxaMensalDecimal, 12) - 1;

  // Retorna os valores formatados em porcentagem (%) com 4 casas decimais
  return {
    taxaMensal: Number((taxaMensalDecimal * 100).toFixed(1)),
    taxaAnual: Number((taxaAnualDecimal * 100).toFixed(1))
  };
}