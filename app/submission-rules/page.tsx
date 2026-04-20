import type { Metadata } from "next";
import SubmissionRulesContent from "./SubmissionRulesContent";

export const metadata: Metadata = {
  title: "Hosting Submission Rules - FreeHosts",
  description: "Rules and guidelines for submitting hosting services to FreeHosts.",
  robots: "index, follow",
  alternates: {
    canonical: "https://freehosts.space/submission-rules",
  },
  openGraph: {
    siteName: "FreeHosts",
    type: "website",
    url: "https://freehosts.space/submission-rules",
    title: "Hosting Submission Rules - FreeHosts",
    description: "Rules and guidelines for submitting hosting services to FreeHosts.",
    images: ["https://freehosts.space/Src/Images/social-preview.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hosting Submission Rules - FreeHosts",
    description: "Rules and guidelines for submitting hosting services to FreeHosts.",
    images: ["https://freehosts.space/Src/Images/social-preview.png"],
  },
};

export default function SubmissionRulesPage() {
  return (
    <main className="wrap">
      <SubmissionRulesContent />
    </main>
  );
}
