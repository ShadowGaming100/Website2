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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  // Tiered Cache-Control. The OG image route sets its own directly on the
  // ImageResponse (most edge-sensitive route) — don't override it here.
  if (pathname === "/saved" || pathname.includes("/redirect/")) {
    response.headers.set("Cache-Control", "private, no-store");
  } else if (!pathname.startsWith("/hosts/og/")) {
    response.headers.set(
      "Cache-Control",
      pathname === "/hosts" || /^\/hosts\/[^/]+$/.test(pathname)
        ? "public, max-age=1800, s-maxage=43200, stale-while-revalidate=604800"
        : pathname === "/sitemap.xml"
          ? "public, max-age=0, s-maxage=3600, stale-while-revalidate=43200, no-transform"
          : "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=2592000",
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
