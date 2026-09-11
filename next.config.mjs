/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // MLS photos are proxied through Cloudflare. Vercel's optimizer 502s on those URLs.
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'grandview-realty.jphamm2001.workers.dev',
                pathname: '/proxy/**',
            },
            {
                protocol: 'https',
                hostname: 'media.mlsgrid.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 's3.amazonaws.com',
                pathname: '/mlsgrid/images/**',
            },
        ],
    },
};

export default nextConfig; 