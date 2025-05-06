import {
    calculateNPV,
    tir
} from '@/utils/financialCalculations';


export function calcularEconomiaSolar(custoMensalRs) {
    // Constantes de Cálculo (Exemplo - Devem ser mais precisas ou configuráveis)
    const TAXA_ENERGIA_RS_KWH = 1.18;
    const PERDA_SISTEMA_PERCENT = 25; // %
    const POTENCIA_PAINEL_W = 570;
    const INVESTIMENTO_ESTIMADO_BASE = 18000.00; // Exemplo, cálculo real seria mais complexo
    const TAXA_JUROS_ANUAL_ENERGIA = 0.06; // Para projeção de custo evitado
    const DEGRADACAO_PAINEL_ANO1 = 0.03;
    const DEGRADACAO_PAINEL_ANOS_SEGUINTES = 0.01;
    const VIDA_UTIL_SISTEMA_ANOS = 25;
    // --- Fim das Constantes ---

    // Placeholder - NECESSITA IMPLEMENTAÇÃO REAL (API, JSON, etc.)
    const obterDadosIrradiacao = (uf = 'RJ', latitude = -22.9, longitude = -43.2) => {
        // console.warn('Placeholder: Implementar busca real de dados de irradiação.');
        // Simulando uma média anual para RJ (exemplo, valor irreal)
        const mediaAnualKWhM2Dia = 5.5;  //[0, 0, 0, 0, 5.5, 5.3, 5.1, 5.4, 5.7, 6.0, 6.2, 6.1, 5.9, 5.8, 5.6, 5.4, 5.4]
        // Retorna um array simulando a média para cada mês (simplificado)
        return Array(12).fill(mediaAnualKWhM2Dia); // [5.0, 5.0, ..., 5.0]
    };

    // Placeholder - PRECISA DE DADOS REAIS OU INPUTS (CEP, etc.)
    const getLocalizacaoGeradora = () => ({
        uf: 'RJ',
        lat: -22.9,
        long: -43.2,
        // ... outros dados se necessários para irradiação
    });

    const roundPotenciaPico80p = (potenciaPico) => {
        // Lógica mantida, mas pode ser simplificada ou usar Math.round diretamente dependendo da regra exata
        const potenciaPico80pMin = potenciaPico * 0.8;
        return Math.max(1, Math.round(potenciaPico80pMin)); // Simplificado para arredondar normal e garantir min 1
    }

    if (!custoMensalRs || custoMensalRs < 300 || custoMensalRs > 999999999.99) {
        return { error: 'Custo mensal inválido', dataResume: [], text_payback: 'N/A' };
    }

    // 1. Dados de Consumo
    const consumoTotalKwhMes = custoMensalRs / TAXA_ENERGIA_RS_KWH;
    const consumoTotalKwhAno = consumoTotalKwhMes * 12;
    const consumoMediaKwhDia = (consumoTotalKwhAno / 12) / 30;

    // 2. Dados da Unidade Geradora (Simplificado)
    const localizacao = getLocalizacaoGeradora();
    const eficienciaSistema = 1 - (PERDA_SISTEMA_PERCENT / 100);
    const irradiacaoMediaDiariaMesKwhM2 = obterDadosIrradiacao(localizacao.uf, localizacao.lat, localizacao.long);
    // console.log('irradiacaoMediaDiariaMesKwhM2: ', irradiacaoMediaDiariaMesKwhM2);
    // Média anual simples para este exemplo
    const irradiacaoMediaAnualKwhM2Dia = irradiacaoMediaDiariaMesKwhM2.reduce((a, b) => a + b, 0) / 12;
    // console.log('irradiacaoMediaAnualKwhM2Dia: ', irradiacaoMediaAnualKwhM2Dia);

    // 3. Potencial do Sistema
    const consumoCompensadoKwhDia = consumoMediaKwhDia / eficienciaSistema;
    // console.log('consumoCompensadoKwhDia: ', consumoCompensadoKwhDia);
    const potenciaSistemaKwpNecessaria = consumoCompensadoKwhDia / irradiacaoMediaAnualKwhM2Dia;
    // console.log('potenciaSistemaKwpNecessaria: ', potenciaSistemaKwpNecessaria);
    const quantidadePaineis = Math.ceil(potenciaSistemaKwpNecessaria / (POTENCIA_PAINEL_W / 1000));
    // console.log('quantidadePaineis: ', quantidadePaineis);
    // Recalcula a potência real do sistema com base nos painéis inteiros
    const potenciaRealSistemaKwp = quantidadePaineis * (POTENCIA_PAINEL_W / 1000);
    // console.log('potenciaRealSistemaKwp: ', potenciaRealSistemaKwp);


    // 4. Produção Anual Estimada (Simplificado)
    // let potenciaSistemaKwpAno = 0;
    // irradiacaoMediaDiariaMesKwhM2.forEach(irradiacaoMes => {
    //     // Produção mensal = Potência_Sistema * Irradiação_Média_Dia * Dias_no_Mês * Eficiência
    //     // Simplificação: usando média anual de irradiação * 30 dias * 12 meses
    //     potenciaSistemaKwpAno += potenciaRealSistemaKwp * irradiacaoMediaAnualKwhM2Dia * 30 * eficienciaSistema;
    // });
    const potenciaSistemaKwpAno = potenciaRealSistemaKwp * irradiacaoMediaAnualKwhM2Dia * 365.25 * eficienciaSistema;
    // Correção: cálculo direto anual
    // potenciaSistemaKwpAno = potenciaRealSistemaKwp * irradiacaoMediaAnualKwhM2Dia * 365 * eficienciaSistema;
    // console.log('potenciaSistemaKwpAno: ', potenciaSistemaKwpAno);


    // 5. Cálculo do Payback
    let investimento = INVESTIMENTO_ESTIMADO_BASE * potenciaRealSistemaKwp; // Investimento proporcional

    if (custoMensalRs >= 300 && custoMensalRs <= 500) {
        investimento = ((custoMensalRs - 300) / (500 - 300) * (16200.00 - 12911.02)) + 12911.02;
    };

    if (custoMensalRs > 500 && custoMensalRs <= 800) {
        investimento = ((custoMensalRs - 500) / (800 - 500.01) * (17900.00 - 16200.00)) + 16200.00;
    };

    if (custoMensalRs > 800 && custoMensalRs <= 1000) {
        investimento = ((custoMensalRs - 800) / (1000 - 800.01) * (24000.24 - 17900.00)) + 17900.00;
    };

    if (custoMensalRs > 1000) {
        investimento = custoMensalRs * 24.00;
    };

    const acumulado = [];
    let economiaAcumulada = 0.0;
    let custoEvitadoAcumulado = 0.0;
    let paybackAnos = 0;
    let potenciaAtualSistema = potenciaSistemaKwpAno; // Produção no ano 1


    const fc = [-1 * investimento];

    for (let ano = 1; ano <= VIDA_UTIL_SISTEMA_ANOS; ano++) {
        // Taxa de energia atualizada com inflação energética
        const taxaEnergiaAtualizada = TAXA_ENERGIA_RS_KWH * Math.pow(1 + TAXA_JUROS_ANUAL_ENERGIA, ano - 1);

        // Economia gerada no ano (Produção * Tarifa Atualizada)
        const economiaAno = potenciaAtualSistema * taxaEnergiaAtualizada;
        economiaAcumulada += economiaAno;

        fc.push(economiaAno)

        // Custo que teria sem o sistema
        const custoSemSolarAno = consumoTotalKwhAno * taxaEnergiaAtualizada;
        custoEvitadoAcumulado += custoSemSolarAno;

        // Verifica payback
        if (paybackAnos === 0 && economiaAcumulada >= investimento) {
            // Cálculo mais preciso do mês/ano do payback (simplificado aqui para apenas o ano)
            paybackAnos = ano;
        }

        acumulado.push({
            'Ano': new Date().getFullYear() + ano, // Ano real
            'Economia': economiaAcumulada.toFixed(2), // Economia ACUMULADA
            'Custo': custoEvitadoAcumulado.toFixed(2), // Custo evitado ACUMULADO
            'Payback': (economiaAcumulada - investimento).toFixed(2)
        });

        // Aplica degradação para o próximo ano
        const taxaDegradacao = (ano === 1) ? DEGRADACAO_PAINEL_ANO1 : DEGRADACAO_PAINEL_ANOS_SEGUINTES;
        potenciaAtualSistema *= (1 - taxaDegradacao);
    };

    // Seleciona pontos para o resumo (dataResume)
    const indices = [0, 1, 2, 3, 4, 9, 14, 19, VIDA_UTIL_SISTEMA_ANOS - 1].filter(i => i < acumulado.length);
    const dataResume = indices.map(index => acumulado[index]);

    // Texto do Payback
    let textPayback = `Mais de ${VIDA_UTIL_SISTEMA_ANOS} anos`;
    if (paybackAnos > 0) {
        textPayback = paybackAnos <= 1 ? `Menos de 1 ano` : `~ ${paybackAnos} anos`;
    };

    // console.log("textPayback: ", textPayback);
    // console.log("acumulado: ", acumulado);
    // console.log("dataResume: ", dataResume);
    // console.log("potenciaRealSistemaKwp: ", potenciaRealSistemaKwp.toFixed(2));
    // console.log("economiaPrimeiroAno: ", (acumulado[0]?.Economia - (acumulado[-1]?.Economia || 0)).toFixed(2));
    // console.log("investimentoEstimado: ", investimento.toFixed(2));
    // console.log("custoMensalInformado: ", custoMensalRs);

    //economiaPrimeiroAno: (acumulado[0]?.Economia - (acumulado[-1]?.Economia || 0)).toFixed(2), // Simplificado
    const reduction = ((1 + ((economiaAcumulada - custoEvitadoAcumulado) / economiaAcumulada)) * 100);
    const roi_calc = (((economiaAcumulada - investimento) / investimento) * 100);
    const vpl_calc = calculateNPV(TAXA_JUROS_ANUAL_ENERGIA, fc);
    const tir_calc = tir(fc);

    // console.log("fc: ", fc);
    // console.log("reduction: ", reduction);
    // console.log("roi_calc: ", roi_calc);
    // console.log("vpl_calc: ", vpl_calc);
    // console.log("tir_calc: ", tir_calc);

    return {
        text_payback: textPayback,
        data: acumulado, // Dados anuais completos
        dataResume: dataResume,       // Dados resumidos para o gráfico
        potenciaEstimadaKwp: potenciaRealSistemaKwp,
        investimentoEstimado: investimento,
        custoMensalInformado: custoMensalRs,
        economiaAcumulada: economiaAcumulada,
        tir: tir_calc,
        vpl: vpl_calc,
        roi: roi_calc,
        taxCostReduct: reduction,
        projecao: VIDA_UTIL_SISTEMA_ANOS
    };
};

// --- Fim das Funções de Cálculo ---