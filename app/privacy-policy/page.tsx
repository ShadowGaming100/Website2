import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";

export const metadata: Metadata = {
  title: "Privacy Policy - FreeHosts",
  description: "Privacy Policy for FreeHosts - Free hosting directory and community.",
  robots: "index, follow",
  alternates: {
    canonical: "https://freehosts.space/privacy-policy",
  },
  openGraph: {
    locale: "en_US",
    siteName: "FreeHosts",
    type: "website",
    url: "https://freehosts.space/privacy-policy",
    title: "Privacy Policy - FreeHosts",
    description: "Privacy Policy for FreeHosts - Free hosting directory and community.",
    images: ["https://freehosts.space/Src/Images/social-preview.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - FreeHosts",
    description: "Privacy Policy for FreeHosts - Free hosting directory and community.",
    images: ["https://freehosts.space/Src/Images/social-preview.png"],
  },
};

export default function PrivacyPolicyPage() {
  const content = readFileSync(
    path.join(process.cwd(), "app", "privacy-policy", "privacy-policy-content.html"),
    "utf8",
  );

  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}
