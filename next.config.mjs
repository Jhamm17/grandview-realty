/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'grandview-realty.jphamm2001.workers.dev',
                pathname: '/proxy/**',
            },
        ],
    },
};

export default nextConfig; 