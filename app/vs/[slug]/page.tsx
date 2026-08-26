import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from '@/components/NoPrefetchLink'
import Breadcrumbs from '@/components/Breadcrumbs'
import { safeJsonLd } from '../../../lib/safeJsonLd'
import { fetchHosts, type Host } from '../../../lib/cache'
import { slugify } from '../../../lib/slugify'
import { splitTargets, targetBuckets, parseVsSlug, sharedBucket } from '../../../lib/taxonomy'
import { permanentRedirect } from 'next/navigation'
import { ramDisplay, diskDisplay } from '../../../lib/specs'

export const runtime = 'edge'

type Props = { params: Promise<{ slug: string }> }

const BUCKET_PICK: Record<string, string> = {
  gaming: 'For game servers, RAM is the deciding number — vanilla worlds run on 1–2 GB, while modpacks demand more than most free tiers publish.',
  website: 'For websites, storage and bandwidth caps decide how far the free plan stretches; custom-domain support is the next tiebreaker.',
  coding: 'For apps and bots, the idle policy decides daily experience: a paused process answers seconds late after quiet periods.',
  database: 'For databases, compare storage caps and connection limits — they vary more between providers than engines do.',
  other: 'Compare what "free" includes at each provider: custom domains, SSL and email are the features most often gated behind paid plans.',
}

function pct(host: Host): number | null {
  const total = (host.approvals || 0) + (host.disapprovals || 0)
  return total > 0 ? Math.round(((host.approvals || 0) / total) * 100) : null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const pair = parseVsSlug(slug)
  if (!pair) return { title: 'Not Found', robots: { index: false, follow: false } }
  const hosts = await fetchHosts()
  const a = hosts.find(h => slugify(h.name) === pair[0])
  const b = hosts.find(h => slugify(h.name) === pair[1])
  if (!a || !b) return { title: 'Not Found', robots: { index: false, follow: false } }
  // One canonical direction per pair: /vs/b-vs-a permanently redirects to /vs/a-vs-b.
  const [first, second] = [slugify(a.name), slugify(b.name)].sort()
  if (`${first}-vs-${second}` !== slug) {
    return { alternates: { canonical: `${process.env.APP_URL}/vs/${first}-vs-${second}` } }
  }
  // Keep the rendered title (base + " | FreeHosts") within ~60 chars.
  const longTitle = `${a.name} vs ${b.name}: Free Hosting Compared`
  const shortTitle = `${a.name} vs ${b.name} compared`
  const title = longTitle.length + 12 <= 60 ? longTitle : (shortTitle.length + 12 <= 60 ? shortTitle : `${a.name} vs ${b.name}`)
  const description =
    `${a.name} and ${b.name} side by side: targets, CPU, RAM, storage, status and community votes. ` +
    `An honest, spec-level comparison of two free hosting providers.`
  const sharedOk = [...targetBuckets(a)].some(bucket => targetBuckets(b).has(bucket))
  return {
    title,
    description,
    alternates: { canonical: `${process.env.APP_URL}/vs/${slugify(a.name)}-vs-${slugify(b.name)}` },
    robots: {
      index: sharedOk,
      follow: true,
      googleBot: { index: sharedOk, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  }
}

export default async function VersusPage({ params }: Props) {
  const { slug } = await params
  const pair = parseVsSlug(slug)
  if (!pair) notFound()

  const all = await fetchHosts()
  const a = all.find(h => slugify(h.name) === pair[0])
  const b = all.find(h => slugify(h.name) === pair[1])
  if (!a || !b) notFound()
  if (slugify(a.name) === slugify(b.name)) notFound() // a host cannot compete with itself

  // Enforce one URL per pair regardless of the order typed in.
  const canonicalSlug = [slugify(a.name), slugify(b.name)].sort().join('-vs-')
  if (canonicalSlug !== slug) permanentRedirect(`/vs/${canonicalSlug}`)

  const sharedOk = [...targetBuckets(a)].some(bucket => targetBuckets(b).has(bucket))

  const rowsA = splitTargets(a).join(', ') || '—'
  const rowsB = splitTargets(b).join(', ') || '—'
  const ramA = ramDisplay(a), ramB = ramDisplay(b)
  const diskA = diskDisplay(a), diskB = diskDisplay(b)
  const votesA = (a.approvals || 0) + (a.disapprovals || 0)
  const votesB = (b.approvals || 0) + (b.disapprovals || 0)
  const pctA = pct(a), pctB = pct(b)

  // Factual differences only — computed, never invented.
  const diffs: string[] = []
  const ramToMB = (h: Host) => h.ramMB ?? 0
  if (ramA !== 'Unknown' && ramB !== 'Unknown' && ramA !== ramB) {
    const aWins = ramToMB(a) >= ramToMB(b)
    diffs.push(`RAM: ${(aWins ? a : b).name} lists the larger allocation (${aWins ? ramA : ramB} vs ${aWins ? ramB : ramA}).`)
  }
  if (diskA !== 'Unknown' && diskB !== 'Unknown' && diskA !== diskB) {
    const dA = a.diskMB ?? 0
    const dB = b.diskMB ?? 0
    if (dA && dB) diffs.push(`Storage: ${(dA >= dB ? a : b).name} offers more (${dA >= dB ? diskA : diskB} vs ${dA >= dB ? diskB : diskA}).`)
  }
  if (pctA !== null && pctB !== null && pctA !== pctB && Math.max(votesA, votesB) > 0) {
    const leader = pctA! > pctB! ? a : b
    diffs.push(`Community score: ${leader.name} currently rates higher (${Math.max(pctA!, pctB!) }% across ${Math.max(votesA, votesB)} votes).`)
  }
  if (a.status && b.status && a.status.toLowerCase() !== b.status.toLowerCase()) {
    diffs.push(`Status: ${a.name} is listed as ${a.status.toLowerCase()}, ${b.name} as ${b.status.toLowerCase()}.`)
  }

  const pageUrl = `${process.env.APP_URL}/vs/${slugify(a.name)}-vs-${slugify(b.name)}`
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${a.name} vs ${b.name}`,
    isPartOf: { '@id': `${process.env.APP_URL}/#website` },
    inLanguage: 'en',
    description: `Spec-level comparison of free hosting providers ${a.name} and ${b.name}.`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(webPageSchema) }} />
      <Breadcrumbs
        siteUrl={process.env.APP_URL}
        items={[
          { name: 'Free Hosting Directory', path: '/hosts' },
          { name: `${a.name} vs ${b.name}`, path: `/vs/${slugify(a.name)}-vs-${slugify(b.name)}` },
        ]}
      />
      <main className="wrap about-content">
        <section className="faq-hero">
          <h1>{a.name} vs {b.name}</h1>
          <p>
            Both are free hosting providers{sharedOk ? ' serving similar use cases' : ''}. Here is every published
            spec side by side — CPU, RAM, storage, status and community votes — so you can decide on facts rather
            than marketing.
          </p>
        </section>

        <section className="content-section">
          <h2>{a.name} vs {b.name}: spec comparison</h2>
          <table className="info-table alt-table">
            <thead>
              <tr>
                <th></th>
                <th><Link href={`/hosts/${slugify(a.name)}`}>{a.name}</Link></th>
                <th><Link href={`/hosts/${slugify(b.name)}`}>{b.name}</Link></th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Targets</td><td>{rowsA}</td><td>{rowsB}</td></tr>
              <tr><td>CPU</td><td>{a.cpu || '—'}</td><td>{b.cpu || '—'}</td></tr>
              <tr><td>RAM</td><td>{ramA}</td><td>{ramB}</td></tr>
              <tr><td>Storage</td><td>{diskA}</td><td>{diskB}</td></tr>
              <tr><td>Status</td><td>{a.status || '—'}</td><td>{b.status || '—'}</td></tr>
              <tr>
                <td>Community</td>
                <td>{pctA !== null ? `${pctA}% of ${votesA} review${votesA === 1 ? '' : 's'}` : 'No reviews yet'}</td>
                <td>{pctB !== null ? `${pctB}% of ${votesB} review${votesB === 1 ? '' : 's'}` : 'No reviews yet'}</td>
              </tr>
              <tr>
                <td>Listed since</td>
                <td>{a.created_at ? new Date(a.created_at).getFullYear() : '—'}</td>
                <td>{b.created_at ? new Date(b.created_at).getFullYear() : '—'}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="content-section">
          <h2>Key differences</h2>
          {diffs.length > 0 ? (
            <ul className="host-check-list">
              {diffs.map(d => <li key={d}>{d}</li>)}
            </ul>
          ) : (
            <p className="host-about-summary">
              Their published specs are closely matched — for these two, the practical differences will come down to
              idle policies, supported languages and community feedback rather than headline numbers.
            </p>
          )}
        </section>

        <section className="content-section">
          <h2>Which should you pick?</h2>
          <p className="host-about-summary">{BUCKET_PICK[sharedBucket(a, b)] ?? 'Compare what each provider publishes for its free plan — the table above carries the facts; community votes carry the experience.'}</p>
          <ul className="host-check-list">
            <li>Read each provider&apos;s own plan page before committing — free tiers change without notice.</li>
            <li>Check community review scores on both profiles ({a.name}: {pctA ?? 'n/a'}%, {b.name}: {pctB ?? 'n/a'}%) and skim recent feedback in our Discord.</li>
            <li>Deploy something small to both if you can — real-world latency and panel comfort beat any spec sheet.</li>
          </ul>
        </section>

        <div className="faq-cta">
          <h2>Want more options?</h2>
          <p>Both providers sit inside the full directory, alongside {all.length - 2} others.</p>
          <div className="faq-cta-buttons">
            <Link className="faq-cta-btn primary" href="/hosts">Browse all free hosts</Link>
            <Link className="faq-cta-btn secondary" href={`/alternatives/${slugify(a.name)}`}>
              More {a.name} alternatives
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
