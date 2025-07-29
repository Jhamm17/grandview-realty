import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: [
            'api.mred.com', // Add actual MRED image domains
            'cdn.mred.com',
            'photos.mred.com'
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/webp'],
        minimumCacheTTL: 3600, // 1 hour minimum cache
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    experimental: {
        optimizeCss: true
    },
    // Video optimization headers
    async headers() {
        return [
            {
                source: '/(.*)\\.mp4',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                    {
                        key: 'Accept-Ranges',
                        value: 'bytes',
                    },
                ],
            },
        ];
    },
};

export default nextConfig; 