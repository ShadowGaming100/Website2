import { slugify } from './slugify'
import { ramDisplay, diskDisplay } from './specs'
import type { Host } from './cache'

// A host's `targets` field is a comma-separated list inside each array entry
// (e.g. ["Website, Static"]). Split it into clean individual tags.
export function splitTargets(host: Host): string[] {
  const out: string[] = []
  for (const t of host.targets ?? []) {
    for (const part of String(t).split(',')) {
      const p = part.trim()
      if (p) out.push(p)
    }
  }
  return [...new Set(out)]
}

/**
 * Hosts that could reasonably be an alternative to `host`: share at least one
 * target tag. Deterministic order (votes desc, then name) so pages are stable.
 */
export function findAlternatives(host: Host, all: Host[], limit = 12): Host[] {
  const buckets = targetBuckets(host)
  const hostSlug = slugify(host.name)
  return all
    .filter(h => slugify(h.name) !== hostSlug && [...targetBuckets(h)].some(b => buckets.has(b)))
    .sort((a, b) => {
      const va = a.approvals - a.disapprovals
      const vb = b.approvals - b.disapprovals
      if (vb !== va) return vb - va
      return a.name.localeCompare(b.name)
    })
    .slice(0, limit)
}

/** Primary target bucket used to tailor advice copy on taxonomy pages. */
/** Deterministically pick a representative bucket from a set. */
function firstBucket(buckets: Set<string>): string {
  return [...buckets].sort()[0] ?? 'other'
}

export function primaryBucket(host: Host): string {
  return firstBucket(targetBuckets(host))
}

/** The most relevant bucket two hosts SHARE, for versus-page advice. */
export function sharedBucket(a: Host, b: Host): string {
  const shared = [...targetBuckets(a)].filter(x => targetBuckets(b).has(x))
  return shared.length > 0 ? firstBucket(new Set(shared)) : 'other'
}

export function hostRow(host: Host): {
  slug: string; name: string; targets: string;
  cpu: string; ram: string; disk: string; votes: number; ratingPct: number | null
} {
  const totalVotes = (host.approvals || 0) + (host.disapprovals || 0)
  return {
    slug: slugify(host.name),
    name: host.name,
    targets: splitTargets(host).join(', ') || '—',
    cpu: host.cpu || '—',
    ram: ramDisplay(host),
    disk: diskDisplay(host),
    votes: totalVotes,
    ratingPct: totalVotes > 0 ? Math.round(((host.approvals || 0) / totalVotes) * 100) : null,
  }
}

// ─── Target normalisation ────────────────────────────────────────────────────
// Algorithmic, zero-maintenance: any new target string the API starts
// returning groups automatically with hosts sharing the same normalised
// form. No rules to update when targets change.

/**
 * "Website (Static)" -> "website"
 * "Coding(Python)"   -> "coding"
 * "Database (Postgres)" -> "database"
 * "Free Minecraft"   -> "free minecraft"  (new tags just work)
 */
export function normalizeTarget(raw: string): string {
  let t = raw.toLowerCase().trim()
  t = t.replace(/\([^)]*\)/g, ' ')        // drop parenthetical qualifiers
  t = t.replace(/[^a-z0-9+.# ]+/g, ' ')   // unify separators
  t = t.replace(/\s+/g, ' ').trim()
  return t || 'other'
}

export function targetBuckets(host: Host): Set<string> {
  const out = new Set<string>()
  for (const raw of splitTargets(host)) out.add(normalizeTarget(raw))
  if (out.size === 0) out.add('other')
  return out
}

// ─── Versus pages ────────────────────────────────────────────────────────────

/** Parse "a-vs-b" into two slugs, tolerating extra separators. */
export function parseVsSlug(pair: string): [string, string] | null {
  const parts = pair.split('-vs-')
  if (parts.length === 2 && parts[0] && parts[1]) return [parts[0], parts[1]]
  return null
}

/** A host has something meaningful to put in a comparison table. */
function hasComparableData(host: Host): boolean {
  const hasSpecs = Boolean(host.ramMB || host.diskMB || (host.cpu && host.cpu !== 'Unknown'))
  const hasVotes = (host.approvals || 0) + (host.disapprovals || 0) > 0
  return hasSpecs || hasVotes
}

/**
 * Every pair of hosts sharing at least one target bucket, in canonical
 * (alphabetical) slug order. Pairs where BOTH hosts lack any spec data and
 * votes are excluded — there would be nothing to compare.
 */
export function compatibleVsPairs(hosts: Host[]): { slug: string }[] {
  const entries = hosts
    .filter(h => h.name)
    .map(h => ({ h, slug: slugify(h.name), buckets: targetBuckets(h), usable: hasComparableData(h) }))
  const out: { slug: string }[] = []
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const a = entries[i]
      const b = entries[j]
      if (!a.usable && !b.usable) continue // two empty listings = empty page
      let shared = false
      for (const bucket of a.buckets) {
        if (b.buckets.has(bucket)) { shared = true; break }
      }
      if (!shared) continue
      out.push({ slug: [a.slug, b.slug].sort().join('-vs-') })
    }
  }
  return out
}

// ─── Provider classification ─────────────────────────────────────────────────

export type ProviderKind = 'subdomains' | 'domains' | 'hosting'

/**
 * What the provider fundamentally gives out:
 * - "hosting"   runs your workload (specs may or may not be published)
 * - "subdomains" hands out addresses under its own domains (no resources)
 * - "domains"   registers free domain names (no resources)
 */
export function providerKind(host: Host): ProviderKind {
  const raws = splitTargets(host).map(t => t.toLowerCase())
  const addressOnly = raws.every(t => t.includes('subdomain') || t.includes('domain'))
  if (!addressOnly) return 'hosting'
  return raws.some(t => t.includes('subdomain')) ? 'subdomains' : 'domains'
}

/** Whether the listing publishes ANY concrete resource figure. */
export function hasPublishedSpecs(host: Host): boolean {
  return Boolean(
    (host.cpu && host.cpu !== 'Unknown') ||
    host.ramMB ||
    host.diskMB ||
    (host.ram && host.ram !== 'Unknown') ||
    (host.disk && host.disk !== 'Unknown'),
  )
}
