import Link from '@/components/NoPrefetchLink'
import { redirect } from 'next/navigation'
import { fetchHostById, fetchHostBySlug, type Host } from '../../../lib/cache'
import { slugify } from '../../../lib/slugify'
import HostDetailClient from '../../../components/HostDetailClient'
import { ArrowLeft, Home, Server, X } from 'lucide-react'
export const runtime = 'edge';

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  if (/^\d+$/.test(slug)) return { title: 'Host Not Found | FreeHosts', description: 'The host you are looking for does not exist or has been removed.' }
  const host = await fetchHostBySlug(slug)
  if (!host) return { title: 'Host Not Found | FreeHosts', description: 'The host you are looking for does not exist or has been removed.' }
  const targets = host.targets && host.targets.length ? host.targets.join(', ') : 'various purposes'
  const specs: string[] = []
  if (host.cpu && host.cpu !== 'Unknown') specs.push(host.cpu)
  if (host.ram && host.ram !== 'Unknown') specs.push(host.ram)
  if (host.disk && host.disk !== 'Unknown') specs.push(host.disk)
  const specsText = specs.length > 0 ? `CPU: ${host.cpu || 'Unknown'}, Ram: ${host.ram || 'Unknown'}, Disk: ${host.disk || 'Unknown'}` : ''
  const typeText = host.type && host.type.toLowerCase().includes('trusted') ? 'Trusted & Free' : host.type || 'Free'
  const description = `Free hosting provider ${host.name} offering ${targets}. ${specsText} — ${typeText}.`
  const site = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://freehosts.space').replace(/\/$/, '')
  const hostUrl = `${site}/hosts/${slugify(host.name)}`
  const ogImageUrl = host.image ?? `${site}/Src/Images/social-preview.png`
  const title = `${host.name} | FreeHosts`
  const keywords = [host.name, 'free hosting', 'free hosts', ...(host.targets ?? [])].filter(Boolean)
  return {
    title, description,
    alternates: { canonical: hostUrl },
    keywords,
    authors: [{ name: 'FreeHosts', url: site }],
    metadataBase: new URL(site),
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" as const, "max-snippet": -1 } },
    openGraph: { title, description, url: hostUrl, siteName: 'FreeHosts', type: 'website', locale: 'en_US', images: [{ url: ogImageUrl, width: 1280, height: 720, alt: `${host.name} — Free hosting provider on FreeHosts` }] },
    twitter: { card: 'summary_large_image', title, description, images: [{ url: ogImageUrl, alt: `${host.name} — Free hosting provider on FreeHosts` }], site: '@freehosts_', creator: '@freehosts_' }
  }
}

function HostNotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-icon">
          <Server size={48} aria-hidden="true" />
          <div className="not-found-icon-overlay">
            <X size={20} aria-hidden="true" />
          </div>
        </div>
        <h1 className="not-found-title">404 - Host Not Found</h1>
        <p className="not-found-text">The host you&apos;re looking for doesn&apos;t exist or may have been removed from our directory.</p>
        <div className="not-found-actions">
          <Link href="/hosts" className="not-found-btn primary"><ArrowLeft size={14} aria-hidden="true" /> Back to All Hosts</Link>
          <Link href="/" className="not-found-btn secondary"><Home size={14} aria-hidden="true" /> Go to Homepage</Link>
        </div>
      </div>
    </main>
  )
}

export default async function HostDetailPage({ params }: Props) {
  const { slug } = await params
  if (/^\d+$/.test(slug)) {
    const host: Host | null = await fetchHostById(Number(slug))
    if (!host) return <HostNotFoundPage />
    redirect(`/hosts/${slugify(host.name)}`)
  }
  const host: Host | null = await fetchHostBySlug(slug)
  if (!host) return <HostNotFoundPage />
  const targets = host.targets && host.targets.length ? host.targets.join(', ') : 'various purposes'
  const specs: string[] = []
  if (host.cpu && host.cpu !== 'Unknown') specs.push(host.cpu)
  if (host.ram && host.ram !== 'Unknown') specs.push(host.ram)
  if (host.disk && host.disk !== 'Unknown') specs.push(host.disk)
  const specsText = specs.length > 0 ? `CPU: ${host.cpu || 'Unknown'}, Ram: ${host.ram || 'Unknown'}, Disk: ${host.disk || 'Unknown'}` : ''
  const typeText = host.type && host.type.toLowerCase().includes('trusted') ? 'Trusted & Free' : host.type || 'Free'
  const description = `Free hosting provider ${host.name} offering ${targets}. ${specsText} — ${typeText}.`
  const site = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://freehosts.space').replace(/\/$/, '')
  const hostUrl = `${site}/hosts/${slugify(host.name)}`
  const totalReviews = host.approvals + host.disapprovals
  const ratingValue = totalReviews > 0 ? ((host.approvals / totalReviews) * 5).toFixed(1) : null
  const jsonLd = { "@context": "https://schema.org", "@type": "WebPage", "@id": `${hostUrl}#webpage`, "url": hostUrl, "name": `${host.name} | FreeHosts`, "isPartOf": { "@id": "https://freehosts.space/#website" }, "inLanguage": "en", "description": description }
  const serviceLd = {
    "@context": "https://schema.org", "@type": "Service", "name": host.name, "description": description, "url": hostUrl, "serviceType": "Web Hosting", "category": host.targets?.join(', ') || 'Web Hosting',
    "provider": { "@type": "Organization", "name": host.name, ...(host.links?.[0] ? { "url": host.links[0] } : {}) },
    ...(host.image ? { "image": host.image } : {}),
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": host.status?.toLowerCase() === "online" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", "url": hostUrl, "description": `Free ${host.targets?.join(', ') || 'hosting'} — ${host.cpu || 'Unknown'} CPU, ${host.ram || 'Unknown'} RAM, ${host.disk || 'Unknown'} storage` },
    ...(ratingValue ? { "aggregateRating": { "@type": "AggregateRating", "ratingValue": ratingValue, "bestRating": "5", "worstRating": "1", "ratingCount": totalReviews, "reviewCount": totalReviews } } : {}),
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <HostDetailClient host={host} />
    </>
  )
}
