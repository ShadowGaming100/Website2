import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "@/components/NoPrefetchLink";
import { categories, getCategory } from "@/lib/categories";
import { safeJsonLd } from "@/lib/safeJsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const url = `${process.env.APP_URL}/categories/${category.slug}`;
  const image = process.env.APP_URL + "/Src/Images/banner.png";
  return {
    title: category.title,
    description: category.description,
    keywords: [`free ${category.slug.replaceAll("-", " ")}`, "free hosting", "freehosts"],
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    alternates: { canonical: url },
    openGraph: { locale: "en_US", siteName: "FreeHosts", type: "website", url, title: category.title, description: category.description, images: [{ url: image, width: 1280, height: 720, alt: category.h1 }] },
    twitter: { card: "summary_large_image", title: category.title, description: category.description, images: [{ url: image, alt: category.h1 }], site: "@freehosts_", creator: "@freehosts_" },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const topic = category.name.toLowerCase();
  const url = `${process.env.APP_URL}/categories/${category.slug}`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: category.title,
    isPartOf: { "@id": `${process.env.APP_URL}/#website` },
    inLanguage: "en",
    description: category.description,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: category.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} />
      <Breadcrumbs
        siteUrl={process.env.APP_URL}
        items={[
          { name: "Free Hosting Directory", path: "/hosts" },
          { name: category.name, path: `/categories/${category.slug}` },
        ]}
      />
      <main className="wrap">
        <header className="external-page-header">
          <h1 className="external-page-title">{category.h1}</h1>
          <p className="external-page-subtitle">{category.description}</p>
          <p className="page-updated">Last updated: {category.updated}</p>
        </header>

        <div className="page-intro">
          {category.intro.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <h2 className="category-subtitle">How {topic} actually works</h2>
        <div className="category-prose">
          {category.howItWorks.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <h2 className="category-subtitle">Free vs paid: where the line really is</h2>
        <div className="category-prose">
          {category.freeVsPaid.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <h2 className="category-subtitle">Common mistakes and how to avoid them</h2>
        <ul className="host-check-list">
          {category.commonMistakes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2 className="category-subtitle">Getting started in five steps</h2>
        <ol className="host-check-list steps">
          {category.gettingStarted.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>

        <h2 className="category-subtitle">Frequently asked questions</h2>
        <div className="category-faq">
          {category.faq.map((item) => (
            <div className="category-faq-item" key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>

        <div className="category-cta">
          <Link className="btn primary" href="/hosts">Browse the free host directory</Link>
        </div>
      </main>
    </>
  );
}