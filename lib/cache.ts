import { Host } from '@/types/host';

let hostsCache: Host[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin || 'http://localhost:3000';
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
}

export async function fetchHosts(): Promise<Host[]> {
  if (
    hostsCache &&
    cacheTimestamp &&
    Date.now() - cacheTimestamp < CACHE_DURATION
  ) {
    return hostsCache;
  }

  try {
    const apiUrl = `${getApiBaseUrl()}/api/hosts`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch hosts: ${response.status} ${response.statusText}`);
    }
    
    const hosts: Host[] = await response.json();
    
    hostsCache = hosts;
    cacheTimestamp = Date.now();

    return hosts;
  } catch (err) {
    console.error('Failed to fetch hosts list:', err);
    return hostsCache || [];
  }
}

export function getHostFromCache(id: number): Host | undefined {
  if (!hostsCache) return undefined;
  return hostsCache.find((h) => h.id === id);
}

export async function fetchHostById(id: number | string): Promise<Host | null> {
  const hostId = Number(id);
  if (!Number.isFinite(hostId)) return null;

  try {
    if (
      hostsCache &&
      cacheTimestamp &&
      Date.now() - cacheTimestamp < CACHE_DURATION
    ) {
      const cached = hostsCache.find((h) => h.id === hostId);
      if (cached) return cached;
    }

    const allHosts = await fetchHosts();
    const host = allHosts.find((h) => h.id === hostId);
    return host || null;
  } catch (err) {
    console.error('fetchHostById error:', err);
    const fallback = getHostFromCache(hostId);
    return fallback ?? null;
  }
}

export function invalidateCache(): void {
  hostsCache = null;
  cacheTimestamp = null;
}

export async function preloadCache(): Promise<void> {
  await fetchHosts();
}
