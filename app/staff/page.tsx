import type { Metadata } from "next";
import StaffClient from "./StaffClient";

export const metadata: Metadata = {
  title: "Staff - FreeHosts",
  description:
    "Meet the FreeHosts team: owners, developers, moderators, and host publishers of this community-curated free hosting directory.",
  robots: "index, follow",
  alternates: {
    canonical: "https://freehosts.space/staff",
  },
  openGraph: {
    locale: "en_US",
    siteName: "FreeHosts",
    type: "website",
    url: "https://freehosts.space/staff",
    title: "Staff | FreeHosts",
    description:
      "Meet the FreeHosts team: owners, developers, moderators, and host publishers of this free hosting directory.",
    images: [
      {
        url: "https://freehosts.space/Src/Images/social-preview.png",
        width: 1280,
        height: 720,
        alt: "FreeHosts - Discover Free Hosting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Staff | FreeHosts",
    description:
      "Meet the FreeHosts team: owners, developers, moderators, and host publishers of this free hosting directory.",
    images: [
      {
        url: "https://freehosts.space/Src/Images/social-preview.png",
        alt: "FreeHosts - Discover Free Hosting",
      },
    ],
    site: "@freehosts_",
    creator: "@freehosts_",
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
      "@id": "https://freehosts.space/staff#webpage",
      url: "https://freehosts.space/staff",
      name: "Staff - FreeHosts",
      isPartOf: { "@id": "https://freehosts.space/#website" },
      inLanguage: "en",
      description:
        "Meet the FreeHosts team: owners, developers, moderators, and host publishers.",
    },
  ],
};

export default function StaffPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <StaffClient />
    </>
  );
}
