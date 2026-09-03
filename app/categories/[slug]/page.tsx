import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/categories";
import { pageMeta } from "@/lib/pageMeta";
import { safeJsonLd } from "@/lib/safeJsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqCta from "@/components/FaqCta";
import {
  AlertTriangle,
  Bot,
  Braces,
  CircleHelp,
  Database,
  FileCode,
  Gamepad2,
  GitBranch,
  Globe,
  LayoutTemplate,
  Rocket,
  Scale,
  Server,
  Terminal,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const categoryIcons: Record<string, LucideIcon> = {
  "free-website-hosting": Globe,
  "free-app-hosting": GitBranch,
  "free-game-server-hosting": Gamepad2,
  "free-discord-bot-hosting": Bot,
  "free-database-hosting": Database,
  "free-vps-hosting": Server,
  "free-nodejs-hosting": Braces,
  "free-python-hosting": Terminal,
  "free-static-site-hosting": FileCode,
  "free-wordpress-hosting": LayoutTemplate,
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return pageMeta({
    path: `/categories/${category.slug}`,
    title: category.title,
    description: category.description,
    keywords: [`free ${category.slug.replaceAll("-", " ")}`, "free hosting", "freehosts"],
    imageAlt: category.h1,
    twitterImageAlt: category.h1,
  });
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

  const sections: { icon: LucideIcon; title: string; body: React.ReactNode }[] = [
    {
      icon: Wrench,
      title: `How ${topic} actually works`,
      body: category.howItWorks.map((paragraph) => <p key={paragraph}>{paragraph}</p>),
    },
    {
      icon: Scale,
      title: "Free vs paid: where the line really is",
      body: category.freeVsPaid.map((paragraph) => <p key={paragraph}>{paragraph}</p>),
    },
    {
      icon: AlertTriangle,
      title: "Common mistakes and how to avoid them",
      body: (
        <ul className="host-check-list">
          {category.commonMistakes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    },
    {
      icon: Rocket,
      title: "Getting started in five steps",
      body: (
        <ol className="host-check-list steps">
          {category.gettingStarted.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ),
    },
    {
      icon: CircleHelp,
      title: "Frequently asked questions",
      body: (
        <div className="category-faq">
          {category.faq.map((item) => (
            <div className="category-faq-item" key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      ),
    },
  ];

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
          {sections.map((section) => (
            <section key={section.title} className="content-section">
              <div className="section-icon">
                <section.icon size={24} aria-hidden="true" />
              </div>
              <h2>{section.title}</h2>
              {section.body}
            </section>
          ))}
        </div>

        <FaqCta
          title="Ready to get started?"
          text="Browse verified providers in the FreeHosts directory and find the right free host for your project."
          buttons={[{ href: "/hosts", label: "Browse the free host directory", primary: true }]}
        />
      </main>
    </>
  );
}
