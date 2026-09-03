import { safeJsonLd } from "../lib/safeJsonLd";

function breadcrumbSchema(siteUrl: string, crumbs: { name: string; path: string }[]) {
  const itemListElement = [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    ...crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: c.name,
      item: `${siteUrl}${c.path}`,
    })),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

export default function Breadcrumbs({
  siteUrl,
  items,
}: {
  siteUrl: string;
  items: { name: string; path: string }[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema(siteUrl, items)) }}
    />
  );
}