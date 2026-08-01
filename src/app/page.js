import HomePageClient from './page-client';

// Metadados ESPECÍFICOS para esta página (sobrescrevem ou complementam o layout.js)
export const metadata = {
  title: 'DEV Solar - Energia Solar Fotovoltaica no Rio de Janeiro', // Sobrescreve o título padrão
  description:
    'Economize até 85% na conta de luz com energia solar no RJ para casas, condomínios e empresas. Peça orçamento gratuito!', // Descrição específica
  alternates: {
    canonical: 'https://www.devsolar.com.br/', // Canonical para a homepage
    languages: {
      'pt-BR': 'https://www.devsolar.com.br/',
      'x-default': 'https://www.devsolar.com.br/',
    },
  },
  facebook: {
    appId: '706537912532593',
  },
  openGraph: {
    title: 'DEV Solar - Energia Solar Fotovoltaica no Rio de Janeiro', // Título OG específico
    description:
      'Economize até 85% na conta de luz com energia solar no RJ para casas, condomínios e empresas. Peça orçamento gratuito!', // Descrição OG específica
    url: 'https://www.devsolar.com.br/', // URL OG específica
    siteName: 'DEV Solar',
    images: [
      // Pode usar uma imagem OG específica para a home
      {
        url: 'https://www.devsolar.com.br/images/og-image-devsolar-1200x630.png', // Caminho absoluto da imagem OG
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'A DEV Solar atua nas modalidades de produção de energia própria, compartilhada e para negócios',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    // Pode sobrescrever twitter tags também se necessário
    title: 'DEV Solar - Energia Solar Fotovoltaica no Rio de Janeiro',
    description:
      'Economize até 85% na conta de luz com energia solar no RJ para casas, condomínios e empresas. Peça orçamento gratuito.',
    images: [
      'https://www.devsolar.com.br/images/og-image-devsolar-1200x630.png',
    ],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
