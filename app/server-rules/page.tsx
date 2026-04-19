import type { Metadata } from "next";
import ConstructionPage from "../../components/ConstructionPage";

export const metadata: Metadata = {
  title: "Server Rules Under Construction - FreeHosts",
  description:
    "The Server Rules page is currently under construction. Please check back later.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://freehosts.space/server-rules",
  },
  openGraph: {
    locale: "en_US",
    siteName: "FreeHosts",
    type: "website",
    url: "https://freehosts.space/server-rules",
    title: "Server Rules Under Construction - FreeHosts",
    description:
      "The Server Rules page is currently under construction. Please check back later.",
    images: [
      {
        url: "https://freehosts.space/Src/Images/social-preview.png",
        width: 1280,
        height: 720,
        alt: "FreeHosts - Server Rules Under Construction",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Server Rules Under Construction - FreeHosts",
    description:
      "The Server Rules page is currently under construction. Please check back later.",
    images: [
      {
        url: "https://freehosts.space/Src/Images/social-preview.png",
        alt: "FreeHosts - Server Rules Under Construction",
      },
    ],
    site: "@freehosts_",
    creator: "@freehosts_",
  },
};

export default function ServerRulesPage() {
  return (
    <ConstructionPage
      icon="fa-shield"
      title="Server Rules Under Construction"
      message="We're working hard to bring you our complete server rules and guidelines. This page is currently being built and will be available soon."
      progress={20}
    />
  );
}
