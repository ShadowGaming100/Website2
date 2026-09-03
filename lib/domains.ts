// Shared domain-name extraction from free-text host fields (was pasted in
// HostCard's DomainSection + the OG image route with slight variations).

/** Bare domain-looking lines, deduped, bullets stripped. */
export function extractDomainNames(text: string): string[] {
  return Array.from(new Set(text.split('\n')
    .map(l => l.trim())
    .filter(l => /^\s*[-–•*\s]*[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+[\r\n]*$/.test(l))
    .map(l => l.replace(/^[-–•*\s]+/, '').trim().split(/\s/)[0])
  ));
}
