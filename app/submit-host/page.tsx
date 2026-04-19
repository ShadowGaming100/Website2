import type { Metadata } from "next";
import ConstructionPage from "../../components/ConstructionPage";

export const metadata: Metadata = {
  title: "Submit Host Under Construction - FreeHosts",
  description:
    "The Submit Host page is currently under construction. Please check back later.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://freehosts.space/submit-host",
  },
  openGraph: {
    locale: "en_US",
    siteName: "FreeHosts",
    type: "website",
    url: "https://freehosts.space/submit-host",
    title: "Submit Host Under Construction - FreeHosts",
    description:
      "The Submit Host page is currently under construction. Please check back later.",
    images: [
      {
        url: "https://freehosts.space/Src/Images/social-preview.png",
        width: 1280,
        height: 720,
        alt: "FreeHosts - Submit Host Under Construction",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Submit Host Under Construction - FreeHosts",
    description:
      "The Submit Host page is currently under construction. Please check back later.",
    images: [
      {
        url: "https://freehosts.space/Src/Images/social-preview.png",
        alt: "FreeHosts - Submit Host Under Construction",
      },
    ],
    site: "@freehosts_",
    creator: "@freehosts_",
  },
};

export default function SubmitHostPage() {
  return (
    <ConstructionPage
      icon="fa-plus"
      title="Submit Host Under Construction"
      message="We're working hard to bring you our host submission form. This page is currently being built and will be available soon."
      progress={10}
    />
  );
}
