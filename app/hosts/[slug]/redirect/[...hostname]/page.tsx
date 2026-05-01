export const runtime = 'edge';

import { notFound, redirect } from 'next/navigation';
import { fetchHostBySlug } from '../../../../../lib/cache';
import RedirectClient from './RedirectClient';

function extractDomain(urlOrPath: string): string {
  try {
    // If it's a full URL, parse it
    if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
      const url = new URL(urlOrPath);
      return url.hostname.toLowerCase();
    }
    
    // Otherwise, extract the domain from the path (first segment)
    const firstSegment = urlOrPath.split('/')[0].split('?')[0];
    return firstSegment.toLowerCase();
  } catch {
    return '';
  }
}

function isValidRedirect(hostnameOrPath: string, allowedLinks: string[]): boolean {
  const targetDomain = extractDomain(hostnameOrPath);
  
  if (!targetDomain) return false;
  
  // Extract domains from all allowed links — exact match only
  const allowedDomains = allowedLinks.map(link => extractDomain(link)).filter(Boolean);
  
  return allowedDomains.some(allowed => targetDomain === allowed);
}

function buildTargetUrl(hostnameSegments: string[]): string {
  const hostnameOrPath = hostnameSegments.join('/');
  
  if (hostnameOrPath.startsWith('http://') || hostnameOrPath.startsWith('https://')) {
    const url = new URL(hostnameOrPath);
    url.searchParams.set('ref', 'freehosts.space');
    return url.toString();
  }
  
  const hasQueryParams = hostnameOrPath.includes('?');
  const separator = hasQueryParams ? '&' : '?';
  return `https://${hostnameOrPath}${separator}ref=freehosts.space`;
}

type Props = { params: Promise<{ slug: string; hostname: string[] }> };

export default async function Page({ params }: Props) {
  const { slug, hostname: hostnameSegments } = await params;
  
  if (!slug || !hostnameSegments || hostnameSegments.length === 0) {
    notFound();
  }
  
  // Fetch the host to validate the redirect
  const host = await fetchHostBySlug(slug);
  
  if (!host) {
    notFound();
  }
  
  const hostnameOrPath = hostnameSegments.join('/');
  
  // Validate that the redirect URL is in the host's allowed links
  if (!isValidRedirect(hostnameOrPath, host.links)) {
    // Use a cookie-based flash message instead of a URL param to avoid
    // reflected parameter attacks (attacker crafting ?error= on any page)
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    cookieStore.set('fh_redirect_error', '1', {
      path: `/hosts/${slug}`,
      maxAge: 10,
      httpOnly: false, // needs to be readable by client JS
      sameSite: 'strict',
    });
    redirect(`/hosts/${slug}`);
  }
  
  const targetUrl = buildTargetUrl(hostnameSegments);
  const backUrl = `/hosts/${slug}`;
  
  return <RedirectClient targetUrl={targetUrl} hostnameOrPath={hostnameOrPath} backUrl={backUrl} />;
}
