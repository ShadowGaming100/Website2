/**
 * Shared spec-parsing helpers used by HostsClient and ComparisonPanel.
 * Pure functions, edge-runtime safe.
 */

/**
 * Parses a CPU spec string into a comparable numeric value.
 * - "Unlimited" or "Infinity" → Infinity (sorts to top)
 * - Percentage strings (e.g. "50%") → fraction (0.5)
 * - Core strings (e.g. "2 vCores") → core count (2)
 * - Plain numbers → that number
 * - Unrecognised / undefined → 0
 */
export const parseCPUValue = (cpuStr?: string): number => {
  if (!cpuStr) return 0
  const normalized = cpuStr.toLowerCase()
  if (normalized.includes('unlimited') || normalized.includes('infinity') || normalized.includes('∞')) {
    return Infinity
  }
  const percentMatch = cpuStr.match(/([\d.]+)%/)
  if (percentMatch) return parseFloat(percentMatch[1]) / 100
  const coreMatch = cpuStr.match(/([\d.]+)\s*(vCores|cores|core)/i)
  if (coreMatch) return parseFloat(coreMatch[1])
  const numberMatch = cpuStr.match(/([\d.]+)/)
  return numberMatch ? parseFloat(numberMatch[1]) : 0
}

/**
 * Formats a megabyte value for display: "1.5 GB" / "512 MB", or "Unknown".
 */
export const formatSize = (mb?: number): string => {
  if (!mb) return 'Unknown'
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`
  return `${Math.round(mb)} MB`
}

/**
 * Converts a memory spec string (or pre-parsed MB value) to megabytes.
 * - "Unlimited" or "Infinity" → Infinity (sorts to top)
 * - If `memoryMB` is provided it takes precedence.
 * - Recognises TB / GB / MB suffixes (case-insensitive).
 * - Unrecognised / undefined → 0
 */
export const parseMemoryToMB = (memoryStr?: string, memoryMB?: number): number => {
  if (memoryMB) return memoryMB
  if (!memoryStr) return 0
  const normalized = memoryStr.toLowerCase()
  if (normalized.includes('unlimited') || normalized.includes('infinity') || normalized.includes('∞')) {
    return Infinity
  }
  const match = memoryStr.match(/([\d.]+)\s*(GB|MB|TB)/i)
  if (!match) return 0
  const value = parseFloat(match[1])
  const unit = match[2].toUpperCase()
  switch (unit) {
    case 'TB': return value * 1024 * 1024
    case 'GB': return value * 1024
    case 'MB': return value
    default: return value
  }
}
