// Shared URL guards (were copy-pasted in PreviewCard + HostDetailClient linkify).

/** The href if it's an http(s) URL, otherwise the fallback. Never throws. */
export function safeHttpUrl(href: string, fallback = '#'): string {
  try {
    const parsed = new URL(href);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') return href;
  } catch {
    // malformed URL — fall through
  }
  return fallback;
}

/** `true` only for http(s) URLs — javascript:/data: never pass. */
export function isHttpUrl(href: string): boolean {
  return safeHttpUrl(href, '') !== '';
}

/** Lower-cased hostname without a leading www, or '' when unparseable. */
export function getDomain(href: string): string {
  try {
    return new URL(href).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return '';
  }
}
