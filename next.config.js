const isCspReportOnly = process.env.CSP_REPORT_ONLY === 'true';

const cspValue = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://api.staticforms.xyz https://wa.me",
  "manifest-src 'self'",
  'upgrade-insecure-requests',
]
  .join('; ')
  .trim();

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true,
    qualities: [65, 85],
    formats: ['image/avif', 'image/webp'], // Next vai gerar automaticamente
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
          {
            key: cspHeaderKey,
            value: cspValue,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  };
}

module.exports = nextConfig;
