import type { Metadata } from "next";
import ServerRulesContent from "./ServerRulesContent";

export const metadata: Metadata = {
  title: "Server Rules - FreeHosts",
  description:
    "Read the official Discord server rules and community guidelines for FreeHosts. We maintain a safe, respectful, and productive environment for all members.",
  robots: "index, follow",
  alternates: {
    canonical: "https://freehosts.space/server-rules",
  },
  openGraph: {
    locale: "en_US",
    siteName: "FreeHosts",
    type: "website",
    url: "https://freehosts.space/server-rules",
    title: "Community Guidelines & Server Rules - FreeHosts",
    description:
      "Our official server rules ensure a positive experience for everyone in the FreeHosts community. Review them here.",
    images: [
      {
        url: "https://freehosts.space/Src/Images/social-preview.png",
        width: 1280,
        height: 720,
        alt: "FreeHosts - Server Rules",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FreeHosts Discord Server Rules",
    description:
      "All members must follow our community guidelines to remain part of the FreeHosts network. See the full list of 18 rules.",
    images: ["https://freehosts.space/Src/Images/social-preview.png"],
    site: "@freehosts_",
    creator: "@freehosts_",
  },
};

export default function ServerRulesPage() {
  return (
    <main className="wrap section">
      <ServerRulesContent />
    </main>
  );
}
