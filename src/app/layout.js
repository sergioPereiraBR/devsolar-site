// layout.js
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { config } from '@fortawesome/fontawesome-svg-core';

import './critical.css';
import './globals.css';

import { devSolarSchema } from '@/data/devSolarSchema';

// Evita injeção assíncrona de CSS do Font Awesome e reduz CLS dos ícones.
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const isEnabled = true;
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID; // Substitua pelo seu ID do GA4
const hasGaTrackingId = Boolean(GA_TRACKING_ID);

// --- Metadados Base ---
// Estes serão aplicados a todas as páginas, mas podem ser sobrescritos
// ou estendidos por metadados em arquivos `page.js`.
export const metadata = {
  // Modelo de Título: %s será substituído pelo título da página específica
  title: {
    template: '%s | DEV Solar',
    default: 'DEV Solar - Energia Solar Fotovoltaica no Rio de Janeiro', // Título padrão (ex: homepage)
  },
  description:
    'Reduza até 85% da sua Conta de Luz no Rio de Janeiro com o Sol. Proteja sua casa, condomínio ou empresa dos aumentos tarifários e valorize seu imóvel com investimento inteligente.', // Descrição padrão/base
  metadataBase: new URL('https://www.devsolar.com.br'), // URL Base para metadados relativos
  alternates: {
    canonical: 'https://www.devsolar.com.br/', // Canonical padrão (será sobrescrito nas páginas)
  },
  keywords: [
    'energia solar rio de janeiro',
    'energia solar rj',
    'energia solar vila valqueire',
    'painel solar rj',
    'placa solar rio de janeiro',
    'economia de energia rj',
    'instalador solar rj',
    'dev solar',
    'dev solar eficiencia energetica',
    'energia solar residencial rj',
    'energia solar comercial rj',
    'financiamento energia solar rj',
    'reduzir conta de luz rj',
  ],
  authors: [{ name: 'DEV Solar Eficiência Energética Ltda.' }],
  other: {
    publisher: 'DEV Solar Eficiência Energética Ltda.',
    copyright: '© 2026 Dev Solar - Todos os direitos reservados.',
  },
  facebook: {
    appId: '706537912532593',
  },
  openGraph: {
    title: 'DEV Solar - Energia Solar Fotovoltaica no Rio de Janeiro', // Título OG padrão
    description:
      'Reduza a conta de luz da sua casa, empresa ou condomínio em até 95% com a DEV Solar.', // Descrição OG padrão
    url: 'https://www.devsolar.com.br/', // URL OG padrão (será sobrescrita)
    siteName: 'DEV Solar',
    images: [
      // Imagem OG padrão (pode ser sobrescrita)
      {
        url: 'https://www.devsolar.com.br/images/og-image-devsolar-1200x630.png', // Caminho da imagem OG
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'DEV Solar - Energia Solar Fotovoltaica',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    // Twitter Card padrão (pode ser sobrescrito)
    card: 'summary_large_image',
    title: 'DEV Solar - Energia Solar Fotovoltaica no Rio de Janeiro',
    description:
      'Reduza a conta de luz da sua casa, empresa ou condomínio em até 95% com a DEV Solar.',
    // siteId: 'YourTwitterSiteID', // Opcional
    // creator: '@devsolar', // Seu handle do Twitter
    // creatorId: 'YourTwitterCreatorID', // Opcional
    images: [
      'https://www.devsolar.com.br/images/og-image-devsolar-1200x630.png',
    ], // Caminho da imagem Twitter
  },
  robots: {
    // Configuração padrão de robôs
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
  icons: {
    // Convenção Next.js para favicons e ícones
    icon: '/images/favicon.ico', // Ou /icon.png
    shortcut: '/images/favicon.png', // Favicon legado (opcional)
    apple: '/images/apple-touch-icon.png', // Ícone Apple
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
  themeColor: [
    // Pode definir cores para light e dark mode
    { media: '(prefers-color-scheme: light)', color: '#ffffff' }, // Ex: Branco para light
    { media: '(prefers-color-scheme: dark)', color: '#001f52' }, // Ex: Azul escuro para dark (seu footer-color)
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
        {/* <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" /> */}
        {/* DNS Prefetch para recursos críticos */}
        {/* <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" /> */}
        <link
          rel="preload"
          as="image"
          href="/assets/photovoltaic-1920.webp"
          imageSrcSet="/assets/photovoltaic-400.webp 400w, /assets/photovoltaic-800.webp 800w, /assets/photovoltaic-1200.webp 1200w, /assets/photovoltaic-1920.webp 1920w"
          imageSizes="(max-width: 480px) 400px, (max-width: 991px) 800px, (max-width: 1599px) 1200px, 1920px"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/vendor/bootstrap/bootstrap.min.css"
          as="style"
        />
        <link rel="preload" href="/vendor/fontawesome/styles.css" as="style" />
        <link rel="stylesheet" href="/vendor/bootstrap/bootstrap.min.css" />
        <link rel="stylesheet" href="/vendor/fontawesome/styles.css" />

        {/* <link
          rel="stylesheet"
          href="/vendor/bootstrap/bootstrap.min.css"
          media="print"
          onLoad={(e) => {
            e.currentTarget.media = 'all';
          }}
        />
        <link
          rel="stylesheet"
          href="/vendor/fontawesome/styles.css"
          media="print"
          onLoad={(e) => {
            e.currentTarget.media = 'all';
          }}
        /> */}

        {/* <Script id="async-css-loader" strategy="afterInteractive">
          {`
            (function() {
              var bs = document.getElementById('bootstrap-css');
              var fa = document.getElementById('fontawesome-css');
              if (bs) bs.media = 'all';
              if (fa) fa.media = 'all';
            })();
          `}
        </Script> */}

        {/* <AsyncStyles /> */}

        {/* Injeção do CSS de forma totalmente assíncrona após a renderização inicial */}
        <Script id="load-external-css" strategy="afterInteractive">
          {`
            [
              '/vendor/bootstrap/bootstrap.min.css',
              '/vendor/fontawesome/styles.css'
            ].forEach(function(src) {
              var l = document.createElement('link');
              l.rel = 'stylesheet';
              l.href = src;
              document.head.appendChild(l);
            });
          `}
        </Script>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --theme: rgba(0, 77, 205, 1) 0%;
                --primary: #ff9e00;
                --secondary: #2ecc71;
                --footer-color: #001f52;
                --light: #F8F9FA;
                --branco: #FFFFFF;
                --text-btn: #001f52;
                --text-calc: #001f52;
                --body-bg: #F8F9FA;
                --scroll-padding: 90px;
              }
              html { scroll-behavior: smooth; scroll-padding-top: var(--scroll-padding, 90px); }
              body { margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 1rem; color: rgb(55, 65, 81); background-color: #fff; overflow-x: hidden; }
              a.skip-link { position: absolute; top: 0; left: 0; transform: translateY(-120%); background: #001f52; color: #fff; padding: .75rem 1rem; z-index: 100000; border-radius: 0 0 0 .5rem; text-decoration: none; font-weight: 600; transition: transform .2s ease; }
              a.skip-link:focus-visible { transform: translateY(0); outline: 3px solid #ff9e00; outline-offset: 2px; }
              img, svg, video, iframe { max-width: 100%; height: auto; }
            `,
          }}
        />
        {/* <Script id="polyfill-array-at" strategy="beforeInteractive">
          {`if (!Array.prototype.at) {
  Array.prototype.at = function (n) {
    n = Math.trunc(n) || 0;
    if (n < 0) n += this.length;
    if (n < 0 || n >= this.length) return undefined;
    return this[n];
  };
}`}
        </Script> */}
        <Script id="force-passive-touch-listeners" strategy="lazyOnload">
          {`(function() {
    var originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (type === 'touchstart' || type === 'touchmove') {
            if (options == null) {
                options = { passive: true, capture: false };
            } else if (typeof options === 'boolean') {
                options = { passive: true, capture: options };
            } else if (typeof options === 'object') {
                options = Object.assign({}, options, { passive: true });
            } else {
                options = { passive: true, capture: false };
            }
        }
        originalAddEventListener.call(this, type, listener, options);
    };
})();`}
        </Script>
        {/* Tags que DEVEM estar no <head> e não são cobertas pela Metadata API */}
        {/* Ex: Fontes externas carregadas diretamente, scripts inline críticos (raro) */}
        <meta
          name="facebook-domain-verification"
          content="nk6hini7dghzylggt85l67u1es1xwv"
        />
      </head>
      <body
        className={inter.className}
        cz-shortcut-listen={isEnabled.toString()}
      >
        <a href="#main-content" className="skip-link">
          Ir para o conteúdo principal
        </a>
        {children}
        <Script id="defer-manifest" strategy="lazyOnload">
          {`(function() {
                if (document.head.querySelector('link[rel="manifest"]')) {
                    return;
                }
                var manifestLink = document.createElement('link');
                manifestLink.rel = 'manifest';
                manifestLink.href = '/manifest.json';
                manifestLink.crossOrigin = 'use-credentials';
                document.head.appendChild(manifestLink);
            })();`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(devSolarSchema) }}
        />
        {hasGaTrackingId ? (
          <Script id="deferred-ga-loader" strategy="lazyOnload">
            {`
              (function() {
                var loaded = false;
                function loadGA() {
                  if (loaded) return;
                  loaded = true;
                  var s = document.createElement('script');
                  s.async = true;
                  s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}';
                  document.head.appendChild(s);
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}');
                }
                if ('requestIdleCallback' in window) {
                  window.requestIdleCallback(loadGA, { timeout: 4000 });
                } else {
                  window.setTimeout(loadGA, 2500);
                }
                window.addEventListener('scroll', loadGA, { passive: true, once: true });
                window.addEventListener('touchstart', loadGA, { passive: true, once: true });
                document.addEventListener('click', loadGA, { passive: true, once: true });
              })();
            `}
          </Script>
        ) : null}
        <noscript>
          <div className="noscript-warning">
            <span>
              Para uma melhor experiência e navegação no site da{' '}
              <strong>DEV Solar</strong>, por favor
              <a
                href="https://www.enable-javascript.com/pt/"
                target="_blank"
                rel="noopener noreferrer"
              >
                habilite o JavaScript
              </a>{' '}
              no seu navegador.
            </span>
          </div>
        </noscript>
      </body>
    </html>
  );
}
