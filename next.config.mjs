/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['grandview-realty.jphamm2001.workers.dev'],
        minimumCacheTTL: 3600,
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    }
};

export default nextConfig; 