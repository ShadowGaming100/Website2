// Shared cookie helpers (were duplicated in FavoritesContext + ConsentContext).

export function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));
  if (!match) return undefined;
  return decodeURIComponent(match.split('=').slice(1).join('='));
}

export function writeCookie(name: string, value: string, maxAgeSeconds?: number): void {
  try {
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    const age = maxAgeSeconds !== undefined ? `; Max-Age=${maxAgeSeconds}` : '';
    document.cookie = `${name}=${encodeURIComponent(value)}${age}; Path=/; SameSite=Lax${secure}`;
  } catch {
    // Cookie write failed (e.g., cookies disabled); state still works in-memory.
  }
}
