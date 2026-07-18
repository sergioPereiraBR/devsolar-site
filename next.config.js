module.exports = {
    reactStrictMode: true,
    output: 'export',
    images: {
        unoptimized: true,
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
