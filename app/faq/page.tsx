import FaqClient from "./FaqClient";
import { getFaqItems } from "./data";
import Breadcrumbs from "@/components/Breadcrumbs";
import { safeJsonLd } from "../../lib/safeJsonLd";
import { pageMeta, webPageJsonLd } from "../../lib/pageMeta";

const DESCRIPTION =
  "Get answers to the most common questions about FreeHosts and free hosting services. Learn how to find, compare, and submit hosting providers.";
const SOCIAL_DESCRIPTION =
  "Get answers to the most common questions about FreeHosts and free hosting services.";

export const metadata = pageMeta({
  path: "/faq",
  title: "Free Hosting FAQ - Questions Answered",
  description: DESCRIPTION,
  ogTitle: "Free Hosting FAQ - FreeHosts",
  ogDescription: SOCIAL_DESCRIPTION,
  keywords: [
    "freehosts faq",
    "free hosting questions",
    "hosting directory help",
    "freehosts help",
    "free hosting guide",
  ],
  imageAlt: "FreeHosts FAQ - Common Questions About FreeHosts",
  twitterImageAlt: "FreeHosts FAQ - Common Questions About FreeHosts",
});

const faqItems = getFaqItems(process.env.EMAIL_DOMAIN as string);

const webPageSchema = webPageJsonLd(
  "/faq",
  "FAQ - Frequently Asked Questions About FreeHosts & Free Hosting",
  DESCRIPTION,
);

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
        dangerouslySetInnerHTML={{ __html: safeJsonLd(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
      />
      <Breadcrumbs siteUrl={process.env.APP_URL} items={[{ name: "FAQ", path: "/faq" }]} />
      <FaqClient emailDomain={process.env.EMAIL_DOMAIN as string} />
    </>
  );
}
