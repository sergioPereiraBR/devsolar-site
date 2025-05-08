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
        'og:action': 'Calcule sua Economia', // Define uma ação customizada (namespace:action)
        'og:action:url': 'https://www.devsolar.com.br/#', // URL da ação
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
    charset: 'utf-8', // Definido automaticamente pelo Next.js, mas pode ser explícito
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
                {/* Tags que DEVEM estar no <head> e não são cobertas pela Metadata API */}
                {/* Ex: Fontes externas carregadas diretamente, scripts inline críticos (raro) */}
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
                <script src="https://www.google.com/recaptcha/enterprise.js?render=6LeshiwrAAAAAPVbR8FTS_4l-80ea1G_UyBhZuFk" />
            </body>
        </html>
    );
}