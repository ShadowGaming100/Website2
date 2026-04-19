/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    return [
      {
        source: '/server-rules',
        destination: '/server-rules.html',
      },
      {
        source: '/submit-host',
        destination: '/submit-host.html',
      },
      // {
      //   source: '/hosts',
      //   destination: '/hosts.html',
      // },
    ]
  }
}

module.exports = nextConfig
