import Link from '@/components/NoPrefetchLink'
import { redirect } from 'next/navigation'
import { fetchHostById, fetchHostBySlug, type Host } from '../../../lib/cache'
import { slugify } from '../../../lib/slugify'
import HostDetailClient from '../../../components/HostDetailClient'
export const runtime = 'edge';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params

  // For numeric slugs, return minimal metadata (page will redirect)
  if (/^\d+$/.test(slug)) {
    return {
      title: 'Host Not Found | FreeHosts',
      description: 'The host you are looking for does not exist or has been removed.'
    }
  }

  const host = await fetchHostBySlug(slug)
  if (!host) {
    return {
      title: 'Host Not Found | FreeHosts',
      description: 'The host you are looking for does not exist or has been removed.'
    }
  }

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
  const imageWidth = 1280
  const imageHeight = 720
  const imageAlt = `${host.name} — Free hosting provider on FreeHosts`
  const title = `${host.name} | FreeHosts`
  const keywords = [host.name, 'free hosting', 'free hosts', ...(host.targets ?? [])].filter(Boolean)

  return {
    title,
    description,
    alternates: {
      canonical: hostUrl
    },
    keywords,
    authors: [{ name: 'FreeHosts', url: site }],
    metadataBase: new URL(site),
    openGraph: {
      title,
      description,
      url: hostUrl,
      siteName: 'FreeHosts',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: ogImageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      site: '@freehosts_',
      creator: '@freehosts_'
    }
  }
}

function HostNotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-icon">
          <i className="fas fa-server" />
          <div className="not-found-icon-overlay">
            <i className="fas fa-times" />
          </div>
        </div>
        <h1 className="not-found-title">404 - Host Not Found</h1>
        <p className="not-found-text">
          The host you&apos;re looking for doesn&apos;t exist or may have been removed from our directory.
        </p>
        <div className="not-found-actions">
          <Link href="/hosts" className="not-found-btn primary">
            <i className="fas fa-arrow-left" /> Back to All Hosts
          </Link>
          <Link href="/" className="not-found-btn secondary">
            <i className="fas fa-home" /> Go to Homepage
          </Link>
        </div>
      </div>
    </main>
  )
}

export default async function HostDetailPage({ params }: Props) {
  const { slug } = await params

  if (/^\d+$/.test(slug)) {
    // Legacy numeric ID — look up host and redirect to slug URL
    const host: Host | null = await fetchHostById(Number(slug))
    if (!host) return <HostNotFoundPage />
    redirect(`/hosts/${slugify(host.name)}`)
  }

  // Slug-based lookup
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${hostUrl}#webpage`,
    "url": hostUrl,
    "name": `${host.name} | FreeHosts`,
    "isPartOf": { "@id": "https://freehosts.space/#website" },
    "inLanguage": "en",
    "description": description
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HostDetailClient host={host} />
    </>
  )
}
