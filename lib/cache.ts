import { slugify } from './slugify'

export interface Host {
  id: number
  name: string
  description?: string
  info?: string
  type?: string
  locale: string[]
  targets: string[]
  status?: string
  cpu?: string
  ram?: string
  ramMB?: number
  disk?: string
  diskMB?: number
  approvals: number
  disapprovals: number
  created_at?: string
  free_plan?: string
  links: string[]
  image?: string
}

interface RawHost {
  id?: number
  name?: string
  description?: string
  info?: string
  type?: string
  locale?: unknown
  targets?: unknown
  status?: string
  cpu?: string
  ram?: string
  ramMB?: number
  disk?: string
  diskMB?: number
  approvals?: number
  disapprovals?: number
  created_at?: string
  free_plan?: string
  links?: unknown
  image?: string
}

// NOTE: We intentionally do NOT keep a hand-rolled module-level cache here
// (no `let hostsCache`, no `cacheTimestamp`). On edge/Workers runtimes,
// module-level state is not guaranteed to persist reliably across requests
// (isolates can be fresh or reused unpredictably), which previously caused
// inconsistent cache hits and a bug where a freshly-added host could 404
// for up to 5 minutes even after a re-fetch was triggered. Next's own
// fetch-level cache (`next: { revalidate }` below) already provides
// request memoization + time-based revalidation and is safe across
// runtimes, so we rely on that exclusively.
//
// TTL note: this 5-minute revalidation is the DATA freshness knob.
// middleware.ts's Cache-Control tiers are the CDN/browser knob for rendered
// pages — longer is fine there because a revalidated re-render refreshes
// them. If listings feel stale, change REVALIDATE_SECONDS, not middleware.

const REVALIDATE_SECONDS = 300 // 5 minutes

export async function fetchHosts(): Promise<Host[]> {
  try {
    const response = await fetch(`${process.env.API_URL}/api/hosts?limit=1000`, {
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!response.ok) throw new Error(`API ${response.status}`)
    const data = await response.json()

    const hostsData = Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
      ? data
      : []

    const cleanedHosts: Host[] = hostsData.map((host: RawHost) => ({
      id: host.id || 0,
      name: host.name || 'Unknown Host',
      description: host.description || '',
      info: host.info || '',
      type: host.type || '',
      locale: Array.isArray(host.locale) ? host.locale : [],
      targets: Array.isArray(host.targets) ? host.targets : [],
      status: host.status || 'Unknown',
      cpu: host.cpu || 'Unknown',
      ram: host.ram || 'Unknown',
      ramMB: host.ramMB || 0,
      disk: host.disk || 'Unknown',
      diskMB: host.diskMB || 0,
      approvals: host.approvals || 0,
      disapprovals: host.disapprovals || 0,
      created_at: host.created_at || '',
      free_plan: host.free_plan || '',
      links: Array.isArray(host.links) ? host.links : [],
      image: host.image,
    }))

    return cleanedHosts
  } catch (err) {
    console.error('Failed to fetch hosts list:', err)
    // No local fallback cache to fall back to anymore — an empty list is
    // safer than silently serving arbitrarily stale in-memory data from a
    // previous, unrelated request on a reused edge isolate.
    return []
  }
}

/**
 * Finds a host whose slugified name matches the given slug.
 */
export async function fetchHostBySlug(slug: string): Promise<Host | null> {
  return (await fetchHosts()).find(h => slugify(h.name) === slug) ?? null
}

// Fetch single host using the full list (API has no /:id route)
export async function fetchHostById(
  id: number | string,
): Promise<Host | null> {
  const hostId = Number(id)
  if (!Number.isFinite(hostId)) return null

  const allHosts = await fetchHosts()
  return allHosts.find((h) => h.id === hostId) ?? null
}
