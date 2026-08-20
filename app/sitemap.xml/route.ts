import { fetchHosts } from '../../lib/cache'
import { slugify } from '../../lib/slugify'

export const runtime = 'edge';

export async function GET() {
  const baseUrl = process.env.APP_URL

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/faq',
    '/hosts',
    '/other-free-hosts',
    '/privacy-policy',
    '/server-rules',
    '/staff',
    '/submission-rules',
    '/submit-host',
    '/submit-layout',
    '/tos',
    '/categories/free-discord-bot-hosting',
    '/categories/free-game-server-hosting',
    '/categories/free-website-hosting',
    '/categories/free-app-hosting',
    '/categories/free-database-hosting',
  ]

  let urls = staticRoutes.map((route) => {
    const lastmod = new Date().toISOString()
    return {
      loc: `${baseUrl}${route}`,
      lastmod,
      changefreq: 'weekly',
      priority: route === '' ? '1' : '0.8',
    }
  })

  // Dynamic host routes
  try {
    const hosts = await fetchHosts()
    const hostRoutes = hosts.map((host) => ({
      loc: `${baseUrl}/hosts/${slugify(host.name)}`,
      lastmod: host.created_at ? new Date(host.created_at).toISOString() : new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.6',
    }))
    urls = [...urls, ...hostRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
  }

  const urlset = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc.replaceAll('&', '&amp;')}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=43200, no-transform',
    },
  })
}