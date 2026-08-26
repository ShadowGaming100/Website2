// Single source of truth for formatting host specifications.
// Used by metadata generation (meta descriptions, JSON-LD Offer strings)
// AND by every UI surface (spec boxes, cards) so the same host can never
// render conflicting values like "4 GB" vs "4.9GB" again.

export function formatSpecSize(mb?: number): string {
  if (!mb) return ''
  if (mb >= 1024) return (mb / 1024).toFixed(1) + ' GB'
  return Math.round(mb) + ' MB'
}

export interface SpecSource {
  cpu?: string
  ram?: string
  ramMB?: number
  disk?: string
  diskMB?: number
}

/**
 * The display value for RAM: prefer the byte-derived figure when present,
 * fall back to the raw string. Both UI and schema must call this.
 */
export function ramDisplay(host: SpecSource): string {
  return formatSpecSize(host.ramMB) || host.ram || 'Unknown'
}

/**
 * The display value for storage: same precedence rule as RAM.
 */
export function diskDisplay(host: SpecSource): string {
  return formatSpecSize(host.diskMB) || host.disk || 'Unknown'
}

/**
 * Compact one-line spec summary used in meta descriptions and
 * JSON-LD Offer text. Omits unknown values entirely rather than
 * printing "Unknown".
 */
export function specSummary(host: SpecSource): string {
  const parts: string[] = []
  if (host.cpu && host.cpu !== 'Unknown') parts.push(`${host.cpu} CPU`)
  const ram = ramDisplay(host)
  if (ram !== 'Unknown') parts.push(`${ram} RAM`)
  const disk = diskDisplay(host)
  if (disk !== 'Unknown') parts.push(`${disk} storage`)
  return parts.join(', ')
}
