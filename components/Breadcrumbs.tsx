import { safeJsonLd } from "../lib/safeJsonLd";
import { breadcrumbSchema } from "../lib/breadcrumbs";

export default function Breadcrumbs({
  siteUrl,
  items,
}: {
  siteUrl?: string;
  items: { name: string; path: string }[];
}) {
  const base = siteUrl ?? "https://freehosts.eu";
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema(base, items)) }}
    />
  );
}