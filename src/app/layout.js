import '@fortawesome/fontawesome-free/css/all.min.css';
import { Inter } from 'next/font/google'; // Exemplo de fonte
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const isEnabled = true;

// --- Metadados Base ---
// Estes serão aplicados a todas as páginas, mas podem ser sobrescritos
// ou estendidos por metadados em arquivos `page.js`.
export const metadata = {
    // Modelo de Título: %s será substituído pelo título da página específica
    title: {
        template: '%s | DEV Solar',
        default: 'DEV Solar - Energia Solar para Todos', // Título padrão (ex: homepage)
    },
    description: 'Transforme o Sol em Economia Real com a DEV Solar. Sistemas fotovoltaicos para residências, condomínios e empresas com até 95% de redução na conta de luz.', // Descrição padrão/base
    metadataBase: new URL('https://www.devsolar.com.br'), // URL Base para metadados relativos
    alternates: {
        canonical: './', // Canonical padrão (será sobrescrito nas páginas)
    },
    other: {
        appId: '706537912532593', // Use a string numérica que você copiou
    },
    openGraph: {
        title: 'Calcule Agora Sua Economia: O Sol Paga Sua Conta! | DEV Solar', // Título OG padrão
        description: 'Veja em segundos o potencial de economia na sua conta de luz com nosso simulador solar rápido, fácil e gratuito. Clique e descubra!', // Descrição OG padrão
        url: './', // URL OG padrão (será sobrescrita)
        siteName: 'DEV Solar',
        'article:publisher': 'https://www.facebook.com/profile.php?id=61562778810789',
        images: [ // Imagem OG padrão (pode ser sobrescrita)
            {
                url: './images/og-image-calculator-cta.png', // Caminho relativo à pasta PUBLIC (URL absoluta será gerada) og-image-devsolar.png
                width: 1200,
                height: 630,
                alt: 'Simulador de Economia de Energia com a DEV Solar',
            },
        ],
        locale: 'pt_BR',
        type: 'website',
        'og:determiner': 'a', // Opcional
        'og:action': 'Calcule sua Economia', // Define uma ação customizada (namespace:action)
        'og:action:url': 'https://www.devsolar.com.br/', // URL da ação
    },
    twitter: { // Twitter Card padrão (pode ser sobrescrito)
        card: 'summary_large_image',
        title: 'Calcule Agora Sua Economia: O Sol Paga Sua Conta! | DEV Solar',
        description: 'Simulador rápido, fácil e gratuito: veja quanto você pode economizar com painéis solares. Clique e descubra!',
        // siteId: 'YourTwitterSiteID', // Opcional
        // creator: '@devsolar', // Seu handle do Twitter
        // creatorId: 'YourTwitterCreatorID', // Opcional
        images: ['./images/og-image-calculator-cta.png'], // Caminho relativo à pasta PUBLIC twitter-image-devsolar.png
    },
    robots: { // Configuração padrão de robôs
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    // --- Outros Metadados Globais ---
    charset: 'UTF-8', // Definido automaticamente pelo Next.js, mas pode ser explícito
    manifest: './manifest.json', // Caminho para o manifest (na pasta public)
    icons: { // Convenção Next.js para favicons e ícones
        icon: './images/favicon.ico', // Ou /icon.png
        shortcut: './images/favicon.png', // Favicon legado (opcional)
        apple: './images/apple-touch-icon.png', // Ícone Apple
        // outros: { ... }
    },
    // msApplication: { // Para Windows Tiles
    //   tileColor: '#7F7F7F',
    // },
    // formatDetection: { // Desabilitar auto-formatação
    //   telephone: false,
    //   email: false,
    //   address: false,
    // },
    // verification: { // Para verificar propriedade em search consoles
    //   google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    //   yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
    //   other: { me: ['my-email@example.com', 'my-link.com'] },
    // },
    // appleWebApp: { // Para PWAs no iOS
    //   title: 'DEV Solar',
    //   statusBarStyle: 'default',
    //   startupImage: [ /* ... */ ],
    // },
    // alternates: { // Para hreflang se tiver múltiplos idiomas
    //   languages: { 'en-US': '/en-US', 'pt-BR': '/pt-BR' },
    // },
    // appLinks: { // Para deep linking mobile
    //   ios: { url: '...', app_store_id: '...' },
    //   android: { package: '...', app_name: '...' },
    //   web: { url: '...', should_fallback: true },
    // },
};

// --- Exportação Dedicada para Viewport e ThemeColor ---
export const viewport = {
    width: 'device-width',
    initialScale: 1,
    shrinkToFit: 'no', // 'shrink-to-fit=no' é geralmente o padrão e pode não ser necessário explicitamente
    themeColor: [ // Pode definir cores para light e dark mode
        { media: '(prefers-color-scheme: light)', color: '#ffffff' }, // Ex: Branco para light
        { media: '(prefers-color-scheme: dark)', color: '#001f52' }   // Ex: Azul escuro para dark (seu footer-color)
        // Ou apenas uma cor se não precisar de distinção:
        // themeColor: '#001f52',
    ],
    colorScheme: 'light dark', // Opcional: Indica que o site suporta ambos
};
// --------------------------------------------------------


export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <head>
                <meta name="keywords" content="energia solar rio de janeiro, energia solar rj, energia solar vila valqueire, painel solar rj, placa solar rio de janeiro, economia de energia rj, instalador solar rj, dev solar, dev solar eficiencia energetica, energia solar residencial rj, energia solar comercial rj, financiamento energia solar rj, reduzir conta de luz rj"></meta>
                <meta name="description" content="DEV Solar - Especialistas em soluções de energia solar no Rio de Janeiro. Instalação, manutenção e financiamento de sistemas fotovoltaicos."></meta>
                <meta name="publisher" content="DEV Eficiência Energética Ltda."></meta>
                {/* Tags que DEVEM estar no <head> e não são cobertas pela Metadata API */}
                {/* Ex: Fontes externas carregadas diretamente, scripts inline críticos (raro) */}
                <link rel="alternate" hreflang="pt-br" href="https://www.devsolar.com.br/" />
                <link rel="alternate" hreflang="x-default" href="https://www.devsolar.com.br/" />
                <meta name="facebook-domain-verification" content="nk6hini7dghzylggt85l67u1es1xwv" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
                {/* FontAwesome (se usar CDN) */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-..." crossOrigin="anonymous" referrerPolicy="no-referrer" />
            </head>
            <body className={inter.className} cz-shortcut-listen={isEnabled.toString()}>
                {children}
                {/* Exemplo de Script de Terceiros (ex: Google Analytics) */}
                {/* Usar next/script é crucial */}
                {/* <Script
                    async src={`https://www.googletagmanager.com/gtag/js?id=G-T8P0CVS70V`}
                    strategy="afterInteractive" // Carrega após a página ficar interativa
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-T8P0CVS70V');
                    `}
                </Script>
                <script>
                    {`
                        (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({
                            'gtm.start': new Date().getTime(),event:'gtm.js'
                        });
                            var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','G-T8P0CVS70V');
                    `}
                </script> */}
                {/* Script do reCAPTCHA (se usar no formulário) */}
                {/* <Script src="https://www.google.com/recaptcha/api.js" strategy="lazyOnload" async defer></Script> */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(
                            [
                                {
                                    "@context": "https://schema.org",
                                    "@type": "LocalBusiness",
                                    "name": "DEV Solar",
                                    "image": "https://www.devsolar.com.br/caminho-para-o-logo.jpg",
                                    "@id": "https://www.devsolar.com.br",
                                    "url": "https://www.devsolar.com.br",
                                    "telephone": "+55-21-99967-7722",
                                    "priceRange": "$$$",
                                    "address": {
                                        "@type": "PostalAddress",
                                        "streetAddress": "Av. Jambeiro, 474 Loja C",
                                        "addressLocality": "Vila Valqueire",
                                        "addressRegion": "RJ",
                                        "postalCode": "21330-300",
                                        "addressCountry": "BR"
                                    },
                                    "geo": {
                                        "@type": "GeoCoordinates",
                                        "latitude": -22.8893,
                                        "longitude": -43.3712
                                    }
                                },
                                {
                                    "@context": "https://schema.org",
                                    "@type": "FAQPage",
                                    "mainEntity": [
                                        {
                                            "@type": "Question",
                                            "name": "Quanto tempo leva para instalar um sistema solar?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "A instalação física é rápida, levando de 2 a 3 dias para residências e de 1 a 3 semanas para grandes projetos comerciais, industriais ou condomínios. No entanto, o processo completo inclui a homologação da concessionária para conectar o sistema à rede elétrica pública, etapa que leva de 1 a 4 semanas."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "Os painéis funcionam em dias nublados?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Sim! Os painéis solares dependem da luminosidade e radiação, não do calor, por isso continuam gerando energia mesmo com o céu encoberto. Em dias totalmente nublados, a produção se mantém ativa, operando entre 10% e 25% da sua capacidade máxima em comparação a um dia de céu limpo."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "Preciso de baterias para armazenar energia?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Preciso de baterias para armazenar energia?', answer: 'Não necessariamente. A maioria dos sistemas utiliza o modelo On-Grid, que funciona conectado à rede pública. Durante o dia, os painéis geram energia para consumo imediato e o excedente é enviado para a distribuidora, transformando-se em créditos. À noite ou em dias chuvosos, você consome a energia da rede e abate desses créditos acumulados. O uso de baterias é restrito aos modelos Off-Grid ou Híbridos, indicados apenas para situações específicas. São elas: locais isolados sem acesso à rede, proteção contra apagões, armazenamento estratégico para horários de tarifa alta e atendimento a sistemas críticos."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "Qual a vida útil dos painéis solares?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Os painéis solares modernos têm vida útil superior a 25 anos. Os fabricantes garantem que eles manterão pelo menos 80% a 85% da sua capacidade de geração original ao final desse período. Na prática, muitos módulos continuam gerando energia por 30 ou 40 anos, operando apenas com uma eficiência ligeiramente reduzida."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "Como funciona o financiamento dos sistemas?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "O processo é estruturado para que a própria economia gerada pague o investimento. O objetivo principal é que o valor da parcela seja igual ou menor do que a redução obtida na sua conta de luz. Para isso, oferecemos opções de financiamento de até 100% do projeto, cobrindo tanto os equipamentos (painéis e inversor) quanto a mão de obra de instalação."
                                            }
                                        }
                                    ]
                                },
                                {
                                    "@context": "https://schema.org",
                                    "@type": "Organization",
                                    "name": "DEV Eficiência Energética Ltda.",
                                    "alternateName": "DEV Solar",
                                    "url": "https://www.devsolar.com.br",
                                    "logo": "https://www.devsolar.com.br/caminho-para-o-logo.jpg",
                                    "leiCode": "53.538.425/0001-15"
                                }
                            ],
                            null,
                            2
                        )
                    }}
                />
                <script src="https://www.google.com/recaptcha/enterprise.js?render=6LeshiwrAAAAAPVbR8FTS_4l-80ea1G_UyBhZuFk" />
            </body>
        </html>
    );
}