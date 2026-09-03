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
      "description": "A DEV Solar é sua empresa de energia solar fotovoltaica no Rio de Janeiro. Projeto, homologação, instalação e manutenção de sistemas solares residenciais, comerciais e condominiais, com até 85% de redução na conta de luz.",
      "foundingDate": "2024-01-17",
      "url": "https://www.devsolar.com.br/",
      "openingHours": "Mo-Fr 09:00-18:00",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      "email": "comercial@devsolar.com.br",
      "logo": "https://www.devsolar.com.br/_next/static/media/logo-dev-branco.0hhcwps62p05p.webp",
      "image": [
        "https://www.devsolar.com.br/images/og-image-devsolar-1200x630.png",
        "https://www.devsolar.com.br/assets/photovoltaic-1920.webp"
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
        "https://www.instagram.com/devsolar",
        "https://www.facebook.com/devsolar",
        "https://www.linkedin.com/company/devsolar"
      ],
      "hasMap": "https://www.google.com/maps?q=Av.+Jambeiro,+474+-+Lj+C,+-+Vila+Valqueire,+Rio+de+Janeiro+-+RJ",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Jambeiro, 474 - Lj C - Vila Valqueire",
        "addressLocality": "Rio de Janeiro",
        "addressRegion": "RJ",
        "postalCode": "21330-300",
        "addressCountry": "BR"
      },
      "potentialAction": {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://calendar.app.google/xLxeDtFzjCYUUqhB7",
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
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -22.881603,
        "longitude": -43.371210
      },
      "areaServed": [
        { "@type": "City", "name": "Rio de Janeiro" },
        { "@type": "City", "name": "Niterói" },
        { "@type": "City", "name": "São Gonçalo" },
        { "@type": "City", "name": "Duque de Caxias" },
        { "@type": "AdministrativeArea", "name": "Baixada Fluminense" },
        { "@type": "AdministrativeArea", "name": "Região dos Lagos" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Catálogo de Serviços e Kits Solares",
        "itemListElement": [
          {
            "@type": "Offer",
            "url": "https://www.devsolar.com.br/#servicos",
            "priceCurrency": "BRL",
            "price": "0.00",
            "priceValidUntil": "2026-12-31",
            "availability": "https://schema.org/InStock",
            "itemOffered": { "@id": "https://www.devsolar.com.br/#servico-projeto" }
          },
          {
            "@type": "Offer",
            "url": "https://www.devsolar.com.br/#servicos",
            "priceCurrency": "BRL",
            "price": "0.00",
            "priceValidUntil": "2026-12-31",
            "availability": "https://schema.org/InStock",
            "itemOffered": { "@id": "https://www.devsolar.com.br/#servico-instalacao" }
          },
          {
            "@type": "Offer",
            "url": "https://www.devsolar.com.br/#servicos",
            "priceCurrency": "BRL",
            "price": "0.00",
            "priceValidUntil": "2026-12-31",
            "availability": "https://schema.org/InStock",
            "itemOffered": { "@id": "https://www.devsolar.com.br/#servico-manutencao" }
          }
        ]
      },
      "makesOffer": [
        {
          "@type": "Offer",
          "url": "https://www.devsolar.com.br/#financiamento-santander",
          "priceCurrency": "BRL",
          "price": "0.00",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "itemOffered": { "@id": "https://www.devsolar.com.br/#financiamento-santander" }
        },
        {
          "@type": "Offer",
          "url": "https://www.devsolar.com.br/#financiamento-bv",
          "priceCurrency": "BRL",
          "price": "0.00",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "itemOffered": { "@id": "https://www.devsolar.com.br/#financiamento-bv" }
        },
        {
          "@type": "Offer",
          "url": "https://www.devsolar.com.br/#financiamento-solagora",
          "priceCurrency": "BRL",
          "price": "0.00",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "itemOffered": { "@id": "https://www.devsolar.com.br/#financiamento-solagora" }
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://www.devsolar.com.br/#fornecedor-intelbras",
      "name": "Intelbras Solar",
      "url": "https://www.intelbras.com/pt-br/energia-solar",
      "sameAs": ["https://www.intelbras.com/pt-br/"],
      "logo": "https://www.devsolar.com.br/_next/static/media/intelbras.2-ze0yczdah13.webp",
      "description": "Soluções completas em equipamentos para energia solar fotovoltaica.",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": "+55-48-2106-0006",
        "url": "https://www.intelbras.com/pt-br/contato"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://www.devsolar.com.br/#fornecedor-weg",
      "name": "WEG Solar",
      "url": "https://www.weg.net/institutional/BR/pt/solutions/solar",
      "sameAs": ["https://www.weg.net/"],
      "logo": "https://www.devsolar.com.br/_next/static/media/weg.2nv-q87pwy7xf.webp",
      "description": "Tecnologia e eficiência em inversores, módulos e kits solares.",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": "+55-47-3276-4000",
        "url": "https://www.weg.net/institutional/BR/pt/contact"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://www.devsolar.com.br/#fornecedor-canadian",
      "name": "Canadian Solar",
      "url": "https://www.canadiansolar.com/",
      "sameAs": ["https://www.canadiansolar.com/"],
      "logo": "https://www.devsolar.com.br/_next/static/media/canadian.19yoxll4yvpeu.webp",
      "description": "Módulos fotovoltaicos de alta qualidade e performance global.",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "url": "https://www.canadiansolar.com/contact-us/"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://www.devsolar.com.br/#financeira-santander",
      "name": "Santander",
      "url": "https://www.santander.com.br/",
      "sameAs": ["https://www.santander.com.br/"],
      "logo": "https://www.devsolar.com.br/_next/static/media/santander.2diwnmym52g1j.webp",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": "+55-4004-3535",
        "url": "https://www.santander.com.br/atendimento"
      }
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
      "sameAs": ["https://www.bv.com.br/"],
      "logo": "https://www.devsolar.com.br/_next/static/media/bv.0k43wuwomwec9.webp",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": "+55-3003-1616",
        "url": "https://www.bv.com.br/atendimento"
      }
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
      "sameAs": ["https://www.solagora.com.br/"],
      "logo": "https://www.devsolar.com.br/_next/static/media/solagora.298hn4vma5og5.webp",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "url": "https://www.solagora.com.br/"
      }
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
      "sku": "KIT-SOLAR-RES-01",
      "description": "Kit completo de energia solar fotovoltaica on-grid para residências, incluindo módulos solares, inversor e estrutura de fixação.",
      "category": "Kits de Energia Solar",
      "image": "https://www.devsolar.com.br/assets/photovoltaic-1920.webp",
      "brand": {
        "@type": "Brand",
        "name": "DEV Solar"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "BRL",
        "lowPrice": "5000.00",
        "highPrice": "50000.00",
        "offerCount": "10",
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
          "itemReviewed": { "@id": "https://www.devsolar.com.br/#kit-residencial" },
          "author": { 
            "@type": "Person", 
            "name": "Fernanda",
            "jobTitle": "Cliente Residencial",
            "image": "https://www.devsolar.com.br/images/avatar-default.webp",
            "sameAs": "https://www.devsolar.com.br/#cases-de-sucesso",
            "url": "https://www.devsolar.com.br/#cases-de-sucesso"
          },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "name": "Case de Sucesso: Casa do Osmar",
          "reviewBody": "Desde a negociação, a equipe demonstrou confiança e compromisso com o que faz. A entrega final ocorreu com qualidade e com integração correta ao serviço público de energia elétrica.",
          "itemReviewed": { "@id": "https://www.devsolar.com.br/#kit-residencial" },
          "author": { 
            "@type": "Person", 
            "name": "Osmar",
            "jobTitle": "Cliente Residencial",
            "image": "https://www.devsolar.com.br/images/avatar-default.webp",
            "sameAs": "https://www.devsolar.com.br/#cases-de-sucesso",
            "url": "https://www.devsolar.com.br/#cases-de-sucesso"
          },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "2",
        "ratingCount": "2"
      }
    },
    {
      "@type": "Product",
      "@id": "https://www.devsolar.com.br/#kit-comercial",
      "name": "Kit Gerador de Energia Solar Comercial / Condominial",
      "sku": "KIT-SOLAR-COM-01",
      "description": "Sistema fotovoltaico de alta potência para empresas, indústrias e condomínios.",
      "category": "Kits de Energia Solar",
      "image": "https://www.devsolar.com.br/assets/photovoltaic-1920.webp",
      "brand": {
        "@type": "Brand",
        "name": "DEV Solar"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "BRL",
        "lowPrice": "15000.00",
        "highPrice": "150000.00",
        "offerCount": "8",
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
          "itemReviewed": { "@id": "https://www.devsolar.com.br/#kit-comercial" },
          "author": { 
            "@type": "Person", 
            "name": "Síndico Condomínio Lilases",
            "jobTitle": "Cliente Condominial",
            "image": "https://www.devsolar.com.br/images/avatar-default.webp",
            "sameAs": "https://www.devsolar.com.br/#cases-de-sucesso",
            "url": "https://www.devsolar.com.br/#cases-de-sucesso"
          },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "1",
        "ratingCount": "1"
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
          "answerCount": 1,
          "upvoteCount": 0,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A instalação física é rápida, levando de 2 a 3 dias para residências e de 1 a 3 semanas para grandes projetos comerciais.",
            "url": "https://www.devsolar.com.br/#faq",
            "upvoteCount": 0
          }
        },
        {
          "@type": "Question",
          "name": "Os painéis funcionam em dias nublados?",
          "answerCount": 1,
          "upvoteCount": 0,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Os painéis solares dependem da luminosidade e radiação, não do calor.",
            "url": "https://www.devsolar.com.br/#faq",
            "upvoteCount": 0
          }
        }
      ]
    }
  ]
} as const;

// src/data/devSolarSchema.ts

// export const devSolarSchema = {
//   "@context": "https://schema.org",
//   "@graph": [
//     {
//       "@type": "LocalBusiness",
//       "@id": "https://www.devsolar.com.br/#organization",
//       "name": "DEV Solar",
//       "legalName": "DEV Eficiência Energética Ltda.",
//       "alternateName": "DEV Solar",
//       "slogan": "O futuro é solar",
//       "description": "Empresa de energia solar fotovoltaica no Rio de Janeiro. Projeto, homologação, instalação e manutenção de sistemas solares residenciais, comerciais e condominiais, com até 85% de redução na conta de luz.",
//       "foundingDate": "2024-01-17",
//       "url": "https://www.devsolar.com.br/",
//       "openingHours": "Mo-Fr 09:00-18:00",
//       "openingHoursSpecification": {
//         "@type": "OpeningHoursSpecification",
//         "dayOfWeek": [
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday"
//         ],
//         "opens": "09:00",
//         "closes": "18:00"
//       },
//       "email": "comercial@devsolar.com.br",
//       "logo": "https://www.devsolar.com.br/_next/static/media/logo-dev-branco.0hhcwps62p05p.webp",
//       "image": [
//         "https://www.devsolar.com.br/images/og-image-devsolar-1200x630.png",
//         "https://www.devsolar.com.br/assets/photovoltaic-1920.webp"
//       ],
//       "telephone": "+55-21-99967-7722",
//       "priceRange": "$$$",
//       "taxID": "53.538.425/0001-15",
//       "contactPoint": [
//         {
//           "@type": "ContactPoint",
//           "telephone": "+55-21-99967-7722",
//           "email": "comercial@devsolar.com.br",
//           "contactType": "sales",
//           "areaServed": "BR",
//           "availableLanguage": "Portuguese",
//           "hoursAvailable": {
//             "@type": "OpeningHoursSpecification",
//             "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
//             "opens": "09:00",
//             "closes": "18:00"
//           }
//         },
//         {
//           "@type": "ContactPoint",
//           "telephone": "+55-21-99967-7722",
//           "contactType": "customer service",
//           "areaServed": "BR",
//           "availableLanguage": "Portuguese"
//         }
//       ],
//       "sameAs": [
//         "https://www.facebook.com/profile.php?id=61562778810789",
//         "https://www.instagram.com/devsolar_",
//         "https://www.linkedin.com/company/dev-solar-efici%C3%AAncia-energ%C3%A9tica"
//       ],
//       "hasMap": "https://www.google.com/maps?q=Av.+Jambeiro,+474+-+Lj+C,+-+Vila+Valqueire,+Rio+de+Janeiro+-+RJ",
//       "address": {
//         "@type": "PostalAddress",
//         "streetAddress": "Av. Jambeiro, 474 - Lj C - Vila Valqueire",
//         "addressLocality": "Rio de Janeiro",
//         "addressRegion": "RJ",
//         "postalCode": "21330-300",
//         "addressCountry": "BR"
//       },
//       "potentialAction": {
//         "@type": "ReserveAction",
//         "target": {
//           "@type": "EntryPoint",
//           "urlTemplate": "https://calendar.app.google/xLxeDtFzjCYUUqhB7",
//           "actionPlatform": [
//             "http://schema.org/DesktopWebPlatform",
//             "http://schema.org/MobileWebPlatform"
//           ]
//         },
//         "result": {
//           "@type": "Reservation",
//           "name": "Agendamento de Consultoria em Energia Solar"
//         }
//       },
//       "geo": {
//         "@type": "GeoCoordinates",
//         "latitude": -22.881603,
//         "longitude": -43.371210
//       },
//       "areaServed": [
//         { "@type": "City", "name": "Rio de Janeiro" },
//         { "@type": "City", "name": "Niterói" },
//         { "@type": "City", "name": "São Gonçalo" },
//         { "@type": "City", "name": "Duque de Caxias" },
//         { "@type": "AdministrativeArea", "name": "Baixada Fluminense" },
//         { "@type": "AdministrativeArea", "name": "Região dos Lagos" }
//       ],
//       "hasOfferCatalog": {
//         "@type": "OfferCatalog",
//         "name": "Catálogo de Serviços e Kits Solares",
//         "itemListElement": [
//           {
//             "@type": "Offer",
//             "url": "https://www.devsolar.com.br/#servicos",
//             "priceCurrency": "BRL",
//             "price": "0.00",
//             "priceValidUntil": "2026-12-31",
//             "availability": "https://schema.org/InStock",
//             "itemOffered": { "@id": "https://www.devsolar.com.br/#servico-projeto" }
//           },
//           {
//             "@type": "Offer",
//             "url": "https://www.devsolar.com.br/#servicos",
//             "priceCurrency": "BRL",
//             "price": "0.00",
//             "priceValidUntil": "2026-12-31",
//             "availability": "https://schema.org/InStock",
//             "itemOffered": { "@id": "https://www.devsolar.com.br/#servico-instalacao" }
//           },
//           {
//             "@type": "Offer",
//             "url": "https://www.devsolar.com.br/#servicos",
//             "priceCurrency": "BRL",
//             "price": "0.00",
//             "priceValidUntil": "2026-12-31",
//             "availability": "https://schema.org/InStock",
//             "itemOffered": { "@id": "https://www.devsolar.com.br/#servico-manutencao" }
//           }
//         ]
//       },
//       "makesOffer": [
//         {
//           "@type": "Offer",
//           "url": "https://www.devsolar.com.br/#parceiros",
//           "priceCurrency": "BRL",
//           "price": "0.00",
//           "priceValidUntil": "2026-12-31",
//           "availability": "https://schema.org/InStock",
//           "itemOffered": { "@id": "https://www.devsolar.com.br/#financiamento-santander" }
//         },
//         {
//           "@type": "Offer",
//           "url": "https://www.devsolar.com.br/#parceiros",
//           "priceCurrency": "BRL",
//           "price": "0.00",
//           "priceValidUntil": "2026-12-31",
//           "availability": "https://schema.org/InStock",
//           "itemOffered": { "@id": "https://www.devsolar.com.br/#financiamento-bv" }
//         },
//         {
//           "@type": "Offer",
//           "url": "https://www.devsolar.com.br/#parceiros",
//           "priceCurrency": "BRL",
//           "price": "0.00",
//           "priceValidUntil": "2026-12-31",
//           "availability": "https://schema.org/InStock",
//           "itemOffered": { "@id": "https://www.devsolar.com.br/#financiamento-solagora" }
//         }
//       ]
//     },
//     {
//       "@type": "Organization",
//       "@id": "https://www.devsolar.com.br/#fornecedor-intelbras",
//       "name": "Intelbras Solar",
//       "url": "https://www.intelbras.com/pt-br/energia-solar",
//       "sameAs": ["https://www.intelbras.com/pt-br/"],
//       "logo": "https://www.devsolar.com.br/_next/static/media/intelbras.2-ze0yczdah13.webp",
//       "description": "Soluções completas em equipamentos para energia solar fotovoltaica."
//     },
//     {
//       "@type": "Organization",
//       "@id": "https://www.devsolar.com.br/#fornecedor-weg",
//       "name": "WEG Solar",
//       "url": "https://www.weg.net/institutional/BR/pt/solutions/solar",
//       "sameAs": ["https://www.weg.net/"],
//       "logo": "https://www.devsolar.com.br/_next/static/media/weg.2nv-q87pwy7xf.webp",
//       "description": "Tecnologia e eficiência em inversores, módulos e kits solares."
//     },
//     {
//       "@type": "Organization",
//       "@id": "https://www.devsolar.com.br/#fornecedor-canadian",
//       "name": "Canadian Solar",
//       "url": "https://www.canadiansolar.com/",
//       "sameAs": ["https://www.canadiansolar.com/"],
//       "logo": "https://www.devsolar.com.br/_next/static/media/canadian.19yoxll4yvpeu.webp",
//       "description": "Módulos fotovoltaicos de alta qualidade e performance global."
//     },
//     {
//       "@type": "Organization",
//       "@id": "https://www.devsolar.com.br/#financeira-santander",
//       "name": "Santander",
//       "url": "https://www.santander.com.br/",
//       "sameAs": ["https://www.santander.com.br/"],
//       "logo": "https://www.devsolar.com.br/_next/static/media/santander.2diwnmym52g1j.webp"
//     },
//     {
//       "@type": "LoanOrCredit",
//       "@id": "https://www.devsolar.com.br/#financiamento-santander",
//       "name": "Financiamento Solar Santander",
//       "description": "Linhas de crédito especiais para projetos de energia solar. Até 100% financiado.",
//       "provider": { "@id": "https://www.devsolar.com.br/#financeira-santander" },
//       "loanType": "Financiamento de Energia Solar",
//       "areaServed": "BR"
//     },
//     {
//       "@type": "Organization",
//       "@id": "https://www.devsolar.com.br/#financeira-bv",
//       "name": "BV Financeira",
//       "url": "https://www.bv.com.br/",
//       "sameAs": ["https://www.bv.com.br/"],
//       "logo": "https://www.devsolar.com.br/_next/static/media/bv.0k43wuwomwec9.webp"
//     },
//     {
//       "@type": "LoanOrCredit",
//       "@id": "https://www.devsolar.com.br/#financiamento-bv",
//       "name": "Financiamento Solar BV",
//       "description": "Facilidade e agilidade no financiamento do sistema solar, com até 120 dias de carência para a 1ª parcela.",
//       "provider": { "@id": "https://www.devsolar.com.br/#financeira-bv" },
//       "loanType": "Financiamento de Energia Solar",
//       "areaServed": "BR"
//     },
//     {
//       "@type": "Organization",
//       "@id": "https://www.devsolar.com.br/#financeira-solagora",
//       "name": "Sol Agora (Creditas)",
//       "url": "https://www.solagora.com.br/",
//       "sameAs": ["https://www.solagora.com.br/"],
//       "logo": "https://www.devsolar.com.br/_next/static/media/solagora.298hn4vma5og5.webp"
//     },
//     {
//       "@type": "LoanOrCredit",
//       "@id": "https://www.devsolar.com.br/#financiamento-solagora",
//       "name": "Financiamento Solar Sol Agora (Creditas)",
//       "description": "Financiamento solar rápido, com aprovação 100% digital e sem burocracia.",
//       "provider": { "@id": "https://www.devsolar.com.br/#financeira-solagora" },
//       "loanType": "Financiamento de Energia Solar",
//       "areaServed": "BR"
//     },
//     {
//       "@type": "Product",
//       "@id": "https://www.devsolar.com.br/#kit-residencial",
//       "name": "Kit Gerador de Energia Solar Residencial",
//       "sku": "KIT-SOLAR-RES-01",
//       "description": "Kit completo de energia solar fotovoltaica on-grid para residências, incluindo módulos solares, inversor e estrutura de fixação.",
//       "category": "Kits de Energia Solar",
//       "image": "https://www.devsolar.com.br/assets/photovoltaic-1920.webp",
//       "brand": {
//         "@type": "Brand",
//         "name": "DEV Solar"
//       },
//       "offers": {
//         "@type": "AggregateOffer",
//         "priceCurrency": "BRL",
//         "lowPrice": "5000.00",
//         "highPrice": "50000.00",
//         "offerCount": "10",
//         "url": "https://www.devsolar.com.br/#contato"
//       },
//       "manufacturer": [
//         { "@id": "https://www.devsolar.com.br/#fornecedor-intelbras" },
//         { "@id": "https://www.devsolar.com.br/#fornecedor-weg" },
//         { "@id": "https://www.devsolar.com.br/#fornecedor-canadian" }
//       ],
//       "review": [
//         {
//           "@type": "Review",
//           "name": "Case de Sucesso: Casa da Fernanda",
//           "reviewBody": "Com atendimento proativo e esclarecedor, todas as dúvidas foram respondidas prontamente. A flexibilidade na negociação levou a um valor ideal e viabilizou a instalação do sistema de energia solar, que trouxe benefícios para a casa e para toda a família.",
//           "itemReviewed": { "@id": "https://www.devsolar.com.br/#kit-residencial" },
//           "author": { 
//             "@type": "Person", 
//             "name": "Fernanda",
//             "jobTitle": "Cliente Residencial",
//             "url": "https://www.devsolar.com.br/#cases-de-sucesso"
//           },
//           "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
//         },
//         {
//           "@type": "Review",
//           "name": "Case de Sucesso: Casa do Osmar",
//           "reviewBody": "Desde a negociação, a equipe demonstrou confiança e compromisso com o que faz. A entrega final ocorreu com qualidade e com integração correta ao serviço público de energia elétrica.",
//           "itemReviewed": { "@id": "https://www.devsolar.com.br/#kit-residencial" },
//           "author": { 
//             "@type": "Person", 
//             "name": "Osmar",
//             "jobTitle": "Cliente Residencial",
//             "url": "https://www.devsolar.com.br/#cases-de-sucesso"
//           },
//           "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
//         }
//       ],
//       "aggregateRating": {
//         "@type": "AggregateRating",
//         "ratingValue": "5.0",
//         "reviewCount": "2",
//         "ratingCount": "2"
//       }
//     },
//     {
//       "@type": "Product",
//       "@id": "https://www.devsolar.com.br/#kit-comercial",
//       "name": "Kit Gerador de Energia Solar Comercial / Condominial",
//       "sku": "KIT-SOLAR-COM-01",
//       "description": "Sistema fotovoltaico de alta potência para empresas, indústrias e condomínios.",
//       "category": "Kits de Energia Solar",
//       "image": "https://www.devsolar.com.br/assets/photovoltaic-1920.webp",
//       "brand": {
//         "@type": "Brand",
//         "name": "DEV Solar"
//       },
//       "offers": {
//         "@type": "AggregateOffer",
//         "priceCurrency": "BRL",
//         "lowPrice": "15000.00",
//         "highPrice": "150000.00",
//         "offerCount": "8",
//         "url": "https://www.devsolar.com.br/#contato"
//       },
//       "manufacturer": [
//         { "@id": "https://www.devsolar.com.br/#fornecedor-intelbras" },
//         { "@id": "https://www.devsolar.com.br/#fornecedor-weg" },
//         { "@id": "https://www.devsolar.com.br/#fornecedor-canadian" }
//       ],
//       "review": [
//         {
//           "@type": "Review",
//           "name": "Case de Sucesso: Condomínio Lilases",
//           "reviewBody": "Investir em energia solar com a DEV Solar foi a decisão financeira mais inteligente que tomamos recentemente. Convertemos um gasto de mais de R$ 6.000,00/mês num financiamento de R$ 4.500,00 durante 3 anos e depois disso a geração própria de energia beneficiará ainda mais o condomínio.",
//           "itemReviewed": { "@id": "https://www.devsolar.com.br/#kit-comercial" },
//           "author": { 
//             "@type": "Person", 
//             "name": "Síndico Condomínio Lilases",
//             "jobTitle": "Cliente Condominial",
//             "url": "https://www.devsolar.com.br/#cases-de-sucesso"
//           },
//           "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
//         }
//       ],
//       "aggregateRating": {
//         "@type": "AggregateRating",
//         "ratingValue": "5.0",
//         "reviewCount": "1",
//         "ratingCount": "1"
//       }
//     },
//     {
//       "@type": "Service",
//       "@id": "https://www.devsolar.com.br/#servico-projeto",
//       "name": "Projeto e Homologação Fotovoltaica",
//       "serviceType": "Solar Energy Engineering",
//       "description": "Desenvolvimento do projeto de engenharia elétrica e gestão do processo de homologação junto à distribuidora de energia.",
//       "provider": { "@id": "https://www.devsolar.com.br/#organization" }
//     },
//     {
//       "@type": "Service",
//       "@id": "https://www.devsolar.com.br/#servico-instalacao",
//       "name": "Instalação de Sistemas Fotovoltaicos",
//       "serviceType": "Solar Panel Installation",
//       "description": "Montagem de estrutura, fixação de painéis solares, cabeamento e conexão de inversores por equipe qualificada.",
//       "provider": { "@id": "https://www.devsolar.com.br/#organization" }
//     },
//     {
//       "@type": "Service",
//       "@id": "https://www.devsolar.com.br/#servico-manutencao",
//       "name": "Manutenção e Limpeza Técnica Solar",
//       "serviceType": "Solar Panel Maintenance",
//       "description": "Serviço periódico de limpeza técnica de módulos solares e revisão das conexões elétricas do sistema.",
//       "provider": { "@id": "https://www.devsolar.com.br/#organization" }
//     },
//     {
//       "@type": "FAQPage",
//       "@id": "https://www.devsolar.com.br/#faq",
//       "mainEntity": [
//         {
//           "@type": "Question",
//           "name": "Quanto tempo leva para instalar um sistema solar?",
//           "answerCount": 1,
//           "upvoteCount": 0,
//           "acceptedAnswer": {
//             "@type": "Answer",
//             "text": "A instalação física é rápida, levando de 2 a 3 dias para residências e de 1 a 3 semanas para grandes projetos comerciais.",
//             "url": "https://www.devsolar.com.br/#faq",
//             "upvoteCount": 0
//           }
//         },
//         {
//           "@type": "Question",
//           "name": "Os painéis funcionam em dias nublados?",
//           "answerCount": 1,
//           "upvoteCount": 0,
//           "acceptedAnswer": {
//             "@type": "Answer",
//             "text": "Sim! Os painéis solares dependem da luminosidade e radiação, não do calor.",
//             "url": "https://www.devsolar.com.br/#faq",
//             "upvoteCount": 0
//           }
//         }
//       ]
//     }
//   ]
// } as const;
// // src/data/devSolarSchema.ts

// export const devSolarSchema = {
//   "@context": "https://schema.org",
//   "@graph": [
//     {
//       "@type": "LocalBusiness",
//       "@id": "https://www.devsolar.com.br/#organization",
//       "name": "DEV Solar",
//       "legalName": "DEV Eficiência Energética Ltda.",
//       "alternateName": "DEV Solar",
//       "slogan": "O futuro é solar",
//       "description": "Empresa de energia solar fotovoltaica no Rio de Janeiro. Projeto, homologação, instalação e manutenção de sistemas solares residenciais, comerciais e condominiais, com até 85% de redução na conta de luz.",
//       "foundingDate": "2024-01-17",
//       "url": "https://www.devsolar.com.br/",
//       "openingHoursSpecification": {
//         "@type": "OpeningHoursSpecification",
//         "dayOfWeek": [
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday"
//         ],
//         "opens": "09:00",
//         "closes": "18:00"
//       },
//       "email": "comercial@devsolar.com.br",
//       "logo": "https://www.devsolar.com.br/_next/static/media/logo-dev-branco.0hhcwps62p05p.webp",
//       "image": [
//         "https://www.devsolar.com.br/images/og-image-devsolar-1200x630.png",
//         "https://www.devsolar.com.br/assets/photovoltaic-1920.webp"
//       ],
//       "telephone": "+55-21-99967-7722",
//       "priceRange": "$$$",
//       "taxID": "53.538.425/0001-15",
//       "contactPoint": [
//         {
//           "@type": "ContactPoint",
//           "telephone": "+55-21-99967-7722",
//           "email": "comercial@devsolar.com.br",
//           "contactType": "sales",
//           "areaServed": "BR",
//           "availableLanguage": "Portuguese",
//           "hoursAvailable": {
//             "@type": "OpeningHoursSpecification",
//             "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
//             "opens": "09:00",
//             "closes": "18:00"
//           }
//         },
//         {
//           "@type": "ContactPoint",
//           "telephone": "+55-21-99967-7722",
//           "contactType": "customer service",
//           "areaServed": "BR",
//           "availableLanguage": "Portuguese"
//         }
//       ],
//       "sameAs": [
//         "https://www.facebook.com/profile.php?id=61562778810789",
//         "https://www.instagram.com/devsolar_",
//         "https://www.linkedin.com/company/dev-solar-efici%C3%AAncia-energ%C3%A9tica"
//       ],
//       "hasMap": "https://www.google.com/maps?q=Av.+Jambeiro,+474+-+Lj+C,+-+Vila+Valqueire,+Rio+de+Janeiro+-+RJ",
//       "address": {
//         "@type": "PostalAddress",
//         "streetAddress": "Av. Jambeiro, 474 - Lj C - Vila Valqueire",
//         "addressLocality": "Rio de Janeiro",
//         "addressRegion": "RJ",
//         "postalCode": "21330-300",
//         "addressCountry": "BR"
//       },
//       "potentialAction": {
//         "@type": "ReserveAction",
//         "target": {
//           "@type": "EntryPoint",
//           "urlTemplate": "https://calendar.app.google/xLxeDtFzjCYUUqhB7",
//           "actionPlatform": [
//             "http://schema.org/DesktopWebPlatform",
//             "http://schema.org/MobileWebPlatform"
//           ]
//         },
//         "result": {
//           "@type": "Reservation",
//           "name": "Agendamento de Consultoria em Energia Solar"
//         }
//       },
//       "geo": {
//         "@type": "GeoCoordinates",
//         "latitude": -22.881603,
//         "longitude": -43.371210
//       },
//       "areaServed": [
//         { "@type": "City", "name": "Rio de Janeiro" },
//         { "@type": "City", "name": "Niterói" },
//         { "@type": "City", "name": "São Gonçalo" },
//         { "@type": "City", "name": "Duque de Caxias" },
//         { "@type": "AdministrativeArea", "name": "Baixada Fluminense" },
//         { "@type": "AdministrativeArea", "name": "Região dos Lagos" }
//       ],
//       "hasOfferCatalog": {
//         "@type": "OfferCatalog",
//         "name": "Catálogo de Serviços e Kits Solares",
//         "itemListElement": [
//           {
//             "@type": "Offer",
//             "itemOffered": { "@id": "https://www.devsolar.com.br/#servico-projeto" }
//           },
//           {
//             "@type": "Offer",
//             "itemOffered": { "@id": "https://www.devsolar.com.br/#servico-instalacao" }
//           },
//           {
//             "@type": "Offer",
//             "itemOffered": { "@id": "https://www.devsolar.com.br/#servico-manutencao" }
//           }
//         ]
//       },
//       "makesOffer": [
//         {
//           "@type": "Offer",
//           "itemOffered": { "@id": "https://www.devsolar.com.br/#financiamento-santander" }
//         },
//         {
//           "@type": "Offer",
//           "itemOffered": { "@id": "https://www.devsolar.com.br/#financiamento-bv" }
//         },
//         {
//           "@type": "Offer",
//           "itemOffered": { "@id": "https://www.devsolar.com.br/#financiamento-solagora" }
//         }
//       ]
//     },
//     {
//       "@type": "Organization",
//       "@id": "https://www.devsolar.com.br/#fornecedor-intelbras",
//       "name": "Intelbras Solar",
//       "url": "https://www.intelbras.com/pt-br/energia-solar",
//       "logo": "https://www.devsolar.com.br/_next/static/media/intelbras.2-ze0yczdah13.webp",
//       "description": "Soluções completas em equipamentos para energia solar fotovoltaica.",
//     },
//     {
//       "@type": "Organization",
//       "@id": "https://www.devsolar.com.br/#fornecedor-weg",
//       "name": "WEG Solar",
//       "url": "https://www.weg.net/institutional/BR/pt/solutions/solar",
//       "logo": "https://www.devsolar.com.br/_next/static/media/weg.2nv-q87pwy7xf.webp",
//       "description": "Tecnologia e eficiência em inversores, módulos e kits solares.",
//     },
//     {
//       "@type": "Organization",
//       "@id": "https://www.devsolar.com.br/#fornecedor-canadian",
//       "name": "Canadian Solar",
//       "url": "https://www.canadiansolar.com/",
//       "logo": "https://www.devsolar.com.br/_next/static/media/canadian.19yoxll4yvpeu.webp",
//       "description": "Módulos fotovoltaicos de alta qualidade e performance global."
//     },
//     {
//       "@type": "Organization",
//       "@id": "https://www.devsolar.com.br/#financeira-santander",
//       "name": "Santander",
//       "url": "https://www.santander.com.br/",
//       "logo": "https://www.devsolar.com.br/_next/static/media/santander.2diwnmym52g1j.webp"
//     },
//     {
//       "@type": "LoanOrCredit",
//       "@id": "https://www.devsolar.com.br/#financiamento-santander",
//       "name": "Financiamento Solar Santander",
//       "description": "Linhas de crédito especiais para projetos de energia solar. Até 100% financiado.",
//       "provider": { "@id": "https://www.devsolar.com.br/#financeira-santander" },
//       "loanType": "Financiamento de Energia Solar",
//       "areaServed": "BR"
//     },
//     {
//       "@type": "Organization",
//       "@id": "https://www.devsolar.com.br/#financeira-bv",
//       "name": "BV Financeira",
//       "url": "https://www.bv.com.br/",
//       "logo": "https://www.devsolar.com.br/_next/static/media/bv.0k43wuwomwec9.webp"
//     },
//     {
//       "@type": "LoanOrCredit",
//       "@id": "https://www.devsolar.com.br/#financiamento-bv",
//       "name": "Financiamento Solar BV",
//       "description": "Facilidade e agilidade no financiamento do sistema solar, com até 120 dias de carência para a 1ª parcela.",
//       "provider": { "@id": "https://www.devsolar.com.br/#financeira-bv" },
//       "loanType": "Financiamento de Energia Solar",
//       "areaServed": "BR"
//     },
//     {
//       "@type": "Organization",
//       "@id": "https://www.devsolar.com.br/#financeira-solagora",
//       "name": "Sol Agora (Creditas)",
//       "url": "https://www.solagora.com.br/",
//       "logo": "https://www.devsolar.com.br/_next/static/media/solagora.298hn4vma5og5.webp"
//     },
//     {
//       "@type": "LoanOrCredit",
//       "@id": "https://www.devsolar.com.br/#financiamento-solagora",
//       "name": "Financiamento Solar Sol Agora (Creditas)",
//       "description": "Financiamento solar rápido, com aprovação 100% digital e sem burocracia.",
//       "provider": { "@id": "https://www.devsolar.com.br/#financeira-solagora" },
//       "loanType": "Financiamento de Energia Solar",
//       "areaServed": "BR"
//     },
//     {
//       "@type": "Product",
//       "@id": "https://www.devsolar.com.br/#kit-residencial",
//       "name": "Kit Gerador de Energia Solar Residencial",
//       "description": "Kit completo de energia solar fotovoltaica on-grid para residências, incluindo módulos solares, inversor e estrutura de fixação.",
//       "category": "Kits de Energia Solar",
//       "image": "https://www.devsolar.com.br/assets/photovoltaic-1920.webp",
//       "brand": {
//         "@type": "Brand",
//         "name": "DEV Solar"
//       },
//       "offers": {
//         "@type": "AggregateOffer",
//         "priceCurrency": "BRL",
//         "lowPrice": "5000.00",
//         "highPrice": "50000.00",
//         "offerCount": "10"
//       },
//       "manufacturer": [
//         { "@id": "https://www.devsolar.com.br/#fornecedor-intelbras" },
//         { "@id": "https://www.devsolar.com.br/#fornecedor-weg" },
//         { "@id": "https://www.devsolar.com.br/#fornecedor-canadian" }
//       ],
//       "review": [
//         {
//           "@type": "Review",
//           "name": "Case de Sucesso: Casa da Fernanda",
//           "reviewBody": "Com atendimento proativo e esclarecedor, todas as dúvidas foram respondidas prontamente. A flexibilidade na negociação levou a um valor ideal e viabilizou a instalação do sistema de energia solar, que trouxe benefícios para a casa e para toda a família.",
//           "author": { "@type": "Person", "name": "Cliente Casa da Fernanda" },
//           "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
//         },
//         {
//           "@type": "Review",
//           "name": "Case de Sucesso: Casa do Osmar",
//           "reviewBody": "Desde a negociação, a equipe demonstrou confiança e compromisso com o que faz. A entrega final ocorreu com qualidade e com integração correta ao serviço público de energia elétrica.",
//           "author": { "@type": "Person", "name": "Cliente Casa do Osmar" },
//           "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
//         }
//       ],
//       "aggregateRating": {
//         "@type": "AggregateRating",
//         "ratingValue": "5.0",
//         "reviewCount": "2"
//       }
//     },
//     {
//       "@type": "Product",
//       "@id": "https://www.devsolar.com.br/#kit-comercial",
//       "name": "Kit Gerador de Energia Solar Comercial / Condominial",
//       "description": "Sistema fotovoltaico de alta potência para empresas, indústrias e condomínios.",
//       "category": "Kits de Energia Solar",
//       "image": "https://www.devsolar.com.br/assets/photovoltaic-1920.webp",
//       "brand": {
//         "@type": "Brand",
//         "name": "DEV Solar"
//       },
//       "offers": {
//         "@type": "AggregateOffer",
//         "priceCurrency": "BRL",
//         "lowPrice": "15000.00",
//         "highPrice": "150000.00",
//         "offerCount": "8"
//       },
//       "manufacturer": [
//         { "@id": "https://www.devsolar.com.br/#fornecedor-intelbras" },
//         { "@id": "https://www.devsolar.com.br/#fornecedor-weg" },
//         { "@id": "https://www.devsolar.com.br/#fornecedor-canadian" }
//       ],
//       "review": [
//         {
//           "@type": "Review",
//           "name": "Case de Sucesso: Condomínio Lilases",
//           "reviewBody": "Investir em energia solar com a DEV Solar foi a decisão financeira mais inteligente que tomamos recentemente. Convertemos um gasto de mais de R$ 6.000,00/mês num financiamento de R$ 4.500,00 durante 3 anos e depois disso a geração própria de energia beneficiará ainda mais o condomínio.",
//           "author": { "@type": "Person", "name": "Cliente Condomínio Lilases" },
//           "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
//         }
//       ],
//       "aggregateRating": {
//         "@type": "AggregateRating",
//         "ratingValue": "5.0",
//         "reviewCount": "1"
//       }
//     },
//     {
//       "@type": "Service",
//       "@id": "https://www.devsolar.com.br/#servico-projeto",
//       "name": "Projeto e Homologação Fotovoltaica",
//       "serviceType": "Solar Energy Engineering",
//       "description": "Desenvolvimento do projeto de engenharia elétrica e gestão do processo de homologação junto à distribuidora de energia.",
//       "provider": { "@id": "https://www.devsolar.com.br/#organization" }
//     },
//     {
//       "@type": "Service",
//       "@id": "https://www.devsolar.com.br/#servico-instalacao",
//       "name": "Instalação de Sistemas Fotovoltaicos",
//       "serviceType": "Solar Panel Installation",
//       "description": "Montagem de estrutura, fixação de painéis solares, cabeamento e conexão de inversores por equipe qualificada.",
//       "provider": { "@id": "https://www.devsolar.com.br/#organization" }
//     },
//     {
//       "@type": "Service",
//       "@id": "https://www.devsolar.com.br/#servico-manutencao",
//       "name": "Manutenção e Limpeza Técnica Solar",
//       "serviceType": "Solar Panel Maintenance",
//       "description": "Serviço periódico de limpeza técnica de módulos solares e revisão das conexões elétricas do sistema.",
//       "provider": { "@id": "https://www.devsolar.com.br/#organization" }
//     },
//     {
//       "@type": "FAQPage",
//       "@id": "https://www.devsolar.com.br/#faq",
//       "mainEntity": [
//         {
//           "@type": "Question",
//           "name": "Quanto tempo leva para instalar um sistema solar?",
//           "acceptedAnswer": {
//             "@type": "Answer",
//             "text": "A instalação física é rápida, levando de 2 a 3 dias para residências e de 1 a 3 semanas para grandes projetos comerciais."
//           }
//         },
//         {
//           "@type": "Question",
//           "name": "Os painéis funcionam em dias nublados?",
//           "acceptedAnswer": {
//             "@type": "Answer",
//             "text": "Sim! Os painéis solares dependem da luminosidade e radiação, não do calor."
//           }
//         }
//       ]
//     }
//   ]
// } as const;

      // "openingHoursSpecification": [
      //   {
      //     "@type": "OpeningHoursSpecification",
      //     "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      //     "opens": "09:00",
      //     "closes": "18:00"
      //   }
      // ],


      // "offers": {
      //   "@type": "AggregateOffer",
      //   "priceCurrency": "BRL",
      //   "lowPrice": "5000.00",
      //   "highPrice": "50000.00",
      //   "offerCount": "10"
      // }


      // ---------------------
      // 2. Ajuste nos 6 objetos Offer (Serviços, Financiamentos e Kits)
      // Apontamentos: price, priceCurrency, availability, url e priceValidUntil ausentes.

      // Causa: O Google valida todos os objetos do tipo Offer declarados no site. No seu schema, as ofertas dentro de hasOfferCatalog e makesOffer estão sem detalhes de preço/disponibilidade.

      // Solução: Como projetos solares utilizam orçamentos personalizados e financiamentos, inclua as propriedades recomendadas em cada Offer:

      // {
      //   "@type": "Offer",
      //   "url": "https://www.devsolar.com.br/#contato",
      //   "priceCurrency": "BRL",
      //   "price": "0.00",
      //   "priceValidUntil": "2026-12-31",
      //   "availability": "https://schema.org/InStock",
      //   "itemOffered": { "@id": "https://www.devsolar.com.br/#servico-projeto" }
      // }
      // ---------------------
      // 3. Ajuste nas 6 entidades Organization (Fornecedores e Financeiras)
      // Apontamentos: sameAs e contactPoint ausentes.

      // Solução: Adicione a propriedade sameAs apontando para a Wikipédia ou redes oficiais das marcas parceiras (Intelbras, WEG, Canadian, Santander, BV, Sol Agora):

      // {
      //   "@type": "Organization",
      //   "@id": "https://www.devsolar.com.br/#fornecedor-intelbras",
      //   "name": "Intelbras Solar",
      //   "url": "https://www.intelbras.com/pt-br/energia-solar",
      //   "sameAs": "https://pt.wikipedia.org/wiki/Intelbras",
      //   "logo": "https://www.devsolar.com.br/_next/static/media/intelbras.2-ze0yczdah13.webp"
      // }


      // 4. Ajuste nas entidades Product
      // Apontamento: sku ausente nos 2 kits.

      // Solução: Adicione um identificador único de SKU para o Kit Residencial e Comercial:

      // "sku": "KIT-SOLAR-RES-01"

      // 5. Ajuste nas entidades Review e Person
      // Apontamentos: itemReviewed no Review; jobTitle, url, image e sameAs nas autoras dos depoimentos.

      // Solução: Associe explicitamente o @id do produto dentro de cada avaliação em itemReviewed e preencha os dados do autor:

      // JSON
      // "review": [
      //   {
      //     "@type": "Review",
      //     "name": "Case de Sucesso: Casa da Fernanda",
      //     "reviewBody": "Com atendimento proativo e esclarecedor...",
      //     "itemReviewed": { "@id": "https://www.devsolar.com.br/#kit-residencial" },
      //     "author": { 
      //       "@type": "Person", 
      //       "name": "Fernanda",
      //       "jobTitle": "Cliente Residencial"
      //     },
      //     "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
      //   }
      // ]
      // 6. Ajuste em AggregateRating
      // Apontamento: ratingCount ausente.

      // Solução: Adicione o total de avaliações além do reviewCount:

      // JSON
      // "aggregateRating": {
      //   "@type": "AggregateRating",
      //   "ratingValue": "5.0",
      //   "reviewCount": "2",
      //   "ratingCount": "2"
      // }
      // 7. Ajuste em FAQPage (Question e Answer)
      // Apontamentos: answerCount, upvoteCount e url ausentes.

      // Solução: Enriqueça cada pergunta/resposta com contadores padrão:

      // JSON
      // {
      //   "@type": "Question",
      //   "name": "Quanto tempo leva para instalar um sistema solar?",
      //   "answerCount": 1,
      //   "upvoteCount": 0,
      //   "acceptedAnswer": {
      //     "@type": "Answer",
      //     "text": "A instalação física é rápida...",
      //     "url": "https://www.devsolar.com.br/#faq",
      //     "upvoteCount": 0
      //   }
      // }