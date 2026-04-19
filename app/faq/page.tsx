import type { Metadata } from "next";
import FaqClient from "./FaqClient";
import { faqItems } from "./data";

export const metadata: Metadata = {
  title: "FAQ - FreeHosts | Common Questions About Free Hosting",
  description:
    "Find answers to frequently asked questions about FreeHosts and free hosting services. Get help with your hosting journey.",
  robots: "index, follow",
  alternates: {
    canonical: "https://freehosts.space/faq",
  },
  openGraph: {
    locale: "en_US",
    siteName: "FreeHosts",
    type: "website",
    url: "https://freehosts.space/faq",
    title: "FAQ - FreeHosts | Common Questions About Free Hosting",
    description:
      "Find answers to frequently asked questions about FreeHosts and free hosting services.",
    images: [
      {
        url: "https://freehosts.space/Src/Images/social-preview.png",
        width: 1280,
        height: 720,
        alt: "FreeHosts FAQ - Common Questions About FreeHosts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - FreeHosts | Common Questions About Free Hosting",
    description:
      "Find answers to frequently asked questions about FreeHosts and free hosting services.",
    images: [
      {
        url: "https://freehosts.space/Src/Images/social-preview.png",
        alt: "FreeHosts FAQ - Common Questions About FreeHosts",
      },
    ],
    site: "@freehosts_",
    creator: "@freehosts_",
  },
};

const websiteSchema = {
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
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient />
    </>
  );
}
