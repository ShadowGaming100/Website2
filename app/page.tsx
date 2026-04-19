import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "FreeHosts - Free Hosting for Anything You Build",
  description:
    "Find reliable free hosting for websites, bots, apps, and Discord communities. Join our community directory to discover no-cost hosting solutions.",
  alternates: {
    canonical: "https://freehosts.space/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://freehosts.space/#website",
      url: "https://freehosts.space/",
      name: "FreeHosts",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://freehosts.space/hosts?search={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://freehosts.space/#organization",
      name: "FreeHosts",
      url: "https://freehosts.space/",
      logo: "https://freehosts.space/Src/Images/icon.png",
      sameAs: [
        "https://x.com/freehosts_",
        "https://www.instagram.com/freehosts/",
        "https://github.com/freehostsofficial",
        "https://discord.gg/QbeZ3b5CQd",
      ],
      description:
        "FreeHosts is a community-curated directory of free hosting providers and services.",
    },
    {
      "@type": "WebPage",
      "@id": "https://freehosts.space/#homepage",
      url: "https://freehosts.space/",
      name: "FreeHosts - Discover Free Hosting",
      isPartOf: { "@id": "https://freehosts.space/#website" },
      inLanguage: "en",
      description:
        "FreeHosts helps developers, students, and makers discover and compare reliable free hosting for websites, bots, and more.",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeClient />
    </>
  );
}
