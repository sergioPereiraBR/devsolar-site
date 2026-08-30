import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // Desativa o cache no ambiente de desenvolvimento
  register: true,
  skipWaiting: true,
});

const isDev = process.env.NODE_ENV !== 'production';
const isCspReportOnly = process.env.CSP_REPORT_ONLY === 'true';

const cspValue = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  // Em desenvolvimento (isDev), libera 'unsafe-eval' exigido pelo React/Next.js para sourcemaps
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com https://www.google.com https://www.gstatic.com https://www.recaptcha.net https://calendar.app.google/ https://calendar.google.com https://calendar.google.com/calendar`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.google.com https://www.gstatic.com https://www.recaptcha.net",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https: https://fonts.gstatic.com",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://api.staticforms.xyz https://wa.me https://www.google.com https://www.gstatic.com https://www.googleapis.com https://www.recaptcha.net https://calendar.app.google/ https://calendar.google.com https://calendar.google.com/calendar",
  "frame-src 'self' https://www.google.com https://maps.google.com https://www.gstatic.com https://www.recaptcha.net https://calendar.app.google.com/ https://calendar.google.com https://calendar.google.com/calendar",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  'upgrade-insecure-requests',
]
  .join('; ')
  .trim();

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  productionBrowserSourceMaps: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: [
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-brands-svg-icons',
      '@radix-ui/react-icons',
      '@remixicon/react',
      'lucide-react',
    ],
  },
  images: {
    unoptimized: true,
    // Corrigido: declara explicitamente as qualidades 65, 75 e 85 para eliminar os avisos no console
    qualities: [65, 75, 85],
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'devsolar.com.br' },
    ],
  },
  poweredByHeader: false,
};

// Só define headers se NÃO for exportação estática
if (nextConfig.output !== 'export') {
  nextConfig.headers = async () => {
    const cspHeaderKey = isCspReportOnly
      ? 'Content-Security-Policy-Report-Only'
      : 'Content-Security-Policy';

    return [
      {
        source: '/(.*)',
        headers: [
          { key: cspHeaderKey, value: cspValue },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];

    // return [
    //   {
    //     source: '/_next/static/media/:path*',
    //     headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    //   },
    //   {
    //     source: '/assets/:path*',
    //     headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    //   },
    //   {
    //     source: '/llms.txt',
    //     headers: [
    //       {
    //         key: 'Content-Type',
    //         value: 'text/plain; charset=utf-8',
    //       },
    //       {
    //         key: 'Access-Control-Allow-Origin',
    //         value: '*',
    //       },
    //       {
    //         key: 'Cache-Control',
    //         value: 'public, max-age=86400, must-revalidate',
    //       },
    //     ],
    //   },
    //   {
    //     source: '/images/WhatsApp.svg',
    //     headers: [
    //       {
    //         key: 'X-Robots-Tag',
    //         value: 'noindex, nofollow',
    //       },
    //     ],
    //   },
    //   {
    //     source: '/(.*)',
    //     headers: [
    //       { key: cspHeaderKey, value: cspValue },
    //       {
    //         key: 'Strict-Transport-Security',
    //         value: 'max-age=31536000; includeSubDomains; preload',
    //       },
    //       { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    //       { key: 'X-Content-Type-Options', value: 'nosniff' },
    //       { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    //       {
    //         key: 'Permissions-Policy',
    //         value: 'camera=(), microphone=(), geolocation=()',
    //       },
    //     ],
    //   },
    // ];
  };
}

// module.exports = nextConfig;

export default withPWA(nextConfig);
