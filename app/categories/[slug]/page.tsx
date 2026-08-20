import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "@/components/NoPrefetchLink";
import { categories, getCategory } from "@/lib/categories";
import { safeJsonLd } from "@/lib/safeJsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  AlertTriangle,
  Bot,
  CircleHelp,
  Database,
  Gamepad2,
  GitBranch,
  Globe,
  Rocket,
  Scale,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const categoryIcons: Record<string, LucideIcon> = {
  "free-website-hosting": Globe,
  "free-app-hosting": GitBranch,
  "free-game-server-hosting": Gamepad2,
  "free-discord-bot-hosting": Bot,
  "free-database-hosting": Database,
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

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
  const HeroIcon = categoryIcons[category.slug] ?? Globe;

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
        <section className="faq-hero">
          <div className="faq-hero-icon">
            <HeroIcon size={40} aria-hidden="true" />
          </div>
          <h1>{category.h1}</h1>
          <p>{category.description}</p>
          <p className="page-updated">Last updated: {category.updated}</p>
        </section>

        <div className="about-content">
          <section className="content-section">
            <div className="section-icon">
              <Wrench size={24} aria-hidden="true" />
            </div>
            <h2>How {topic} actually works</h2>
            {category.howItWorks.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section className="content-section">
            <div className="section-icon">
              <Scale size={24} aria-hidden="true" />
            </div>
            <h2>Free vs paid: where the line really is</h2>
            {category.freeVsPaid.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section className="content-section">
            <div className="section-icon">
              <AlertTriangle size={24} aria-hidden="true" />
            </div>
            <h2>Common mistakes and how to avoid them</h2>
            <ul className="host-check-list">
              {category.commonMistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="content-section">
            <div className="section-icon">
              <Rocket size={24} aria-hidden="true" />
            </div>
            <h2>Getting started in five steps</h2>
            <ol className="host-check-list steps">
              {category.gettingStarted.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section className="content-section">
            <div className="section-icon">
              <CircleHelp size={24} aria-hidden="true" />
            </div>
            <h2>Frequently asked questions</h2>
            <div className="category-faq">
              {category.faq.map((item) => (
                <div className="category-faq-item" key={item.q}>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="faq-cta">
          <h2>Ready to get started?</h2>
          <p>Browse verified providers in the FreeHosts directory and find the right free host for your project.</p>
          <div className="faq-cta-buttons">
            <Link className="faq-cta-btn primary" href="/hosts">Browse the free host directory</Link>
          </div>
        </div>
      </main>
    </>
  );
}