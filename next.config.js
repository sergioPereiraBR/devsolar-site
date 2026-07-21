module.exports = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    qualities: [70, 85],
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
