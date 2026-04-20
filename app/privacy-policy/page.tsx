import type { Metadata } from "next";
import PrivacyPolicyContent from "./PrivacyPolicyContent";

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
  return (
    <main>
      <PrivacyPolicyContent />
    </main>
  );
}
