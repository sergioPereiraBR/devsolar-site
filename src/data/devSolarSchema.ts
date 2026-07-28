// src/data/devSolarSchema.ts

export const devSolarSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://www.devsolar.com.br/#organization',
      name: 'DEV Solar',
      legalName: 'DEV Eficiência Energética Ltda.',
      alternateName: 'DEV Solar',
      url: 'https://www.devsolar.com.br',
      logo: 'https://www.devsolar.com.br/images/logo-devsolar-icon.webp',
      image: 'https://www.devsolar.com.br/images/logo-devsolar-icon.webp',
      telephone: '+55-21-99967-7722',
      priceRange: '$$$',
      taxID: '53.538.425/0001-15',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Jambeiro, 474 Loja C',
        addressLocality: 'Vila Valqueire',
        addressRegion: 'RJ',
        postalCode: '21330-300',
        addressCountry: 'BR',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -22.8893,
        longitude: -43.3712,
      },
      review: [
        {
          '@type': 'Review',
          name: 'Case de Sucesso: Condomínio Lilases',
          headline:
            'Investimento inteligente com a Dev Solar! Gasto de R$ 6.000 virou economia, pagando o financiamento e permitindo outras melhorias.',
          reviewBody:
            'Investir em energia solar com a DEV Solar foi a decisão financeira mais inteligente que tomamos recentemente. Convertemos um gasto de mais de R$ 6.000,00/mês num financiamento de R$ 4.500,00 durante 3 anos e depois disso a geração própria de energia beneficiará ainda mais o condomínio. O sistema de energia solar já se tornou um investimento que se paga com a própria economia gerada, e ainda conseguimos direcionar recursos para outras melhorias.',
          author: {
            '@type': 'Person',
            name: 'Cliente Condomínio Lilases',
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
        },
        {
          '@type': 'Review',
          name: 'Case de Sucesso: Casa da Fernanda',
          headline:
            'Agora produzimos nossa própria energia e reduzimos custos com a conta de luz. Fomos bem atendidos e estamos satisfeitos com o serviço.',
          reviewBody:
            'Com atendimento proativo e esclarecedor, todas as dúvidas foram respondidas prontamente. A flexibilidade na negociação levou a um valor ideal e viabilizou a instalação do sistema de energia solar, que trouxe benefícios para a casa e para toda a família.',
          author: {
            '@type': 'Person',
            name: 'Cliente Casa da Fernanda',
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
        },
        {
          '@type': 'Review',
          name: 'Case de Sucesso: Casa do Osmar',
          headline:
            'A instalação do nosso sistema solar foi feita com profissionais de excelente qualidade, até a entrega com a ligação na rede pública de energia.',
          reviewBody:
            'Desde a negociação, a equipe demonstrou confiança e compromisso com o que faz. A entrega final ocorreu com qualidade e com integração correta ao serviço público de energia elétrica.',
          author: {
            '@type': 'Person',
            name: 'Cliente Casa do Osmar',
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '3',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.devsolar.com.br/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Quanto tempo leva para instalar um sistema solar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A instalação física é rápida, levando de 2 a 3 dias para residências e de 1 a 3 semanas para grandes projetos comerciais, industriais ou condomínios. No entanto, o processo completo inclui a homologação da concessionária para conectar o sistema à rede elétrica pública, etapa que leva de 1 a 4 semanas.',
          },
        },
        {
          '@type': 'Question',
          name: 'Os painéis funcionam em dias nublados?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim! Os painéis solares dependem da luminosidade e radiação, não do calor, por isso continuam gerando energia mesmo com o céu encoberto. Em dias totalmente nublados, a produção se mantém ativa, operando entre 10% e 25% da sua capacidade máxima em comparação a um dia de céu limpo.',
          },
        },
        {
          '@type': 'Question',
          name: 'Preciso de baterias para armazenar energia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não necessariamente. A maioria dos sistemas utiliza o modelo On-Grid, que funciona conectado à rede pública. Durante o dia, os painéis geram energia para consumo imediato e o excedente é enviado para a distribuidora, transformando-se em créditos. À noite ou em dias chuvosos, você consome a energia da rede e abate desses créditos acumulados. O uso de baterias é restrito aos modelos Off-Grid ou Híbridos, indicados apenas para situações específicas. São elas: locais isolados sem acesso à rede, proteção contra apagões, armazenamento estratégico para horários de tarifa alta e atendimento a sistemas críticos.',
          },
        },
        {
          '@type': 'Question',
          name: 'Qual a vida útil dos painéis solares?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Os painéis solares modernos têm vida útil superior a 25 anos. Os fabricantes garantem que eles manterão pelo menos 80% a 85% da sua capacidade de geração original ao final desse período. Na prática, muitos módulos continuam gerando energia por 30 ou 40 anos, operando apenas com uma eficiência ligeiramente reduzida.',
          },
        },
        {
          '@type': 'Question',
          name: 'Como funciona o financiamento dos sistemas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O processo é estruturado para que a própria economia gerada pague o investimento. O objetivo principal é que o valor da parcela seja igual ou menor do que a redução obtida na sua conta de luz. Para isso, oferecemos opções de financiamento de até 100% do projeto, cobrindo tanto os equipamentos (painéis e inversor) quanto a mão de obra de instalação.',
          },
        },
      ],
    },
  ],
};