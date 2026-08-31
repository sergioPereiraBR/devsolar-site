// page.js
import HomePageClient from './page-client';

// Metadados ESPECÍFICOS para esta página (sobrescrevem ou complementam o layout.js)
export const metadata = {
  title: 'Empresa de Energia Solar no Rio de Janeiro | DEV Solar',
  description:
    // 'Reduza até 85% da sua Conta de Luz no RJ com Energia Solar para casas, condomínios e empresas. Peça orçamento gratuito!', // Descrição específica
    //'Proteja sua casa, condomínio ou empresa no Rio de Janeiro contra aumentos tarifários. Reduza até 85% na conta de luz. Simule sua economia agora!', // Descrição específica
    'A DEV Solar é sua empresa de energia solar no Rio de Janeiro. Reduza até 85% na conta de luz. Solicite sua simulação gratuita!',
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
    title: 'Empresa de Energia Solar no Rio de Janeiro | DEV Solar',
    description:
      //'Reduza até 85% da sua Conta de Luz no RJ com Energia Solar para casas, condomínios e empresas. Peça orçamento gratuito!', // Descrição OG específica
      'A DEV Solar é sua empresa de energia solar no Rio de Janeiro. Reduza até 85% na conta de luz. Solicite sua simulação gratuita!',
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
    title: 'Empresa de Energia Solar no Rio de Janeiro | DEV Solar',
    description:
      //'Reduza até 85% da sua Conta de Luz no RJ com Energia Solar para casas, condomínios e empresas. Peça orçamento gratuito.',
      'A DEV Solar é sua empresa de energia solar no Rio de Janeiro. Reduza até 85% na conta de luz. Solicite sua simulação gratuita!',
    images: [
      'https://www.devsolar.com.br/images/og-image-devsolar-1200x630.png',
    ],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
