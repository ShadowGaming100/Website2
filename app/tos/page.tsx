import type { Metadata } from "next";
import TosContent from "./TosContent";

export const metadata: Metadata = {
  title: "Terms of Service - FreeHosts",
  description: "Terms of Service for FreeHosts - Free hosting directory and community.",
  robots: "index, follow",
  alternates: {
    canonical: "https://freehosts.space/tos",
  },
  openGraph: {
    locale: "en_US",
    siteName: "FreeHosts",
    type: "website",
    url: "https://freehosts.space/tos",
    title: "Terms of Service - FreeHosts",
    description: "Terms of Service for FreeHosts - Free hosting directory and community.",
    images: ["https://freehosts.space/Src/Images/social-preview.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - FreeHosts",
    description: "Terms of Service for FreeHosts - Free hosting directory and community.",
    images: ["https://freehosts.space/Src/Images/social-preview.png"],
  },
};

export default function TermsOfServicePage() {
  return (
    <main>
      <TosContent />
    </main>
  );
}
