const isCspReportOnly = process.env.CSP_REPORT_ONLY === 'true';

const cspValue = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com https://www.google.com https://www.gstatic.com https://www.recaptcha.net",
  "style-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://www.recaptcha.net",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://api.staticforms.xyz https://wa.me https://www.google.com https://www.gstatic.com https://www.googleapis.com https://www.recaptcha.net",
  "frame-src 'self' https://www.google.com https://maps.google.com https://www.gstatic.com https://www.recaptcha.net",
  "manifest-src 'self'",
  'upgrade-insecure-requests',
]
  .join('; ')
  .trim();

const nextConfig = {
  reactStrictMode: true,
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
    unoptimized: true, // Necessário para 'output: export'
    qualities: [65, 75, 85], // Corrigido para incluir a qualidade 75 (padrão) + 65 e 85
    formats: ['image/avif', 'image/webp'], // Adicionado suporte a PNG, JPEG e SVG
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'devsolar.com.br',
      },
    ],
  },
  poweredByHeader: false,
};

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
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  };
}

module.exports = nextConfig;
