import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";

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
  const content = readFileSync(
    path.join(process.cwd(), "app", "submission-rules", "submission-rules-content.html"),
    "utf8",
  );

  return (
    <main className="wrap">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}
