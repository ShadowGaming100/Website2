import type { Metadata } from "next";
import SubmitHostClient from "./SubmitHostClient";

export const metadata: Metadata = {
  title: "Submit a Host - FreeHosts",
  description:
    "Learn how to submit your hosting service to the FreeHosts directory. Review our submission rules and use our layout builder for a fast listing.",
  robots: "index, follow",
  alternates: {
    canonical: "https://freehosts.space/submit-host",
  },
  openGraph: {
    locale: "en_US",
    siteName: "FreeHosts",
    type: "website",
    url: "https://freehosts.space/submit-host",
    title: "Submit a Host to the FreeHosts Directory",
    description:
      "Join the community-curated directory of free hosting. Learn the submission process and get your host listed today.",
    images: [
      {
        url: "https://freehosts.space/Src/Images/social-preview.png",
        width: 1280,
        height: 720,
        alt: "FreeHosts - Submit a Host",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Submit a Host to FreeHosts",
    description:
      "Want to get your hosting service listed? Follow our guide and use our layout builder for a seamless submission experience.",
    images: ["https://freehosts.space/Src/Images/social-preview.png"],
    site: "@freehosts_",
    creator: "@freehosts_",
  },
};

export default function SubmitHostPage() {
  return <SubmitHostClient />;
}
