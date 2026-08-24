/** @type {import('next').NextConfig} */
//
// Security headers, CSP, and Cache-Control are now defined in
// middleware.ts (project root) instead of here.
//
// Reason: four routes in this app (/hosts, /hosts/[slug],
// /hosts/[slug]/redirect/[...hostname], /hosts/og/[slug]) run on
// `export const runtime = 'edge'`, and edge routes deployed to Cloudflare
// do not reliably inherit headers set via next.config.ts's headers()
// function — this was confirmed empirically on the OG image route, which
// had no Cache-Control at all until it was set directly on the response.
// middleware.ts runs as a genuine Cloudflare-native execution point
// regardless of route runtime, so it's the single source of truth for
// headers now. Keeping the logic in one place (rather than here AND in
// middleware.ts) avoids the two ever drifting out of sync.
//
// See middleware.ts for the actual header values and per-route Cache-Control
// tiers, and app/hosts/og/[slug]/route.tsx for the OG route's own
// self-contained Cache-Control (set directly on the ImageResponse, since
// that route is the most edge-sensitive one in the app).
const nextConfig = {
  // ponytail: on Cloudflare there's no sharp/Image Resizing behind
  // /_next/image, so it just re-serves the ORIGINAL file (uncacheable,
  // 240 KB for a w=64 request). Serving static URLs directly lets the
  // CDN and browser actually cache. Revisit only if Image Resizing gets enabled.
  images: { unoptimized: true },
};
module.exports = nextConfig;
