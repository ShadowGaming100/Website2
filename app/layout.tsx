import type { Metadata, Viewport } from "next";
import Link from "@/components/NoPrefetchLink";
import Script from "next/script";
import RouteInitializer from "../components/RouteInitializer";

import "./globals.css";
import "./css/styles.css";
import "./css/hosts.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://freehosts.space"),
  title: "FreeHosts - Free Hosting for Anything You Build",
  description:
    "Find reliable free hosting for websites, bots, apps, and Discord communities. Join our community directory to discover no-cost hosting solutions.",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    locale: "en_US",
    siteName: "FreeHosts",
    type: "website",
    url: "https://freehosts.space/",
    title: "FreeHosts - Free Hosting for Websites, Bots & Apps",
    description:
      "Find reliable free hosting for websites, bots, apps, and Discord communities. Join our community directory to discover no-cost hosting solutions.",
    images: [
      {
        url: "https://freehosts.space/Src/Images/social-preview.png",
        width: 1280,
        height: 720,
        alt: "FreeHosts - Discover Free Hosting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FreeHosts - Free Hosting for Websites, Bots & Apps",
    description:
      "Find reliable free hosting for websites, bots, apps, and Discord communities. Join our community directory to discover no-cost hosting solutions.",
    images: [
      {
        url: "https://freehosts.space/Src/Images/social-preview.png",
        alt: "FreeHosts - Discover Free Hosting",
      },
    ],
    site: "@freehosts_",
    creator: "@freehosts_",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#071028",
};

const submitLinks = [
  { href: "/submit-host", icon: "fa-plus", label: "Submit a Host" },
  { href: "/submit-layout", icon: "fa-pencil", label: "Submit Layout" },
  { href: "/submission-rules", icon: "fa-list-check", label: "Submission Rules" },
];

const resourceLinks = [
  { href: "/about", icon: "fa-circle-info", label: "About" },
  { href: "/staff", icon: "fa-users", label: "Staff" },
  { href: "/faq", icon: "fa-question-circle", label: "FAQ" },
  { href: "/server-rules", icon: "fa-shield", label: "Server Rules" },
  { href: "/other-free-hosts", icon: "fa-link", label: "Other Free Hosts" },
];

const legalLinks = [
  { href: "/tos", icon: "fa-file-contract", label: "Terms of Service" },
  { href: "/privacy-policy", icon: "fa-lock", label: "Privacy Policy" },
];

function Dropdown({
  icon,
  label,
  links,
}: {
  icon: string;
  label: string;
  links: { href: string; icon: string; label: string }[];
}) {
  return (
    <div className="nav-item">
      <span className="nav-link has-dropdown">
        <i className={`fa-solid ${icon}`} /> {label}
        <i className="fa-solid fa-chevron-down dropdown-arrow" />
      </span>
      <div className="dropdown-menu">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            <i className={`fa-solid ${link.icon}`} /> {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function SidebarDropdown({
  icon,
  label,
  links,
}: {
  icon: string;
  label: string;
  links: { href: string; icon: string; label: string }[];
}) {
  return (
    <div className="sidebar-dropdown">
      <button className="sidebar-dropdown-toggle" type="button">
        <i className={`fa-solid ${icon}`} />
        <span>{label}</span>
        <i className="fa-solid fa-chevron-down" />
      </button>
      <div className="sidebar-dropdown-menu">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            <i className={`fa-solid ${link.icon}`} /> {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const year = new Date().getFullYear();

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://font-awesome.icons.cdn.codelabworks.is-cool.dev/css/all.css"
        />
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="https://freehosts.space/sitemap.xml"
        />
      </head>
      <body>
        <RouteInitializer />
        <Script src="/Src/js/script.js" strategy="afterInteractive" />

        <header className="site-header">
          <div className="wrap header-inner">
            <button
              id="sidebarToggle"
              className="icon-btn mobile-only"
              aria-label="Open menu"
            >
              <i className="fa-solid fa-bars" />
            </button>

            <Link className="logo" href="/" aria-label="FreeHosts Home">
              <i className="fa-solid fa-hands-holding-circle" /> FreeHosts
            </Link>

            <nav className="nav" role="navigation" aria-label="Main">
              <div className="nav-item">
                <Link href="/hosts" className="nav-link">
                  <i className="fa-solid fa-server" /> Hosts
                </Link>
              </div>
              <div className="nav-item">
                <Link href="/#features" className="nav-link">
                  <i className="fa-solid fa-list-check" /> Features
                </Link>
              </div>
              <Dropdown icon="fa-upload" label="Submit Host" links={submitLinks} />
              <Dropdown icon="fa-book" label="Resources" links={resourceLinks} />
              <Dropdown icon="fa-gavel" label="Legal" links={legalLinks} />
            </nav>

            <div className="actions" id="headerActions">
              <button
                data-theme-toggle
                className="icon-btn"
                aria-pressed="false"
                aria-label="Toggle theme"
              >
                <i className="fa-solid fa-moon" />
              </button>
              <a
                className="btn primary"
                id="discordBtn"
                href="https://discord.gg/QbeZ3b5CQd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-discord" /> Join Discord
              </a>
            </div>
          </div>
        </header>

        <aside className="sidebar" id="sidebar" aria-hidden="true">
          <div className="sidebar-top">
            <Link className="logo" href="/">
              <i className="fa-solid fa-hands-holding-circle" /> FreeHosts
            </Link>
            <button id="sidebarClose" className="icon-btn" aria-label="Close menu">
              <i className="fa-solid fa-xmark" />
            </button>
          </div>

          <nav className="sidebar-nav" role="navigation">
            <Link href="/hosts" className="sidebar-link">
              <i className="fa-solid fa-server" /> Hosts
            </Link>
            <Link href="/#features" className="sidebar-link">
              <i className="fa-solid fa-list-check" /> Features
            </Link>
            <SidebarDropdown icon="fa-upload" label="Submit Host" links={submitLinks} />
            <SidebarDropdown icon="fa-book" label="Resources" links={resourceLinks} />
            <SidebarDropdown icon="fa-gavel" label="Legal" links={legalLinks} />
          </nav>

          <div className="sidebar-footer">
            <a
              className="btn primary full"
              id="discordBtnSidebar"
              href="https://discord.gg/QbeZ3b5CQd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-discord" /> Join Discord
            </a>
          </div>
        </aside>

        <div className="overlay" id="overlay" tabIndex={-1} aria-hidden="true" />

        {children}

        <footer className="site-footer">
          <div className="wrap footer-content">
            <div className="footer-section footer-brand">
              <div className="footer-logo">
                <i className="fa-solid fa-hands-holding-circle" />
                <span>FreeHosts</span>
              </div>
              <p className="footer-tagline">Discover free hosting that just works.</p>
              <div className="social-links">
                <a
                  href="https://discord.gg/QbeZ3b5CQd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                >
                  <i className="fa-brands fa-discord" />
                </a>
                <a
                  href="https://x.com/freehosts_"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <i className="fa-brands fa-twitter" />
                </a>
                <a
                  href="https://www.instagram.com/freehosts/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram" />
                </a>
                <a
                  href="https://github.com/freehostsofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <i className="fa-brands fa-github" />
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h4 className="footer-section-title">Explore</h4>
              <ul className="footer-list">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/hosts">Browse Hosts</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/staff">Our Team</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-section-title">Submit</h4>
              <ul className="footer-list">
                <li><Link href="/submit-host">Submit a Host</Link></li>
                <li><Link href="/submit-layout">Submit Layout</Link></li>
                <li><Link href="/submission-rules">Submission Rules</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-section-title">Legal</h4>
              <ul className="footer-list">
                <li><Link href="/tos">Terms of Service</Link></li>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/server-rules">Server Rules</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-section-title">Contact</h4>
              <ul className="footer-list">
                <li>
                  <a href="mailto:support@freehosts.space">
                    <i className="fa-solid fa-envelope" /> support@freehosts.space
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/QbeZ3b5CQd"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-discord" /> Join Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="wrap footer-bottom">
            <div className="copyright">
              © 2023-<span id="year">{year}</span> FreeHosts. All rights reserved.
            </div>
            <div className="footer-bottom-links">
              <Link href="/tos">Terms</Link>
              <span className="separator">•</span>
              <Link href="/privacy-policy">Privacy</Link>
              <span className="separator">•</span>
              <a href="mailto:support@freehosts.space">Contact</a>
            </div>
          </div>
        </footer>

        <div id="previewCard" className="preview-card" aria-hidden="true" />
      </body>
    </html>
  );
}
