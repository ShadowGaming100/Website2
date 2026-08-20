import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://matomo.codelabworks.is-a.dev https://*.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://matomo.codelabworks.is-a.dev https://discord.com https://*.discord.com https://*.cloudflareinsights.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),
};

const CACHE_DEFAULT =
  "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=2592000";

const CACHE_HOSTS =
  "public, max-age=1800, s-maxage=43200, stale-while-revalidate=604800";

const CACHE_SITEMAP =
  "public, max-age=0, s-maxage=3600, stale-while-revalidate=43200, no-transform";

const CACHE_NO_STORE = "private, no-store";

function isHostsListingOrDetail(pathname: string): boolean {
  // Matches /hosts and /hosts/<slug> but NOT /hosts/og/* or
  // /hosts/<slug>/redirect/* (those are handled by their own routes below).
  if (pathname === "/hosts") return true;
  const parts = pathname.split("/").filter(Boolean); // e.g. ["hosts", "some-slug"]
  return (
    parts.length === 2 &&
    parts[0] === "hosts" &&
    parts[1] !== "og"
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Apply security headers to everything this middleware matches
  // (the matcher below already excludes _next/static, _next/image,
  // favicon.ico, and /api/* — mirroring next.config.ts's own exclusions).
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  // Cache-Control, tiered by route
  if (pathname === "/saved") {
    response.headers.set("Cache-Control", CACHE_NO_STORE);
  } else if (
    pathname.startsWith("/hosts/") &&
    pathname.includes("/redirect/")
  ) {
    response.headers.set("Cache-Control", CACHE_NO_STORE);
  } else if (pathname.startsWith("/hosts/og/")) {
    // The OG image route sets its own Cache-Control directly on the
    // ImageResponse (see app/hosts/og/[slug]/route.tsx) since it's the
    // most edge-runtime-sensitive route in the app. Don't override it
    // here — just leave security headers applied above.
  } else if (isHostsListingOrDetail(pathname)) {
    response.headers.set("Cache-Control", CACHE_HOSTS);
  } else if (pathname === "/sitemap.xml") {
    response.headers.set("Cache-Control", CACHE_SITEMAP);
  } else {
    response.headers.set("Cache-Control", CACHE_DEFAULT);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api routes (own caching/headers concerns)
     * - _next/static, _next/image (Next-managed, already correctly cached)
     * - favicon.ico
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
