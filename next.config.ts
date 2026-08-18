/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=2592000',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://matomo.codelabworks.is-a.dev https://*.cloudflareinsights.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https://matomo.codelabworks.is-a.dev https://discord.com https://*.discord.com https://*.cloudflareinsights.com",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
      {
        source: '/hosts',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=1800, s-maxage=43200, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/hosts/:slug',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=1800, s-maxage=43200, stale-while-revalidate=604800',
          },
        ],
      },
            {
        source: '/hosts/og/:slug',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=1800, s-maxage=43200, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=43200',
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
