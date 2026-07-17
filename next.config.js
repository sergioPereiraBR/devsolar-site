module.exports = {
    reactStrictMode: true,
    output: 'export',
    images: {
        unoptimized: true,
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
