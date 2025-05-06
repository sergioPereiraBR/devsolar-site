'use client';

// src/data/benefitsData.js ou um local similar

/**
 * Estrutura de dados para a seção de benefícios.
 * Cada objeto no array principal representa um benefício.
 * Cada benefício contém um array de 'categories' (Residência, Condomínio, Empresa).
 * Cada categoria contém um objeto 'detail' com informações específicas,
 * gerado pela função auxiliar createCategoryDetail.
 */

// Função auxiliar para criar a estrutura de detalhes da categoria
const createCategoryDetail = (id, title, detailTitle, text, citations, references, contactMessage, contactTag) => ({
    id,             // ID único para a view de detalhe (ex: 'ec-res')
    title,          // Título para o header do modal na view de detalhe (ex: 'Residência - Economia Imediata')
    detailTitle,    // Título principal dentro do corpo do modal de detalhe
    text,           // Texto principal de descrição
    citations: citations.map((cite, index) => ({ id: `cite-${id}-${index + 1}`, text: cite.text, link: cite.link })), // Array de objetos de citação
    references: references.map((ref, index) => ({ id: `ref-${id}-${index + 1}`, text: ref })), // Array de objetos de referência
    contactMessage, // Mensagem para o botão 'Fale Conosco' nesta view
    contactTag,     // Tag para o botão 'Fale Conosco' nesta view
});

// Dados principais dos benefícios
export const benefitsData = [
    // 1. Economia Imediata
    {
        id: 'economia',
        title: 'Economia Imediata',
        iconClass: 'fas fa-piggy-bank',
        description: 'Reduza sua conta de luz em até 95% já no primeiro mês após a instalação.',
        modalTitle: 'Economia Imediata com Energia Solar',
        contactMessageBase: 'Olá, tenho interesse em reduzir custos com energia elétrica e quero falar com especialista.',
        contactTagBase: '#economiaImediata',
        categories: [
            {
                id: 'economia-residencia',
                iconClass: 'fas fa-house',
                title: 'Residência',
                description: 'Reduza drasticamente ou elimine sua conta de luz já no primeiro mês.',
                detail: createCategoryDetail(
                    'ec-res', 'Residência - Economia Imediata', 'Elimine sua conta de luz já no primeiro mês após a instalação.',
                    'O investimento inicial se paga com a economia contínua ao longo dos anos.',
                    [
                        { text: '"Com a instalação de um sistema fotovoltaico, você pode reduzir drasticamente os custos com energia elétrica..."', link: 'https://blog.intelbras.com.br/como-funciona-energia-solar-residencial/' },
                        { text: '"Sistema fotovoltaico pode economizar até 95% na sua conta de energia..."', link: 'https://solalux.com.br/sistema-fotovoltaico-economia-energia/' },
                        { text: '"Redução de custos com energia elétrica é um dos principais benefícios..."', link: 'https://www.reenergisa.com.br/blog/fontes-renovaveis/conheca-os-muitos-beneficios-da-energia-solar-para-residencias-e-empresas' },
                    ],
                    [
                        '[1] Como funciona a energia solar residencial... Intelbras Blog. Acesso em: 11 abr. 2025.',
                        '[2] Sistema Fotovoltaico: Como Economizar Até 95%... Solalux. Acesso em: 11 abr. 2025.',
                        '[3] Conheça os muitos benefícios da Energia Solar... Reenergisa. Acesso em: 11 abr. 2025.',
                    ],
                    'Olá, tenho interesse em reduzir custos com energia elétrica na residência e quero falar com especialista.', '#economia #residencial'
                ),
            },
            {
                id: 'economia-condominio',
                iconClass: 'fas fa-building',
                title: 'Condomínio',
                description: 'Diminua significativamente a taxa condominial para todos os moradores.',
                detail: createCategoryDetail(
                    'ec-con', 'Condomínio - Economia Imediata', 'Diminua significativamente a taxa condominial para todos os moradores.',
                    'Gere uma economia coletiva imediata, tornando o custo de vida mais acessível.',
                    [
                        { text: '"Reajustar a taxa condominial anualmente... permite contemplar correções..."', link: 'https://vieirabraga.com.br/defesa-em-caso-de-divida-de-taxa-condominial-o-que-fazer/' },
                        { text: '"Ações coletivas, como instalação de energia solar, reduzem custos condominiais..."', link: 'https://repositorio.ulisboa.pt/bitstream/10451/38313/1/ulfc124909_tm_Tom%C3%A1s_Jord%C3%A3o.pdf' },
                        { text: '"Pequenas atitudes, como otimização de recursos, geram economia no dia a dia..."', link: 'https://fabasa.com.br/2023/04/27/pequenas-atitudes-podem-gerar-economia-no-dia-a-dia/' },
                    ],
                    [
                        '[1] Defesa em caso de dívida de taxa condominial... Vieira Braga. Acesso em: 11 abr. 2025.',
                        '[2] Viabilidade económica de medidas... Repositório ULisboa. Acesso em: 11 abr. 2025.',
                        '[3] Pequenas atitudes podem gerar economia... Fabasa. Acesso em: 11 abr. 2025.',
                    ],
                    'Olá, tenho interesse em reduzir custos com energia elétrica no condomínio e quero falar com especialista.', '#economia #condominial'
                ),
            },
            {
                id: 'economia-empresa',
                iconClass: 'fas fa-briefcase',
                title: 'Empresa',
                description: 'Reduza seus custos operacionais, aumentando a margem de lucro.',
                detail: createCategoryDetail(
                    'ec-emp', 'Empresa - Economia Imediata', 'Aumente sua margem de lucro e a competitividade do seu negócio.',
                    'Viabilizado pela redução dos seus custos operacionais com energia elétrica, desde o início da operação do sistema solar.',
                    [
                        { text: '"Empresas reduzem custos operacionais com energia em até 95%..."', link: 'https://solalux.com.br/sistema-fotovoltaico-economia-energia/' },
                        { text: '"Energia solar é uma estratégia sustentável e econômica para empresas..."', link: 'https://www.reenergisa.com.br/blog/fontes-renovaveis/conheca-os-muitos-beneficios-da-energia-solar-para-residencias-e-empresas' },
                        { text: '"O investimento em projetos de energia solar... decisão inteligente e estratégica..."', link: 'https://elysia.com.br/energia-solar-empresa-competitividade-economia/' },
                    ],
                    [
                        '[1] Sistema Fotovoltaico: Como Economizar Até 95%... Solalux. Acesso em: 11 abr. 2025.',
                        '[2] Conheça os muitos benefícios da Energia Solar... Reenergisa. Acesso em: 11 abr. 2025.',
                        '[3] EMPRESA com energia solar: aumento de competitividade... Elysia. Acesso em: 11 abr. 2025.',
                    ],
                    'Olá, tenho interesse em reduzir custos com energia elétrica na empresa e quero falar com especialista.', '#economia #empresarial'
                ),
            },
        ],
    },
    // 2. Sustentabilidade
    {
        id: 'sustentabilidade',
        title: 'Sustentabilidade',
        iconClass: 'fas fa-leaf',
        description: 'Energia limpa e renovável que reduz significativamente sua pegada de carbono.',
        modalTitle: 'Sustentabilidade com Energia Solar',
        contactMessageBase: 'Olá, tenho interesse em reduzir a pegada de carbono, em energia limpa e renovável e quero falar com especialista.',
        contactTagBase: '#sustentabilidade',
        categories: [
            {
                id: 'sustentabilidade-residencia',
                iconClass: 'fas fa-house',
                title: 'Residência',
                description: 'Contribua ativamente para um futuro mais verde, reduzindo sua pegada de carbono.',
                detail: createCategoryDetail(
                    'sus-res', 'Residência - Sustentabilidade', 'Contribua ativamente para um futuro mais verde',
                    'Utilizando uma fonte de energia limpa e renovável, reduzindo sua pegada de carbono e o impacto ambiental.',
                    [
                        { text: '"A escolha de fontes renováveis... pode ajudar os consumidores a reduzir a sua pegada de carbono"', link: 'https://www.publituris.pt/opiniao/como-a-energia-renovavel-pode-ajudar-a-reduzir-a-pegada-de-carbono-das-viagens-em-portugal' },
                        { text: '"O objetivo da energia limpa é reduzir ou eliminar a pegada de carbono..."', link: 'https://fia.com.br/blog/energia-limpa/' },
                        { text: '"A principal vantagem da energia limpa é a sua capacidade de reduzir significativamente as emissões..."', link: 'https://origoenergia.com.br/blog/energia/energia-limpa-vantagens-e-desvantagens' },
                    ],
                    [
                        '[1] Como a energia renovável pode ajudar... Publituris. Acesso em: 12 abr. 2025.',
                        '[2] Energia limpa: o que é, vantagens... FIA. Acesso em: 12 abr. 2025.',
                        '[3] Energia Limpa: veja quais as vantagens... Origo Energia. Acesso em: 12 abr. 2025.',
                    ],
                    'Olá, tenho interesse em reduzir a pegada de carbono, em energia limpa e renovável na residência e quero falar com especialista.', '#sustentabilidade #residencial'
                )
            },
            {
                id: 'sustentabilidade-condominio',
                iconClass: 'fas fa-building',
                title: 'Condomínio',
                description: 'Demonstre o compromisso com a sustentabilidade em larga escala.',
                detail: createCategoryDetail(
                    'sus-con', 'Condomínio - Sustentabilidade', 'Compromisso com sustentabilidade em larga escala',
                    'Tornando-se um exemplo de responsabilidade ambiental para toda a comunidade.',
                    [
                        { text: '"Transição para energias limpas substituem combustíveis fósseis poluentes..."', link: 'https://www.iberdrola.com/sustentabilidade/pegada-carbono' },
                        { text: '"O fornecimento de energia renovável reduz significativamente a emissão de gases..."', link: 'https://repositorio.ufersa.edu.br/server/api/core/bitstreams/102331ca-d5d5-45b1-a991-c215f4f4d590/content' },
                        { text: '"Para alcançar um futuro sustentável, devemos priorizar fontes renováveis..."', link: 'https://www.linkedin.com/pulse/o-futuro-da-gera%C3%A7%C3%A3o-de-energia-reduzindo-pegada-aline-marchetti/' },
                    ],
                    [
                        '[1] O que é a pegada de carbono?... Iberdrola. Acesso em: 12 abr. 2025.',
                        '[2] Energia fotovoltaica e suas contribuições... Repositório UFERSA. Acesso em: 12 abr. 2025.',
                        '[3] O Futuro da Geração de Energia... LinkedIn. Acesso em: 12 abr. 2025.',
                    ],
                    'Olá, tenho interesse em reduzir a pegada de carbono, em energia limpa e renovável no condomínio e quero falar com especialista.', '#sustentabilidade #condominial'
                )
            },
            {
                id: 'sustentabilidade-empresa',
                iconClass: 'fas fa-briefcase',
                title: 'Empresa',
                description: 'Fortaleça a imagem da sua marca como ecologicamente responsável.',
                detail: createCategoryDetail(
                    'sus-emp', 'Empresa - Sustentabilidade', 'Fortaleça sua imagem como empresa ecologicamente responsável',
                    'Atraindo clientes e investidores conscientes e alinhando-se com as práticas ESG.',
                    [
                        { text: '"A biomassa e o biogás são fontes de energia renovável que podem desempenhar um papel fundamental..."', link: 'https://www.ecogenbrasil.com.br/o-que-e-pegada-de-carbono/' },
                        { text: '"A energia solar tem emergido como uma solução sustentável chave para o agronegócio..."', link: 'https://mayaenergy.com.br/reduzindo-a-pegada-de-carbono-com-energia-solar/' },
                        { text: '"Energia renovável com baixa emissão de carbono é essencial para alinhar práticas empresariais..."', link: 'https://www.kas.de/documents/265553/265602/7_file_storage_file_15610_5.pdf/7a71f052-c16e-6f6f-069f-a7849912a97d' },
                    ],
                    [
                        '[1] O que é pegada de carbono e como reduzir... Ecogen Brasil. Acesso em: 12 abr. 2025.',
                        '[2] Reduzindo a Pegada de Carbono com Energia Solar. Maya Energy. Acesso em: 12 abr. 2025.',
                        '[3] Energia renovável com baixa emissão de carbono. KAS. Acesso em: 12 abr. 2025.',
                    ],
                    'Olá, tenho interesse em reduzir a pegada de carbono, em energia limpa e renovável na empresa e quero falar com especialista.', '#sustentabilidade #empresarial'
                )
            },
        ]
    },
    // 3. Valorização Imobiliária
    {
        id: 'valorizacao',
        title: 'Valorização Imobiliária',
        iconClass: 'fas fa-chart-line',
        description: 'Imóveis com sistemas solares são avaliados em até 4% acima do valor de mercado.', // Nota: As fontes citam valores variados, de 3% a 30%. Usar uma média ou faixa pode ser mais seguro.
        modalTitle: 'Valorização Imobiliária com Energia Solar',
        contactMessageBase: 'Olá, tenho interesse na valorização do imóvel e quero falar com especialista.',
        contactTagBase: '#valorizaçãoImobiliária',
        categories: [
            {
                id: 'valorizacao-residencia',
                iconClass: 'fas fa-house',
                title: 'Residência',
                description: 'Aumente o valor de mercado do seu imóvel, tornando-o mais atrativo.',
                detail: createCategoryDetail(
                    'val-res', 'Residência - Valorização Imobiliária', 'Aumente o valor de mercado do seu imóvel',
                    'Casas com sistemas de energia solar instalados são mais atrativas para compradores e podem ser vendidas por um preço mais alto.',
                    [
                        { text: '"A energia solar valoriza imóveis... A valorização pode chegar a 30%..."', link: 'https://grupoe4.com.br/energia-solar-valoriza-o-imovel/' },
                        { text: '"Estudos mostram que... um imóvel pode valorizar até 10%..."', link: 'https://g1.globo.com/sc/santa-catarina/especial-publicitario/top-sun/top-sun-energia-solar/noticia/2023/03/24/valorize-seu-imovel-em-ate-10percent-com-energia-solar.ghtml' },
                        { text: '"Um imóvel com energia solar se valoriza... entre 3% e 6%..."', link: 'https://blog.solarpowerenergy.com.br/imoveis-com-energia-solar/' },
                    ],
                    [
                        '[1] Energia solar valoriza o imóvel?. Grupo E4. Acesso em: 12 abr. 2025.',
                        '[2] Valorize seu imóvel em até 10%... G1. Acesso em: 12 abr. 2025.',
                        '[3] Você sabia que os imóveis com energia solar... Solar Power Energy Blog. Acesso em: 12 abr. 2025.',
                    ],
                    'Olá, tenho interesse na valorização do imóvel da residência e quero falar com especialista.', '#valorizaçãoImobiliária #residencial'
                )
            },
            {
                id: 'valorizacao-condominio',
                iconClass: 'fas fa-building',
                title: 'Condomínio',
                description: 'Valorize todas as unidades, tornando-o mais desejável.',
                detail: createCategoryDetail(
                    'val-con', 'Condomínio - Valorização Imobiliária', 'Valorize todas as unidades do condomínio',
                    'Tornando-o mais desejável para potenciais compradores e inquilinos, além de reduzir os custos para os moradores atuais.',
                    [
                        { text: '"Investir em energia solar não só reduz custos... mas também aumenta significativamente a valorização..."', link: 'https://solarvale.com.br/o-impacto-da-energia-solar-na-valorizacao-de-imoveis/' },
                        { text: '"A energia solar fotovoltaica pode ter um impacto significativo na valorização imobiliária..."', link: 'https://imperiosolar.com.br/valorizacao-imobiliaria-o-impacto-da-energia-solar-fotovoltaica/' },
                        { text: '"É crescente a demanda de mercado que visa a aquisição de energia solar... para valorização de imóveis... condomínios."', link: 'https://g1.globo.com/sp/presidente-prudente-regiao/especial-publicitario/solar-power-photovoltaic/noticia/2021/05/14/a-solar-power-ensina-como-valorizar-o-seu-imovel-em-ate-30percent-com-energia-solar.ghtml' },
                    ],
                    [
                        '[4] O impacto da energia solar na valorização... Solar Vale. Acesso em: 12 abr. 2025.', // Reajustando índices
                        '[5] Valorização imobiliária, o impacto da energia solar... Imperio Solar. Acesso em: 12 abr. 2025.',
                        '[6] A Solar Power ensina como valorizar o seu imóvel... G1. Acesso em: 12 abr. 2025.',
                    ],
                    'Olá, tenho interesse na valorização do imóvel do condomínio e quero falar com especialista.', '#valorizaçãoImobiliária #condominial'
                )
            },
            {
                id: 'valorizacao-empresa',
                iconClass: 'fas fa-briefcase',
                title: 'Empresa',
                description: 'Seu imóvel comercial se torna um ativo mais valioso e competitivo.',
                detail: createCategoryDetail(
                    'val-emp', 'Empresa - Valorização Imobiliária', 'Seu imóvel comercial com energia solar',
                    'Torna-se um ativo mais valioso e competitivo no mercado imobiliário, além de reduzir seus custos operacionais.',
                    [
                        { text: '"Imóveis com energia solar oferecem economia de longo prazo, atraindo compradores..."', link: 'https://acssolar.com.br/o-impacto-da-energia-solar-na-valorizacao-de-imoveis-na-regiao-dos-lagos/' },
                        { text: '"Investir em energia solar pode aumentar o valor do seu imóvel em até 10%..."', link: 'https://www.linkedin.com/pulse/energia-solar-o-potencial-de-valoriza%C3%A7%C3%A3o-imobili%C3%A1ria-e-nelson-assis-0apef/?originalSubdomain=pt' },
                        { text: '"A energia solar é uma excelente opção... valoriza o patrimônio."', link: 'https://meufinanciamentosolar.com.br/dicas/para-voce/valorizacao-do-imovel-energia-solar' },
                    ],
                    [
                        '[7] O Impacto da Energia Solar na Valorização... ACS Solar. Acesso em: 12 abr. 2025.', // Reajustando índices
                        '[8] Energia Solar: O Potencial de Valorização... LinkedIn. Acesso em: 12 abr. 2025.',
                        '[9] Valorização do imóvel com energia solar... Meu Financiamento Solar. Acesso em: 12 abr. 2025.',
                    ],
                    'Olá, tenho interesse na valorização do imóvel da empresa e quero falar com especialista.', '#valorizaçãoImobiliária #empresarial'
                )
            },
        ]
    },
    // 4. Baixa Manutenção
    {
        id: 'manutencao',
        title: 'Baixa Manutenção',
        iconClass: 'fas fa-tools',
        description: 'Sistemas duráveis com garantia de até 25 anos e mínima necessidade de manutenção.',
        modalTitle: 'Baixa Manutenção do Sistema de Energia Solar',
        contactMessageBase: 'Olá, tenho interesse na baixa manutenção do sistema de energia solar e quero falar com especialista.',
        contactTagBase: '#baixaManutenção',
        categories: [
            {
                id: 'manutencao-residencia',
                iconClass: 'fas fa-house',
                title: 'Residência',
                description: 'Sistemas requerem pouca manutenção, geralmente apenas limpezas periódicas.',
                detail: createCategoryDetail(
                    'man-res', 'Residência - Baixa Manutenção', 'Sistemas solares de baixa manutenção',
                    'Os sistemas solares requerem pouca manutenção, geralmente apenas limpezas periódicas dos painéis para garantir a máxima eficiência. Desfrute de energia limpa sem grandes preocupações.',
                    [
                        { text: '"A manutenção inclui principalmente a limpeza regular dos módulos..."', link: 'https://energiasroraima.com.br/wp-content/uploads/2024/03/Cartilha-Manutencao-e-Operacao.pdf' },
                        { text: '"A sujeira depositada sobre as células... pode reduzir a efetividade..."', link: 'https://www.solarvolt.com.br/blog/manutencao-sistemas-fotovoltaicos/' },
                        { text: '"Embora os sistemas fotovoltaicos sejam projetados para operar com baixa necessidade de manutenção..."', link: 'https://sunergia.com.br/blog/instalacao-manutencao-e-suporte-em-energia-solar-fotovoltaica/' },
                    ],
                    [
                        '[1] Energia solar fotovoltaica... Cartilha Manutenção [PDF]. Energias Roraima. Acesso em: 12 abr. 2025.',
                        '[2] Manutenção de sistemas fotovoltaicos... Solar Volt Blog. Acesso em: 12 abr. 2025.',
                        '[3] Instalação, manutenção e suporte... Sunergia Blog. Acesso em: 12 abr. 2025.',
                    ],
                    'Olá, tenho interesse na baixa manutenção do sistema de energia solar na residência e quero falar com especialista.', '#baixaManutenção #residencial'
                )
            },
            {
                id: 'manutencao-condominio',
                iconClass: 'fas fa-building',
                title: 'Condomínio',
                description: 'Custos e trabalho de conservação mínimos, otimizando recursos a longo prazo.',
                detail: createCategoryDetail(
                    'man-con', 'Condomínio - Baixa Manutenção', 'Sistemas duráveis e econômicos',
                    'Com sistemas duráveis e de baixa manutenção, os custos e o trabalho de conservação são mínimos, otimizando os recursos do condomínio a longo prazo.',
                    [
                        { text: '"A preocupação com a manutenção vem com a evolução do sistema..."', link: 'https://pleiade.uniamerica.br/index.php/bibliotecadigital/article/download/556/665/1713' },
                        { text: '"A baixa demanda por manutenção é mais um fator que torna a geração de energia solar uma excelente opção"', link: 'https://energiasirius.com/manutencao-energia-solar/' },
                        { text: '"Exige pouca manutenção em suas centrais de produção"', link: 'https://energiasirius.com/manutencao-energia-solar/' }, // Nota: Link repetido na fonte original
                    ],
                    [
                        '[4] A importância dos cuidados técnicos... [PDF]. Plêiade Uniamerica. Acesso em: 12 abr. 2025.', // Índices continuados
                        '[5] Manutenção em energia solar... Energia Sirius. Acesso em: 12 abr. 2025.',
                        '[6] Energia solar: como funciona... Energia Sirius. Acesso em: 12 abr. 2025.',
                    ],
                    'Olá, tenho interesse na baixa manutenção do sistema de energia solar no condomínio e quero falar com especialista.', '#baixaManutenção #condominial'
                )
            },
            {
                id: 'manutencao-empresa',
                iconClass: 'fas fa-briefcase',
                title: 'Empresa',
                description: 'Sistemas projetados para durar, permitindo foco no core business.',
                detail: createCategoryDetail(
                    'man-emp', 'Empresa - Baixa Manutenção', 'Foco no core business',
                    'Sistemas solares são projetados para durar e exigem pouca intervenção, permitindo que sua empresa foque no core business sem se preocupar com manutenções constantes.',
                    [
                        { text: '"As normas estabelecem diretrizes para garantir a segurança durante todas as fases..."', link: 'https://www.portalsolar.com.br/norma-tecnica-energia-solar' },
                        { text: '"Sistemas fotovoltaicos integrados... como uma fonte renovável..."', link: 'https://pt.scribd.com/document/389444993/Citacoes-Parafrases-e-Citacao-Da-Citacao' },
                        { text: '"A produção de energia solar é uma solução durável e de baixa manutenção..."', link: 'https://teses.usp.br/teses/disponiveis/102/102131/tde-31082018-154505/publico/TeseCorrigidaRosileneRegolao.pdf' },
                    ],
                    [
                        '[7] Norma técnica de instalação... Portal Solar. Acesso em: 12 abr. 2025.', // Índices continuados
                        '[8] Citações Paráfrases e Citação Da Citação [PDF]. Scribd. Acesso em: 12 abr. 2025.',
                        '[9] Análise integrada de desempenho... [PDF] Teses USP. Acesso em: 12 abr. 2025.',
                    ],
                    'Olá, tenho interesse na baixa manutenção do sistema de energia solar na empresa e quero falar com especialista.', '#baixaManutenção #empresarial'
                )
            },
        ]
    },
    // 5. Proteção contra Aumentos
    {
        id: 'protecao',
        title: 'Proteção contra Aumentos',
        iconClass: 'fas fa-shield-alt',
        description: 'Fique imune aos constantes aumentos na tarifa de energia elétrica.',
        modalTitle: 'Proteção contra Aumentos na Conta de Luz',
        contactMessageBase: 'Olá, tenho interesse na proteção contra aumentos no custo da energia e quero falar com especialista.',
        contactTagBase: '#proteçãoContraAumento',
        categories: [
            {
                id: 'protecao-residencia',
                iconClass: 'fas fa-house',
                title: 'Residência',
                description: 'Proteja seu orçamento familiar contra elevações nas tarifas.',
                detail: createCategoryDetail(
                    'pro-res', 'Residência - Proteção contra Aumentos', 'Proteção contra aumentos na conta de luz',
                    'Proteja seu orçamento familiar contra as constantes elevações nas tarifas de energia elétrica. Com a energia solar, você tem mais controle sobre seus gastos.',
                    [
                        { text: '"A energia solar protege o consumidor dos aumentos na conta de luz..."', link: 'https://www.portalsolar.com.br/energia-solar-vale-a-pena' },
                        { text: '"A energia solar é uma excelente alternativa para diminuir seus gastos..."', link: 'https://cordeiroenergia.com.br/entenda-a-relacao-entre-conta-de-luz-e-energia-solar/' },
                        { text: '"O papo de hoje é com você que quer aprender tudo sobre inflação energética..."', link: 'https://insolenergia.com.br/tecnologia/como-se-proteger-dos-aumentos-na-conta-de-luz/' },
                    ],
                    [
                        '[1] Energia Solar Fotovoltaica vale a pena?. Portal Solar. Acesso em: 12 abr. 2025.',
                        '[2] Entenda a relação entre conta de luz... Cordeiro Energia. Acesso em: 12 abr. 2025.',
                        '[3] Como se proteger dos aumentos... Insol Energia. Acesso em: 12 abr. 2025.',
                    ],
                    'Olá, tenho interesse na proteção contra aumentos no custo da energia consumida na residência e quero falar com especialista.', '#proteçãoContraAumento #residencial'
                )
            },
            {
                id: 'protecao-condominio',
                iconClass: 'fas fa-building',
                title: 'Condomínio',
                description: 'Reduza a vulnerabilidade do condomínio aos aumentos tarifários.',
                detail: createCategoryDetail(
                    'pro-con', 'Condomínio - Proteção contra Aumentos', 'Redução de vulnerabilidade tarifária',
                    'Reduza a vulnerabilidade do condomínio aos aumentos tarifários, garantindo uma despesa mais estável e previsível para todos os moradores.',
                    [
                        { text: '"A Lei nº 14.300/2022 institui o marco legal da microgeração..."', link: 'https://www.gov.br/aneel/pt-br/acesso-a-informacao/perguntas-frequentes/micro-e-minigeracao-distribuida' },
                        { text: '"A energia solar fotovoltaica converte a luz solar em eletricidade sem emissões..."', link: 'https://www.semace.ce.gov.br/wp-content/uploads/sites/46/2020/09/RIMA-Usina-Solar-Geradora-de-Energia-SGA-Ltda-Sao-Goncalo-Setembro-2020.pdf' },
                        { text: '"A taxação do Sol afeta o retorno financeiro... mas sistemas existentes permanecem protegidos..."', link: 'https://solardospomares.com.br/taxacao-do-sol-e-seu-impacto-economico/' },
                    ],
                    [
                        '[4] Micro e Minigeração Distribuída. Gov.br ANEEL. Acesso em: 12 abr. 2025.', // Índices continuados
                        '[5] RELATÓRIO DE IMPACTO AMBIENTAL [PDF]. SEMACE CE. Acesso em: 12 abr. 2025.',
                        '[6] O Impacto da Taxação do Sol... Solar dos Pomares. Acesso em: 12 abr. 2025.',
                    ],
                    'Olá, tenho interesse na proteção contra aumentos no custo da energia consumida no condomínio e quero falar com especialista.', '#proteçãoContraAumento #condominial'
                )
            },
            {
                id: 'protecao-empresa',
                iconClass: 'fas fa-briefcase',
                title: 'Empresa',
                description: 'Minimize o impacto das flutuações de custos de energia no seu negócio.',
                detail: createCategoryDetail(
                    'pro-emp', 'Empresa - Proteção contra Aumentos', 'Planejamento financeiro seguro',
                    'Minimize o impacto das flutuações e aumentos nos custos de energia, tornando seu planejamento financeiro mais seguro e competitivo a longo prazo.',
                    [
                        { text: '"A energia solar protege o consumidor dos aumentos na conta de luz..."', link: 'https://www.portalsolar.com.br/energia-solar-vale-a-pena' },
                        { text: '"A taxação do Sol impacta o retorno financeiro, mas empresas com sistemas instalados antes..."', link: 'https://solardospomares.com.br/taxacao-do-sol-e-seu-impacto-economico/' },
                        { text: '"A microgeração distribuída permite que empresas gerem própria energia..."', link: 'https://www.gov.br/aneel/pt-br/acesso-a-informacao/perguntas-frequentes/micro-e-minigeracao-distribuida' },
                    ],
                    [
                        '[7] Energia Solar Fotovoltaica vale a pena?. Portal Solar. Acesso em: 12 abr. 2025.', // Índices continuados
                        '[8] O Impacto da Taxação do Sol... Solar dos Pomares. Acesso em: 12 abr. 2025.',
                        '[9] Micro e Minigeração Distribuída. Gov.br ANEEL. Acesso em: 12 abr. 2025.',
                    ],
                    'Olá, tenho interesse na proteção contra aumentos no custo da energia consumida na empresa e quero falar com especialista.', '#proteçãoContraAumento #empresarial'
                )
            },
        ]
    },
    // 6. Financiamento Facilitado
    {
        id: 'financiamento',
        title: 'Financiamento Facilitado',
        iconClass: 'fas fa-file-invoice-dollar',
        description: 'Parcelas que cabem no seu bolso, muitas vezes menores que sua atual conta de luz.',
        modalTitle: 'Financiamento Facilitado para Energia Solar',
        contactMessageBase: 'Olá, tenho interesse no financiamento facilitado e quero falar com especialista.',
        contactTagBase: '#financiamentoFacilitado',
        categories: [
            {
                id: 'financiamento-residencia',
                iconClass: 'fas fa-house',
                title: 'Residência',
                description: 'Aproveite diversas opções com condições facilitadas e taxas atrativas.',
                detail: createCategoryDetail(
                    'fin-res', 'Residência - Financiamento Facilitado', 'Financiamento facilitado para energia solar',
                    'Aproveite diversas opções de financiamento com condições facilitadas e taxas atrativas para tornar a energia solar acessível para o seu lar.',
                    [
                        { text: '"O financiamento para energia solar fotovoltaica amplia o acesso a sistemas residenciais..."', link: 'https://cmsarquivos.febraban.org.br/Arquivos/documentos/PDF/FINAL_L08_energia_solar_ONLINE.pdf' },
                        { text: '"Incentivos fiscais e linhas de crédito específicas tornam a energia solar uma opção financeiramente viável..."', link: 'https://www.portalsolar.com.br/energia-solar-no-brasil.html' },
                        { text: '"O setor solar brasileiro conta com programas de financiamento que reduzem custos iniciais..."', link: 'https://cresesb.cepel.br/publicacoes/download/Manual_de_Engenharia_FV_2014.pdf' },
                    ],
                    [
                        '[1] FINANCIAMENTO PARA ENERGIA SOLAR... [PDF]. Febraban. Acesso em: 12 abr. 2025.',
                        '[2] Energia Solar no Brasil... Portal Solar. Acesso em: 12 abr. 2025.',
                        '[3] Manual de Engenharia para Sistemas... Cresesb/CEPEL. Acesso em: 12 abr. 2025.',
                    ],
                    'Olá, tenho interesse no financiamento facilitado para residência e quero falar com especialista.', '#financiamentoFacilitado #residencial'
                )
            },
            {
                id: 'financiamento-condominio',
                iconClass: 'fas fa-building',
                title: 'Condomínio',
                description: 'Explore linhas de crédito e financiamentos especiais para condomínios.',
                detail: createCategoryDetail(
                    'fin-con', 'Condomínio - Financiamento Facilitado', 'Financiamento coletivo e sustentável',
                    'Explore linhas de crédito e financiamentos especiais para condomínios, tornando o investimento em energia solar viável e com retorno garantido para todos.',
                    [
                        { text: '"Condomínios podem acessar linhas de financiamento coletivo..."', link: 'https://cmsarquivos.febraban.org.br/Arquivos/documentos/PDF/FINAL_L08_energia_solar_ONLINE.pdf' },
                        { text: '"A regulamentação brasileira incentiva a geração distribuída, incluindo condomínios..."', link: 'https://cresesb.cepel.br/publicacoes/download/Manual_de_Engenharia_FV_2014.pdf' },
                        { text: '"A energia solar é uma das fontes renováveis com maior crescimento... impulsionada por financiamentos..."', link: 'https://www.absolar.org.br/noticia/energia-solar-e-a-2a-maior-fonte-energetica-do-pais-como-ter-em-casa/' },
                    ],
                    [
                        '[1] FINANCIAMENTO PARA ENERGIA SOLAR... [PDF]. Febraban. Acesso em: 12 abr. 2025.',
                        '[3] Manual de Engenharia para Sistemas... Cresesb/CEPEL. Acesso em: 12 abr. 2025.', // Nota: índice 2 usado na ref 3 original
                        '[4] Energia solar é a 2ª maior fonte... Absolar. Acesso em: 12 abr. 2025.', // Reajustando índice
                    ],
                    'Olá, tenho interesse no financiamento facilitado para condomínio e quero falar com especialista.', '#financiamentoFacilitado #condominial'
                )
            },
            {
                id: 'financiamento-empresa',
                iconClass: 'fas fa-briefcase',
                title: 'Empresa',
                description: 'Descubra linhas de financiamento e incentivos fiscais disponíveis.',
                detail: createCategoryDetail(
                    'fin-emp', 'Empresa - Financiamento Facilitado', 'Incentivos fiscais e linhas de crédito',
                    'Descubra as diversas linhas de financiamento e incentivos fiscais disponíveis para empresas que investem em energia solar, facilitando a implementação do sistema.',
                    [
                        { text: '"Empresas têm acesso a incentivos fiscais e linhas de crédito específicas..."', link: 'https://www.portalsolar.com.br/energia-solar-no-brasil.html' },
                        { text: '"O marco legal da microgeração distribuída... facilita o financiamento..."', link: 'https://cresesb.cepel.br/publicacoes/download/Manual_de_Engenharia_FV_2014.pdf' },
                        { text: '"Financiamentos para energia solar são estratégicos para empresas..."', link: 'https://cmsarquivos.febraban.org.br/Arquivos/documentos/PDF/FINAL_L08_energia_solar_ONLINE.pdf' },
                    ],
                    [
                        '[2] Energia Solar no Brasil... Portal Solar. Acesso em: 12 abr. 2025.', // Índice 2 usado na ref 1 original
                        '[3] Manual de Engenharia para Sistemas... Cresesb/CEPEL. Acesso em: 12 abr. 2025.',
                        '[1] FINANCIAMENTO PARA ENERGIA SOLAR... [PDF]. Febraban. Acesso em: 12 abr. 2025.', // Índice 1 usado na ref 3 original
                    ],
                    'Olá, tenho interesse no financiamento facilitado para empresa e quero falar com especialista.', '#financiamentoFacilitado #empresarial'
                )
            },
        ]
    },
];