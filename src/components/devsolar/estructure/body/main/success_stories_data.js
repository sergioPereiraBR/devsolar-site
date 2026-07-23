import CasaFernanda from '@/assets/casa_fernanda.webp';
import CasaOsmar from '@/assets/casa_osmar.webp';
import CondLilases from '@/assets/cond_lilases.webp';

export const successStories = [
  {
    id: 1,
    title: 'Condomínio Lilases',
    thumbnail: CondLilases,
    preview: './videos/depcon01.mp4',
    type: 'Condominial',
    impact: 'Economia imediata',
    resume:
      'Investimento inteligente com a Dev Solar! Gasto de R$ 6.000 virou economia, pagando o financiamento e permitindo outras melhorias.',
    description:
      'Investir em energia solar com a DEV Solar foi a decisão financeira mais inteligente que tomamos recentemente. Convertemos um gasto de mais de R$ 6.000,00/mês num financiamento de R$ 4.500,00 durante 3 anos e depois disso a geração própria de energia beneficiará ainda mais o condomínio. O sistema de energia solar já se tornou um investimento que se paga com a própria economia gerada, e ainda conseguimos direcionar recursos para outras melhorias.',
  },
  {
    id: 2,
    title: 'Casa da Fernanda',
    thumbnail: CasaFernanda,
    preview: './videos/depcon02.mp4',
    type: 'Residencial',
    impact: 'Bom atendimento e valor ideal',
    resume:
      'Agora produzimos nossa própria energia e reduzimos custos com a conta de luz. Fomos bem atendidos e estamos satisfeitos com o serviço.',
    description:
      'Com atendimento proativo e esclarecedor, todas as dúvidas foram respondidas prontamente. A flexibilidade na negociação levou a um valor ideal e viabilizou a instalação do sistema de energia solar, que trouxe benefícios para a casa e para toda a família.',
  },
  {
    id: 3,
    title: 'Casa do Osmar',
    thumbnail: CasaOsmar,
    preview: './videos/depcon03.mp4',
    type: 'Residencial',
    impact: 'Confiança e excelente qualidade',
    resume:
      'A instalação do nosso sistema solar foi feita com profissionais de excelente qualidade, até a entrega com a ligação na rede pública de energia.',
    description:
      'Desde a negociação, a equipe demonstrou confiança e compromisso com o que faz. A entrega final ocorreu com qualidade e com integração correta ao serviço público de energia elétrica.',
  },
  {
    id: 4,
    title: 'Condomínio Lilases',
    thumbnail: CondLilases,
    preview: './videos/depcon01.mp4',
    type: 'Condominial',
    impact: 'Economia imediata',
    resume:
      'Investimento inteligente com a Dev Solar! Gasto de R$ 6.000 virou economia, pagando o financiamento e permitindo outras melhorias.',
    description:
      'Investir em energia solar com a DEV Solar foi a decisão financeira mais inteligente que tomamos recentemente. Convertemos um gasto de mais de R$ 6.000,00/mês num financiamento de R$ 4.500,00 durante 3 anos e depois disso a geração própria de energia beneficiará ainda mais o condomínio. O sistema de energia solar já se tornou um investimento que se paga com a própria economia gerada, e ainda conseguimos direcionar recursos para outras melhorias.',
  },
  {
    id: 5,
    title: 'Casa da Fernanda',
    thumbnail: CasaFernanda,
    preview: './videos/depcon02.mp4',
    type: 'Residencial',
    impact: 'Bom atendimento e valor ideal',
    resume:
      'Agora produzimos nossa própria energia e reduzimos custos com a conta de luz. Fomos bem atendidos e estamos satisfeitos com o serviço.',
    description:
      'Com atendimento proativo e esclarecedor, todas as dúvidas foram respondidas prontamente. A flexibilidade na negociação levou a um valor ideal e viabilizou a instalação do sistema de energia solar, que trouxe benefícios para a casa e para toda a família.',
  },
  {
    id: 6,
    title: 'Casa do Osmar',
    thumbnail: CasaOsmar,
    preview: './videos/depcon03.mp4',
    type: 'Residencial',
    impact: 'Confiança e excelente qualidade',
    resume:
      'A instalação do nosso sistema solar foi feita com profissionais de excelente qualidade, até a entrega com a ligação na rede pública de energia.',
    description:
      'Desde a negociação, a equipe demonstrou confiança e compromisso com o que faz. A entrega final ocorreu com qualidade e com integração correta ao serviço público de energia elétrica.',
  },
];

export const seoStories = successStories.filter((story) => story.id <= 3);
