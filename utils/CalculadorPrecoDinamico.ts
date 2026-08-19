export interface FaixaPreco {
  valor_faixa: number;
  conta_de: number;
  conta_ate: number;
}

interface RegraFaixa {
  x_ini: number;
  x_fim: number;
  vf: number;
  b: number;
}

export class CalculadorPrecoDinamico {
  private faixasRegras: RegraFaixa[] = [];

  constructor(faixas: FaixaPreco[]) {
    this.processarFaixas(faixas);
  }

  private processarFaixas(faixas: FaixaPreco[]) {
    // Ordena as faixas de forma crescente pelo valor inicial
    const dfFaixas = [...faixas].sort((a, b) => a.conta_de - b.conta_de);
    const qtd = dfFaixas.length;

    this.faixasRegras = dfFaixas.map((atual, i) => {
      const x_ini = atual.conta_de;
      const vf = atual.valor_faixa;
      let x_fim: number;
      let v_fim: number;

      if (i < qtd - 1) {
        const proxima = dfFaixas[i + 1];
        x_fim = proxima.conta_de;
        v_fim = proxima.valor_faixa;
      } else {
        x_fim = Math.round(atual.conta_ate);
        v_fim = vf + (x_fim - x_ini) * 10.0;
      }

      const dx = x_fim - x_ini;
      const dy = v_fim - vf;
      const b = dx !== 0 ? dy / dx : 10.0;

      return { x_ini, x_fim, vf, b };
    });
  }

  public calcular(valorConta: number): number {
    const LIMITE_MAX = 999999999.99;

    if (isNaN(valorConta) || valorConta < 0) return 0;
    if (valorConta > LIMITE_MAX) {
      throw new Error(`O valor excede o limite máximo permitido (R$ ${LIMITE_MAX.toLocaleString('pt-BR')})`);
    }

    const primeira = this.faixasRegras[0];
    if (!primeira) return 0;

    // 1. Abaixo do valor mínimo da tabela
    if (valorConta < primeira.x_ini) {
      const preco = primeira.vf - (primeira.x_ini - valorConta) * primeira.b;
      return Number(Math.max(0, preco).toFixed(2));
    }

    // 2. Busca e calcula dentro das faixas cadastradas
    for (const f of this.faixasRegras) {
      if (valorConta >= f.x_ini && valorConta < f.x_fim) {
        const preco = f.vf + (valorConta - f.x_ini) * f.b;
        return Number(preco.toFixed(2));
      }
    }

    // 3. Extrapolação contínua para valores altos até 999.999.999,99
    const ultima = this.faixasRegras[this.faixasRegras.length - 1];
    const precoExtrapolado = ultima.vf + (valorConta - ultima.x_ini) * ultima.b;
    return Number(precoExtrapolado.toFixed(2));
  }
}