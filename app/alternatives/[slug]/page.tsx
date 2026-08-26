import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from '@/components/NoPrefetchLink'
import Breadcrumbs from '@/components/Breadcrumbs'
import { safeJsonLd } from '../../../lib/safeJsonLd'
import { fetchHostBySlug, fetchHosts } from '../../../lib/cache'
import { slugify } from '../../../lib/slugify'
import { splitTargets, findAlternatives, primaryBucket, hostRow } from '../../../lib/taxonomy'

export const runtime = 'edge'

type Props = { params: Promise<{ slug: string }> }

const BUCKET_ADVICE: Record<string, string[]> = {
  gaming: [
    'Match the RAM to your server type — vanilla Minecraft runs on 1–2 GB, modpacks need more than most free tiers offer.',
    'Check the idle policy before anything else: many free game servers sleep when nobody is online and cold-start on the next join.',
    'Prefer hosts that include scheduled backups, so a corrupt world file never costs you everything.',
  ],
  website: [
    'Compare storage and monthly bandwidth caps first — they are the two limits small sites hit soonest.',
    'If you need your own domain or HTTPS certificate, filter for providers that include both on the free tier.',
    'Static-only hosts are extremely fast and reliable; dynamic (PHP/Node) free tiers trade convenience for tighter caps.',
  ],
  coding: [
    'Check supported runtimes and versions before signing up — this filter alone removes half the candidates.',
    'Idle-sleep policies matter most for bots and APIs: a paused process adds seconds to the first request after a quiet period.',
    'Keep state in an external database from day one so restarts and cold starts never lose data.',
  ],
  database: [
    'Storage caps and connection limits vary more between providers than engines do — compare both numbers.',
    'Some free databases pause after long idle periods and cold-start on the next query; fine for dev, risky for production.',
    'Schedule your own exports regardless of what the provider promises — free tiers back up less aggressively.',
  ],
  other: [
    'Verify the provider still actively maintains its free tier — status badges here reflect community reports.',
    'Compare what "free" includes: custom domains, SSL, and email accounts are commonly gated behind paid plans.',
  ],
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const host = await fetchHostBySlug(slug)
  if (!host) return { title: 'Not Found', robots: { index: false, follow: false } }
  const all = await fetchHosts()
  const alts = findAlternatives(host, all)
  // Keep the full rendered title (base + " | FreeHosts") within ~60 chars.
  const longTitle = `${host.name} Alternatives: Free Options Compared`
  const title = longTitle.length + 12 <= 60 ? longTitle : `${host.name} Alternatives`
  const description =
    alts.length === 0
      ? `${host.name} alternatives are being verified. Browse the FreeHosts directory for ${all.length - 1} other free hosting providers, compared spec by spec.`
      : `Looking beyond ${host.name}? Compare ${alts.length} free hosting alternative${alts.length === 1 ? '' : 's'} side by side — RAM, CPU, storage, targets and community votes.`
  return {
    title,
    ...(description.length > 160 ? { description: description.slice(0, 157) + '...' } : { description }),
    alternates: { canonical: `${process.env.APP_URL}/alternatives/${slugify(host.name)}` },
    robots: {
      index: alts.length >= 2,
      follow: true,
      googleBot: { index: alts.length >= 2, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  }
}

export default async function AlternativesPage({ params }: Props) {
  const { slug } = await params
  const host = await fetchHostBySlug(slug)
  if (!host) notFound()

  const all = await fetchHosts()
  const alts = findAlternatives(host, all)
  const rows = alts.map(hostRow)
  const pageUrl = `${process.env.APP_URL}/alternatives/${slugify(host.name)}`
  const tags = splitTargets(host)
  const advice = BUCKET_ADVICE[primaryBucket(host)] ?? [
            'Verify the provider still actively maintains its free tier — status badges here reflect community reports.',
            'Compare what "free" includes: custom domains, SSL, and email accounts are commonly gated behind paid plans.',
          ]

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${host.name} Alternatives`,
    isPartOf: { '@id': `${process.env.APP_URL}/#website` },
    inLanguage: 'en',
    description: `Free hosting alternatives to ${host.name}, compared side by side.`,
    ...(host.created_at ? { dateModified: new Date(host.created_at).toISOString().split('T')[0] } : {}),
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Free alternatives to ${host.name}`,
    numberOfItems: rows.length,
    itemListElement: rows.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${process.env.APP_URL}/hosts/${r.slug}`,
      name: r.name,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(itemListSchema) }} />
      <Breadcrumbs
        siteUrl={process.env.APP_URL}
        items={[
          { name: 'Free Hosting Directory', path: '/hosts' },
          { name: host.name, path: `/hosts/${slugify(host.name)}` },
          { name: 'Alternatives', path: `/alternatives/${slugify(host.name)}` },
        ]}
      />
      <main className="wrap about-content">
        <section className="faq-hero">
          <h1>{host.name} Alternatives</h1>
          <p>
            {rows.length >= 2 ? (
              <>
                The {rows.length} best free alternatives to {host.name}, compared on specs, limits and community votes.
                Every option below is a live listing in the FreeHosts directory.
              </>
            ) : rows.length === 1 ? (
              <>
                {rows[0].name} is currently the closest verified free alternative to {host.name}, serving similar use
                cases — see the comparison below and browse the directory for more options.
              </>
            ) : (
              <>We have not yet verified enough similar providers to list alternatives to {host.name}. Meanwhile, the directory lists {all.length - 1} other providers.</>
            )}
          </p>
        </section>

        {rows.length >= 1 && (
          <section className="content-section">
            <h2>{rows.length === 1 ? `Free alternative to ${host.name}` : `Free ${host.name} alternatives compared`}</h2>
            <p className="host-about-summary">
              Specs below come from each provider&apos;s published free plan at the time of listing. Tap any name for the
              full profile, links and vote history.
            </p>
            <table className="info-table alt-table">
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Targets</th>
                  <th>CPU</th>
                  <th>RAM</th>
                  <th>Storage</th>
                  <th>Reviews</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.slug}>
                    <td><Link href={`/hosts/${r.slug}`}>{r.name}</Link></td>
                    <td>{r.targets}</td>
                    <td>{r.cpu}</td>
                    <td>{r.ram}</td>
                    <td>{r.disk}</td>
                    <td>{r.ratingPct !== null ? `${r.ratingPct}% (${r.votes})` : 'No votes yet'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length >= 1 && (
              <p className="host-about-summary">
                Head-to-head:{' '}
                {rows.slice(0, 3).map((r, i) => (
                  <span key={r.slug}>
                    {i > 0 && ' · '}
                    <Link href={`/vs/${slugify(host.name)}-vs-${r.slug}`}>{host.name} vs {r.name}</Link>
                  </span>
                ))}
              </p>
            )}
          </section>
        )}

        <section className="content-section">
          <h2>Why look for {host.name} alternatives?</h2>
          <p className="host-about-summary">
            {host.status && host.status.toLowerCase() === 'closed'
              ? `${host.name} is currently listed as closed, so the options above are the active way to get the same kind of service.`
              : `Free tiers trade capacity for cost, and even good providers are not a fit for every project.`}{' '}
            Common reasons people switch include resource caps being tighter than a project needs, idle policies that pause
            servers or apps, queue or waitlist systems on popular plans, and limits like no custom domains.{' '}
            {tags.length > 0 ? `${host.name} covers ${tags.join(', ')}.` : null}
          </p>
        </section>

        <section className="content-section">
          <h2>How to choose between free hosting alternatives</h2>
          <ul className="host-check-list">
            {advice.map(line => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <div className="faq-cta">
          <h2>Still deciding?</h2>
          <p>Browse the full directory or compare shortlisted hosts side by side.</p>
          <div className="faq-cta-buttons">
            <Link className="faq-cta-btn primary" href="/hosts">Browse all free hosts</Link>
            <Link className="faq-cta-btn secondary" href={`/hosts/${slugify(host.name)}`}>
              Back to {host.name}
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
