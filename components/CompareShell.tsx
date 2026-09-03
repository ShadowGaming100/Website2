import Breadcrumbs from '@/components/Breadcrumbs';
import { safeJsonLd } from '../lib/safeJsonLd';
import FaqCta from './FaqCta';

// Shared shell for the comparison-style pages (was duplicated in
// vs/[slug] + alternatives/[slug]: WebPage JSON-LD + Breadcrumbs +
// main wrapper + faq-hero + faq-cta).
export default function CompareShell({
  pageUrl,
  name,
  description,
  dateModified,
  crumbs,
  heroTitle,
  heroLead,
  ctaTitle,
  ctaText,
  ctaButtons,
  children,
}: {
  pageUrl: string;
  name: string;
  description: string;
  dateModified?: string;
  crumbs: { name: string; path: string }[];
  heroTitle: string;
  heroLead: React.ReactNode;
  ctaTitle: string;
  ctaText: React.ReactNode;
  ctaButtons: { href: string; label: string; primary?: boolean }[];
  children: React.ReactNode;
}) {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    isPartOf: { '@id': `${process.env.APP_URL}/#website` },
    inLanguage: 'en',
    description,
    ...(dateModified ? { dateModified } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(webPageSchema) }} />
      <Breadcrumbs siteUrl={process.env.APP_URL} items={crumbs} />
      <main className="wrap about-content">
        <section className="faq-hero">
          <h1>{heroTitle}</h1>
          <p>{heroLead}</p>
        </section>
        {children}
        <FaqCta title={ctaTitle} text={ctaText} buttons={ctaButtons} />
      </main>
    </>
  );
}
