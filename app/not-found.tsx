import type { Metadata } from "next";
import Link from "@/components/NoPrefetchLink";

export const metadata: Metadata = {
  title: "404 - Page Not Found | FreeHosts",
  description: "The page you were looking for could not be found. Browse our free hosting directory or return to the homepage.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "404 - Page Not Found | FreeHosts",
    description: "The page you were looking for could not be found.",
    images: [
      {
        url: "https://freehosts.space/Src/Images/social-preview.png",
        width: 1280,
        height: 720,
        alt: "FreeHosts - Discover Free Hosting",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main className="wrap">
      <section className="error-hero">
        <div className="error-hero-icon">
          <i className="fa-solid fa-compass" />
        </div>
        <div className="error-card">
          <div className="error-bg-blob" />
          <h1 className="error-title">404 - Page not found</h1>
          <p className="error-message">
            We could not find the page you were looking for. It may have moved or
            the link might be broken.
          </p>
          <div className="error-actions">
            <Link className="btn primary" href="/">
              <i className="fa-solid fa-home" /> Back to Home
            </Link>
            <Link className="btn" href="/hosts">
              <i className="fa-solid fa-server" /> Browse Hosts
            </Link>
            <a className="btn ghost" href="mailto:support@freehosts.space">
              <i className="fa-solid fa-envelope" /> Report Issue
            </a>
            <a
              className="btn"
              href="https://discord.gg/QbeZ3b5CQd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-discord" /> Join Discord
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
