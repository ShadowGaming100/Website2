import { fetchHosts } from '../../lib/cache'
import { slugify } from '../../lib/slugify'
import { categories } from '../../lib/categories'
import { findAlternatives, compatibleVsPairs } from '../../lib/taxonomy'

export const runtime = 'edge';

// Honest lastmod policy:
// - Category guides carry a real editorial `updated` date (lib/categories.ts).
// - Host pages use the host's created_at (the day the listing was added).
// - Other static routes omit <lastmod> entirely rather than fabricating a
//   timestamp. Google's own guidance: only emit lastmod when it is accurate;
//   it learns to distrust values that never match real content changes.
export async function GET() {
  const baseUrl = process.env.APP_URL

  // Routes with no per-route modification tracking -> no lastmod.
  const staticRoutes: { path: string }[] = [
    { path: '' },
    { path: '/about' },
    { path: '/faq' },
    { path: '/hosts' },
    { path: '/compare' },
    { path: '/methodology' },
    { path: '/other-free-hosts' },
    { path: '/privacy-policy' },
    { path: '/server-rules' },
    { path: '/staff' },
    { path: '/submission-rules' },
    { path: '/submit-host' },
    { path: '/submit-layout' },
    { path: '/tos' },
  ]

  // Category guide pages: lastmod = the guide's genuine editorial update date.
  const categoryRoutes = categories.map((category) => ({
    loc: `${baseUrl}/categories/${category.slug}`,
    lastmod: category.updated,
  }))

  let urls: { loc: string; lastmod?: string }[] = [
    ...staticRoutes.map((route) => ({ loc: `${baseUrl}${route.path}` })),
    ...categoryRoutes,
  ]

  // Dynamic host routes + alternatives pages (only where the alternatives
  // page itself is indexable, i.e. it lists at least two options).
  try {
    const hosts = await fetchHosts()
    const hostRoutes: { loc: string; lastmod?: string }[] = []
    const altRoutes: { loc: string; lastmod?: string }[] = []
    for (const host of hosts) {
      if (!host.name) continue
      const slug = slugify(host.name)
      hostRoutes.push({
        loc: `${baseUrl}/hosts/${slug}`,
        ...(host.created_at ? { lastmod: new Date(host.created_at).toISOString().split('T')[0] } : {}),
      })
      const alts = findAlternatives(host, hosts)
      if (alts.length >= 2) {
        altRoutes.push({
          loc: `${baseUrl}/alternatives/${slug}`,
          ...(host.created_at ? { lastmod: new Date(host.created_at).toISOString().split('T')[0] } : {}),
        })
      }
    }
    const vsRoutes = compatibleVsPairs(hosts).map(({ slug }) => ({
      loc: `${baseUrl}/vs/${slug}`,
    }))
    urls = [...urls, ...hostRoutes, ...altRoutes, ...vsRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
  }

  const urlset = urls
    .map((u) => {
      const lines = [`    <loc>${u.loc.replaceAll('&', '&amp;')}</loc>`]
      if (u.lastmod) lines.push(`    <lastmod>${u.lastmod}</lastmod>`)
      return `  <url>\n${lines.join('\n')}\n  </url>`
    })
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
