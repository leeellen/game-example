/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: { emotion: true },
    optimizeFonts: true,
    compress: true,
    trailingSlash: false,
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [],
    },
};

module.exports = nextConfig;
