/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index.html',
      },
      {
        source: '/tos',
        destination: '/tos.html',
      },
      {
        source: '/about',
        destination: '/about.html',
      },
      {
        source: '/staff',
        destination: '/staff.html',
      },
      {
        source: '/faq',
        destination: '/faq.html',
      },
      {
        source: '/privacy-policy',
        destination: '/privacy-policy.html',
      },
      {
        source: '/server-rules',
        destination: '/server-rules.html',
      },
      {
        source: '/submission-rules',
        destination: '/submission-rules.html',
      },
      {
        source: '/submit-host',
        destination: '/submit-host.html',
      },
      {
        source: '/submit-layout',
        destination: '/submit-layout.html',
      },
      {
        source: '/other-free-hosts',
        destination: '/other-free-hosts.html',
      },
      // {
      //   source: '/hosts',
      //   destination: '/hosts.html',
      // },
      {
        source: '/_not-found',
        destination: '/404.html',
      },
    ]
  }
}

module.exports = nextConfig
