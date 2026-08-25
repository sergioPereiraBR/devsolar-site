// src/data/devSolarSchema.ts

export const devSolarSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.devsolar.com.br/#organization",
      "name": "DEV Solar",
      "legalName": "DEV Eficiência Energética Ltda.",
      "alternateName": "DEV Solar",
      "slogan": "O futuro é solar",
      "description": "Empresa de energia solar fotovoltaica no Rio de Janeiro. Projeto, homologação, instalação e manutenção de sistemas solares residenciais, comerciais e condominiais, com até 85% de redução na conta de luz.",
      "foundingDate": "2024-01-17",
      "url": "https://www.devsolar.com.br/",
      "email": "comercial@devsolar.com.br",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.devsolar.com.br/_next/static/media/logo-dev-branco.0hhcwps62p05p.webp",
        "caption": "Logo DEV Solar"
      },
      "image": [
        {
          "@type": "ImageObject",
          "url": "https://www.devsolar.com.br/images/og-image-devsolar-1200x630.png",
          "width": 1200,
          "height": 630,
          "caption": "DEV Solar atua nas modalidades de produção de energia própria, compartilhada e para negócios"
        },
        {
          "@type": "ImageObject",
          "url": "https://www.devsolar.com.br/assets/photovoltaic-1920.webp",
          "width": 1920,
          "caption": "Fazenda de painéis solares fotovoltaicos"
        }
      ],
      "telephone": "+55-21-99967-7722",
      "priceRange": "$$$",
      "taxID": "53.538.425/0001-15",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+55-21-99967-7722",
          "email": "comercial@devsolar.com.br",
          "contactType": "sales",
          "areaServed": "BR",
          "availableLanguage": "Portuguese",
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        },
        {
          "@type": "ContactPoint",
          "telephone": "+55-21-99967-7722",
          "contactType": "customer service",
          "areaServed": "BR",
          "availableLanguage": "Portuguese"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61562778810789",
        "https://www.instagram.com/devsolar_",
        "https://www.linkedin.com/company/dev-solar-efici%C3%AAncia-energ%C3%A9tica"
      ],
      "hasMap": "https://www.google.com/maps?q=Av.+Jambeiro,+474+Loja+C,+Vila+Valqueire,+Rio+de+Janeiro,+RJ",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Jambeiro, 474 Loja C, Vila Valqueire",
        "addressLocality": "Rio de Janeiro",
        "addressRegion": "RJ",
        "postalCode": "21330-300",
        "addressCountry": "BR"
      },
      "potentialAction": {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://calendar.app.google/RhXHzWTouKb5GcVW8",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        },
        "result": {
          "@type": "Reservation",
          "name": "Agendamento de Consultoria em Energia Solar"
        }
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -22.8893,
        "longitude": -43.3712
      },
      "areaServed": [
        { "@type": "City", "name": "Rio de Janeiro" },
        { "@type": "City", "name": "Niterói" },
        { "@type": "City", "name": "São Gonçalo" },
        { "@type": "City", "name": "Duque de Caxias" },
        { "@type": "City", "name": "Nova Iguaçu" },
        { "@type": "City", "name": "Belford Roxo" },
        { "@type": "City", "name": "São João de Meriti" },
        { "@type": "City", "name": "Mesquita" },
        { "@type": "City", "name": "Nilópolis" },
        { "@type": "City", "name": "Itaboraí" },
        { "@type": "City", "name": "Maricá" },
        { "@type": "City", "name": "Magé" },
        { "@type": "City", "name": "Itaguaí" },
        { "@type": "City", "name": "Guapimirim" },
        { "@type": "City", "name": "Queimados" },
        { "@type": "City", "name": "Japeri" },
        { "@type": "City", "name": "Paracambi" },
        { "@type": "City", "name": "Seropédica" },
        { "@type": "City", "name": "Mangaratiba" },
        { "@type": "City", "name": "Tanguá" },
        { "@type": "AdministrativeArea", "name": "Baixada Fluminense" },
        { "@type": "AdministrativeArea", "name": "Região Metropolitana do Rio de Janeiro" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Catálogo de Serviços e Kits Solares",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": { "@id": "https://www.devsolar.com.br/#servico-projeto" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@id": "https://www.devsolar.com.br/#servico-instalacao" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@id": "https://www.devsolar.com.br/#servico-manutencao" }
          }
        ]
      },
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": { "@id": "https://www.devsolar.com.br/#financiamento-santander" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@id": "https://www.devsolar.com.br/#financiamento-bv" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@id": "https://www.devsolar.com.br/#financiamento-solagora" }
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://www.devsolar.com.br/#fornecedor-intelbras",
      "name": "Intelbras Solar",
      "url": "https://www.intelbras.com/pt-br/energia-solar",
      "logo": "https://www.devsolar.com.br/_next/static/media/intelbras.2-ze0yczdah13.webp",
      "description": "Soluções completas em equipamentos para energia solar fotovoltaica."
    },
    {
      "@type": "Organization",
      "@id": "https://www.devsolar.com.br/#fornecedor-weg",
      "name": "WEG Solar",
      "url": "https://www.weg.net/institutional/BR/pt/solutions/solar",
      "logo": "https://www.devsolar.com.br/_next/static/media/weg.2nv-q87pwy7xf.webp",
      "description": "Tecnologia e eficiência em inversores, módulos e kits solares."
    },
    {
      "@type": "Organization",
      "@id": "https://www.devsolar.com.br/#fornecedor-canadian",
      "name": "Canadian Solar",
      "url": "https://www.canadiansolar.com/",
      "logo": "https://www.devsolar.com.br/_next/static/media/canadian.19yoxll4yvpeu.webp",
      "description": "Módulos fotovoltaicos de alta qualidade e performance global."
    },
    {
      "@type": "Organization",
      "@id": "https://www.devsolar.com.br/#financeira-santander",
      "name": "Santander",
      "url": "https://www.santander.com.br/",
      "logo": "https://www.devsolar.com.br/_next/static/media/santander.2diwnmym52g1j.webp"
    },
    {
      "@type": "LoanOrCredit",
      "@id": "https://www.devsolar.com.br/#financiamento-santander",
      "name": "Financiamento Solar Santander",
      "description": "Linhas de crédito especiais para projetos de energia solar. Até 100% financiado.",
      "provider": { "@id": "https://www.devsolar.com.br/#financeira-santander" },
      "loanType": "Financiamento de Energia Solar",
      "areaServed": "BR"
    },
    {
      "@type": "Organization",
      "@id": "https://www.devsolar.com.br/#financeira-bv",
      "name": "BV Financeira",
      "url": "https://www.bv.com.br/",
      "logo": "https://www.devsolar.com.br/_next/static/media/bv.0k43wuwomwec9.webp"
    },
    {
      "@type": "LoanOrCredit",
      "@id": "https://www.devsolar.com.br/#financiamento-bv",
      "name": "Financiamento Solar BV",
      "description": "Facilidade e agilidade no financiamento do sistema solar, com até 120 dias de carência para a 1ª parcela.",
      "provider": { "@id": "https://www.devsolar.com.br/#financeira-bv" },
      "loanType": "Financiamento de Energia Solar",
      "areaServed": "BR"
    },
    {
      "@type": "Organization",
      "@id": "https://www.devsolar.com.br/#financeira-solagora",
      "name": "Sol Agora (Creditas)",
      "url": "https://www.solagora.com.br/",
      "logo": "https://www.devsolar.com.br/_next/static/media/solagora.298hn4vma5og5.webp"
    },
    {
      "@type": "LoanOrCredit",
      "@id": "https://www.devsolar.com.br/#financiamento-solagora",
      "name": "Financiamento Solar Sol Agora (Creditas)",
      "description": "Financiamento solar rápido, com aprovação 100% digital e sem burocracia.",
      "provider": { "@id": "https://www.devsolar.com.br/#financeira-solagora" },
      "loanType": "Financiamento de Energia Solar",
      "areaServed": "BR"
    },
    {
      "@type": "Product",
      "@id": "https://www.devsolar.com.br/#kit-residencial",
      "name": "Kit Gerador de Energia Solar Residencial",
      "description": "Kit completo de energia solar fotovoltaica on-grid para residências, incluindo módulos solares, inversor e estrutura de fixação.",
      "category": "Kits de Energia Solar",
      "image": "https://www.devsolar.com.br/assets/photovoltaic-1920.webp",
      "brand": {
        "@type": "Brand",
        "name": "DEV Solar"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "BRL",
        "price": "0.00",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "url": "https://www.devsolar.com.br/#kit-residencial"
      },
      "manufacturer": [
        { "@id": "https://www.devsolar.com.br/#fornecedor-intelbras" },
        { "@id": "https://www.devsolar.com.br/#fornecedor-weg" },
        { "@id": "https://www.devsolar.com.br/#fornecedor-canadian" }
      ],
      "review": [
        {
          "@type": "Review",
          "name": "Case de Sucesso: Casa da Fernanda",
          "reviewBody": "Com atendimento proativo e esclarecedor, todas as dúvidas foram respondidas prontamente. A flexibilidade na negociação levou a um valor ideal e viabilizou a instalação do sistema de energia solar, que trouxe benefícios para a casa e para toda a família.",
          "author": { "@type": "Person", "name": "Cliente Casa da Fernanda" },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "name": "Case de Sucesso: Casa do Osmar",
          "reviewBody": "Desde a negociação, a equipe demonstrou confiança e compromisso com o que faz. A entrega final ocorreu com qualidade e com integração correta ao serviço público de energia elétrica.",
          "author": { "@type": "Person", "name": "Cliente Casa do Osmar" },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "2"
      }
    },
    {
      "@type": "Product",
      "@id": "https://www.devsolar.com.br/#kit-comercial",
      "name": "Kit Gerador de Energia Solar Comercial / Condominial",
      "description": "Sistema fotovoltaico de alta potência para empresas, indústrias e condomínios.",
      "category": "Kits de Energia Solar",
      "image": "https://www.devsolar.com.br/assets/photovoltaic-1920.webp",
      "brand": {
        "@type": "Brand",
        "name": "DEV Solar"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "BRL",
        "price": "0.00",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "url": "https://www.devsolar.com.br/#kit-comercial"
      },
      "manufacturer": [
        { "@id": "https://www.devsolar.com.br/#fornecedor-intelbras" },
        { "@id": "https://www.devsolar.com.br/#fornecedor-weg" },
        { "@id": "https://www.devsolar.com.br/#fornecedor-canadian" }
      ],
      "review": [
        {
          "@type": "Review",
          "name": "Case de Sucesso: Condomínio Lilases",
          "reviewBody": "Investir em energia solar com a DEV Solar foi a decisão financeira mais inteligente que tomamos recentemente. Convertemos um gasto de mais de R$ 6.000,00/mês num financiamento de R$ 4.500,00 durante 3 anos e depois disso a geração própria de energia beneficiará ainda mais o condomínio.",
          "author": { "@type": "Person", "name": "Cliente Condomínio Lilases" },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "1"
      }
    },
    {
      "@type": "Service",
      "@id": "https://www.devsolar.com.br/#servico-projeto",
      "name": "Projeto e Homologação Fotovoltaica",
      "serviceType": "Solar Energy Engineering",
      "description": "Desenvolvimento do projeto de engenharia elétrica e gestão do processo de homologação junto à distribuidora de energia.",
      "provider": { "@id": "https://www.devsolar.com.br/#organization" }
    },
    {
      "@type": "Service",
      "@id": "https://www.devsolar.com.br/#servico-instalacao",
      "name": "Instalação de Sistemas Fotovoltaicos",
      "serviceType": "Solar Panel Installation",
      "description": "Montagem de estrutura, fixação de painéis solares, cabeamento e conexão de inversores por equipe qualificada.",
      "provider": { "@id": "https://www.devsolar.com.br/#organization" }
    },
    {
      "@type": "Service",
      "@id": "https://www.devsolar.com.br/#servico-manutencao",
      "name": "Manutenção e Limpeza Técnica Solar",
      "serviceType": "Solar Panel Maintenance",
      "description": "Serviço periódico de limpeza técnica de módulos solares e revisão das conexões elétricas do sistema.",
      "provider": { "@id": "https://www.devsolar.com.br/#organization" }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.devsolar.com.br/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quanto tempo leva para instalar um sistema solar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A instalação física é rápida, levando de 2 a 3 dias para residências e de 1 a 3 semanas para grandes projetos comerciais."
          }
        },
        {
          "@type": "Question",
          "name": "Os painéis funcionam em dias nublados?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Os painéis solares dependem da luminosidade e radiação, não do calor."
          }
        }
      ]
    }
  ]
} as const;
