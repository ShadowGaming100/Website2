"use client";

import { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";

export default function HostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Trigger the script logic whenever the React route changes
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).initPageLogic) {
      // Small delay to ensure React has finished painting the new DOM
      setTimeout(() => {
        (window as any).initPageLogic();
      }, 100);
    }
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="/Src/css/styles.css" />
        <link rel="stylesheet" href="/Src/css/hosts.css" />
        <link
          rel="stylesheet"
          href="https://font-awesome.icons.cdn.codelabworks.is-cool.dev/css/all.css"
        />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="https://freehosts.space/sitemap.xml" />
      </head>
      <body>
        {/* Load script.js globally. 
            strategy="afterInteractive" loads it early but doesn't block parser. */}
        <Script src="/Src/js/script.js" strategy="afterInteractive" />
        {/* Overlay used by script.js */}
        <div id="overlay"></div>

        {/* Header */}
        <header className="site-header">
          <div className="wrap header-inner">
            <button
              id="sidebarToggle"
              className="icon-btn mobile-only"
              aria-label="Open menu"
            >
              <i className="fa-solid fa-bars" />
            </button>
            <Link href="/" className="logo">
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

              {/* Submit Host Dropdown */}
              <div className="nav-item">
                <span className="nav-link has-dropdown">
                  <i className="fa-solid fa-upload" /> Submit Host
                  <i className="fa-solid fa-chevron-down dropdown-arrow" />
                </span>
                {/* script.js handles hover/display via CSS, or you can add click logic if preferred. 
                    Standard CSS usually handles desktop dropdowns via :hover */}
                <div className="dropdown-menu">
                  <Link href="/submit-host"><i className="fa-solid fa-plus" /> Submit a Host</Link>
                  <Link href="/submit-layout"><i className="fa-solid fa-pencil" /> Submit Layout</Link>
                  <Link href="/submission-rules"><i className="fa-solid fa-list-check" /> Submission Rules</Link>
                </div>
              </div>

              {/* Resources Dropdown */}
              <div className="nav-item">
                <span className="nav-link has-dropdown">
                  <i className="fa-solid fa-book" /> Resources
                  <i className="fa-solid fa-chevron-down dropdown-arrow" />
                </span>
                <div className="dropdown-menu">
                  <Link href="/about"><i className="fa-solid fa-circle-info" /> About</Link>
                  <Link href="/staff"><i className="fa-solid fa-users" /> Staff</Link>
                  <Link href="/faq"><i className="fa-solid fa-question-circle" /> FAQ</Link>
                  <Link href="/server-rules"><i className="fa-solid fa-shield" /> Server Rules</Link>
                  <Link href="/other-free-hosts"><i className="fa-solid fa-link" /> Other Free Hosts</Link>
                </div>
              </div>

              {/* Legal Dropdown */}
              <div className="nav-item">
                <span className="nav-link has-dropdown">
                  <i className="fa-solid fa-gavel" /> Legal
                  <i className="fa-solid fa-chevron-down dropdown-arrow" />
                </span>
                <div className="dropdown-menu">
                  <Link href="/tos"><i className="fa-solid fa-file-contract" /> Terms of Service</Link>
                  <Link href="/privacy-policy"><i className="fa-solid fa-lock" /> Privacy Policy</Link>
                </div>
              </div>
            </nav>

            <div className="actions">
              {/* script.js listens for clicks on elements with [data-theme-toggle] */}
              <button
                className="icon-btn"
                data-theme-toggle
                aria-label="Toggle theme"
              >
                {/* The icon class is updated by script.js */}
                <i className="fa-solid fa-moon" />
              </button>
              <a
                className="btn primary"
                href="https://discord.gg/QbeZ3b5CQd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-discord" /> Join Discord
              </a>
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <aside className="sidebar" id="sidebar" aria-hidden="true">
          <div className="sidebar-top">
            <Link href="/" className="logo">
              <i className="fa-solid fa-hands-holding-circle" /> FreeHosts
            </Link>
            <button
              id="sidebarClose"
              className="icon-btn"
              aria-label="Close menu"
            >
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

            {/* Sidebar Dropdown: Submit Host */}
            <div className="sidebar-dropdown">
              <button className="sidebar-dropdown-toggle" type="button">
                <i className="fa-solid fa-upload" />
                <span>Submit Host</span>
                <i className="fa-solid fa-chevron-down" />
              </button>
              <div className="sidebar-dropdown-menu">
                <Link href="/submit-host"><i className="fa-solid fa-plus" /> Submit a Host</Link>
                <Link href="/submit-layout"><i className="fa-solid fa-pencil" /> Submit Layout</Link>
                <Link href="/submission-rules"><i className="fa-solid fa-list-check" /> Submission Rules</Link>
              </div>
            </div>

            {/* Sidebar Dropdown: Resources */}
            <div className="sidebar-dropdown">
              <button className="sidebar-dropdown-toggle" type="button">
                <i className="fa-solid fa-book" />
                <span>Resources</span>
                <i className="fa-solid fa-chevron-down" />
              </button>
              <div className="sidebar-dropdown-menu">
                <Link href="/about"><i className="fa-solid fa-circle-info" /> About</Link>
                <Link href="/staff"><i className="fa-solid fa-users" /> Staff</Link>
                <Link href="/faq"><i className="fa-solid fa-question-circle" /> FAQ</Link>
                <Link href="/server-rules"><i className="fa-solid fa-shield" /> Server Rules</Link>
                <Link href="/other-free-hosts"><i className="fa-solid fa-link" /> Other Free Hosts</Link>
              </div>
            </div>

            {/* Sidebar Dropdown: Legal */}
            <div className="sidebar-dropdown">
              <button className="sidebar-dropdown-toggle" type="button">
                <i className="fa-solid fa-gavel" />
                <span>Legal</span>
                <i className="fa-solid fa-chevron-down" />
              </button>
              <div className="sidebar-dropdown-menu">
                <Link href="/tos"><i className="fa-solid fa-file-contract" /> Terms of Service</Link>
                <Link href="/privacy-policy"><i className="fa-solid fa-lock" /> Privacy Policy</Link>
              </div>
            </div>
          </nav>
        </aside>

        <main>{children}</main>

        <footer className="site-footer">
             <div className="wrap">
                 <div id="copyright">© {new Date().getFullYear()} FreeHosts</div>
             </div>
        </footer>

        {/* Preview Card (Hidden by default, toggled by script.js) */}
        <div id="previewCard" className="preview-card" style={{ display: "none" }} aria-hidden="true"></div>

      </body>
    </html>
  );
}
