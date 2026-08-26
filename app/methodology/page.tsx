import type { Metadata } from "next";
import Link from "@/components/NoPrefetchLink";
import Breadcrumbs from "@/components/Breadcrumbs";
import { safeJsonLd } from "../../lib/safeJsonLd";
import { ClipboardCheck, ListChecks, ThumbsUp, RefreshCw, ShieldAlert, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "How We Review Free Hosting Providers",
  description:
    "FreeHosts' editorial methodology: how hosts are submitted and curated, what we verify on every listing, how community votes work, and when a provider gets removed.",
  keywords: [
    "freehosts methodology",
    "how we review hosting",
    "free hosting reviews",
    "hosting directory standards",
  ],
  alternates: {
    canonical: process.env.APP_URL + "/methodology",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const url = process.env.APP_URL + "/methodology";

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${url}#webpage`,
  url,
  name: "How We Review Free Hosting Providers",
  isPartOf: { "@id": `${process.env.APP_URL}/#website` },
  inLanguage: "en",
  description:
    "The FreeHosts editorial methodology: submissions, curator checks, community voting, and listing removal policy.",
};

export default function MethodologyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(webPageSchema) }} />
      <Breadcrumbs siteUrl={process.env.APP_URL} items={[{ name: "How We Review", path: "/methodology" }]} />
      <main className="wrap about-content">
        <section className="faq-hero">
          <h1>How We Review Free Hosting Providers</h1>
          <p>
            FreeHosts is a curated directory, not an automated scraper. Every listing passes through the same pipeline:
            community submission, volunteer curation, structured specs, and ongoing community voting. This page explains
            exactly how that works, so you can judge our listings with full context.
          </p>
        </section>

        <section className="content-section">
          <div className="section-icon"><ClipboardCheck size={24} aria-hidden="true" /></div>
          <h2>How a host gets listed</h2>
          <p>
            Providers enter the directory through <Link href="/submit-host">community submission</Link>, either by users or
            by the hosts themselves. Every submission is checked against our{" "}
            <Link href="/submission-rules">submission rules</Link> before it goes live: the service must genuinely offer a
            free tier, publish clear information about its features and limits, and be reachable through a working website.
            Submissions that fail these checks are rejected; submissions that hide costs or misrepresent their plans are
            declined outright.
          </p>
        </section>

        <section className="content-section">
          <div className="section-icon"><ListChecks size={24} aria-hidden="true" /></div>
          <h2>What we record on every listing</h2>
          <p>
            Each profile standardises the provider&apos;s published free-tier information so listings are comparable:
          </p>
          <ul className="host-check-list">
            <li>Free plan specifications — CPU allocation, RAM, and storage, taken from the provider&apos;s own plan pages.</li>
            <li>Supported languages and runtimes, plus target use cases such as websites, Discord bots, game servers, apps, or databases.</li>
            <li>Current status (online or closed), based on provider announcements and community reports.</li>
            <li>Direct links to the provider&apos;s website, and any limits or idle policies they document.</li>
          </ul>
        </section>

        <section className="content-section" id="votes">
          <div className="section-icon"><ThumbsUp size={24} aria-hidden="true" /></div>
          <h2>How community reviews work</h2>
          <p>
            The approval percentage shown on each listing comes from positive/negative reviews submitted by members of our{" "}
            <a href="https://discord.gg/QbeZ3b5CQd" target="_blank" rel="noopener noreferrer">Discord community</a>. Reviews
            reflect real users&apos; experiences with a host — uptime, support, and whether the free plan delivers what it
            promises. They are opinions from the community, not lab benchmarks, which is why we label them as community reviews rather
            than expert ratings.
          </p>
          <p>
            Every listing with at least one community review displays its score publicly, both on the page and as a star
            rating in search results. The more reviews a listing gathers, the more reliable that score becomes — treat a
            score built on two or three reviews as an early signal rather than a verdict, and check the raw up/down counts
            shown alongside it. Newer listings therefore show weaker signals: not because a host is untested, but
            because its sample is still small.
          </p>
        </section>

        <section className="content-section">
          <div className="section-icon"><RefreshCw size={24} aria-hidden="true" /></div>
          <h2>Keeping listings current</h2>
          <p>
            Free tiers change constantly: RAM gets cut, idle policies tighten, services shut down. The community flags
            outdated or inaccurate listings in our Discord server, and curators correct the listing or mark the provider
            closed. Each listing shows the date the provider was added to the directory, and the status badge reflects its
            present state. If you spot something wrong on a listing, report it in the Discord — corrections usually land
            within days.
          </p>
        </section>

        <section className="content-section">
          <div className="section-icon"><ShieldAlert size={24} aria-hidden="true" /></div>
          <h2>When a provider is removed</h2>
          <p>
            Listings are removed when a provider shuts down, drops its free tier entirely, or turns out to be misleading
            users — hidden paid requirements, fake specs, or predatory data practices reported by the community. Removal
            decisions are made by the curator team, and the reasoning can be discussed openly in the Discord.
          </p>
        </section>

        <section className="content-section">
          <div className="section-icon"><Scale size={24} aria-hidden="true" /></div>
          <h2>Honest limits of this methodology</h2>
          <p>
            We do not run long-term benchmark rigs or receive compensation for listings — the directory is free to browse,
            has no paid placements, and no affiliate links. What we offer instead is standardised, comparable information
            plus the collective experience of an active community. That combination is good at catching dead services and
            broken promises quickly; it is less precise than a professional test lab for measuring exact performance. Use
            the directory to shortlist, then validate anything critical yourself before committing a production project.
          </p>
        </section>

        <div className="faq-cta">
          <h2>Ready to find a host?</h2>
          <p>Browse the directory and compare verified free hosting providers side by side.</p>
          <div className="faq-cta-buttons">
            <Link className="faq-cta-btn primary" href="/hosts">Browse the free host directory</Link>
          </div>
        </div>
      </main>
    </>
  );
}
