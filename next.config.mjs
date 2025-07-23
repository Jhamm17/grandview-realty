/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.amazonaws.com',
                pathname: '/mlsgrid/images/**',
            }
        ],
        minimumCacheTTL: 3600
    }
};

export default nextConfig; 