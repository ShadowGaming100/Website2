import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Other Free Hosting Platforms - FreeHosts",
  description:
    "Discover other platforms that provide free hosting services for websites, applications, and more.",
  robots: "index, follow",
  alternates: {
    canonical: "https://freehosts.space/other-free-hosts",
  },
  openGraph: {
    locale: "en_US",
    siteName: "FreeHosts",
    type: "website",
    url: "https://freehosts.space/other-free-hosts",
    title: "Other Free Hosting Platforms - FreeHosts",
    description:
      "Discover other platforms that provide free hosting services for websites, applications, and more.",
    images: [
      {
        url: "https://freehosts.space/Src/Images/social-preview.png",
        width: 1280,
        height: 720,
        alt: "FreeHosts - Other Free Hosting Platforms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Other Free Hosting Platforms - FreeHosts",
    description:
      "Discover other platforms that provide free hosting services for websites, applications, and more.",
    images: [
      {
        url: "https://freehosts.space/Src/Images/social-preview.png",
        alt: "FreeHosts - Other Free Hosting Platforms",
      },
    ],
    site: "@freehosts_",
    creator: "@freehosts_",
  },
};

const externalHosts = [
  {
    initials: "FMH",
    name: "Free Minecraft Hostings",
    description:
      "Curated collection of free hosting providers specifically for Minecraft servers featuring detailed reviews, comparisons, and community ratings with various configurations and performance options.",
    links: [
      {
        href: "https://freeminecrafthostings.com/",
        icon: "fa-solid fa-arrow-up-right-from-square",
        label: "Website",
      },
      {
        href: "https://discord.gg/sc2kauFE3D",
        icon: "fa-brands fa-discord",
        label: "Discord",
      },
    ],
  },
  {
    image: "/Src/Images/fmhl.png",
    name: "Free Minecraft Hosts List",
    description:
      "A comprehensive directory dedicated to free Minecraft server hosting providers, help you find the perfect host for your server.",
    links: [
      {
        href: "https://myuui.com/",
        icon: "fa-solid fa-arrow-up-right-from-square",
        label: "Website",
      },
      {
        href: "https://discord.gg/JzvVMZ9Zrm",
        icon: "fa-brands fa-discord",
        label: "Discord",
      },
    ],
  },
  {
    initials: "FLMH",
    name: "Free Low Minecraft Hostings",
    description:
      "Specialized directory for low-resource Minecraft hosting solutions that are optimized for budget-conscious users.",
    links: [
      {
        href: "https://flhl.whiteik.xyz/",
        icon: "fa-solid fa-arrow-up-right-from-square",
        label: "Website",
      },
    ],
  },
];

export default function OtherFreeHostsPage() {
  return (
    <main className="wrap">
      <div className="external-page-header">
        <h1 className="external-page-title">Other Free Hosting Platforms</h1>
        <p className="external-page-subtitle">
          Explore a curated collection of reliable platforms offering free hosting
          services for your websites, applications, and projects.
        </p>
      </div>

      <div className="external-info-banner">
        <i className="fa-solid fa-circle-info external-info-banner-icon" />
        <div className="external-info-banner-content">
          <h3>Important Information</h3>
          <p>
            The platforms listed below are independent services not managed by
            FreeHosts. We have included them as a helpful resource for our community.
            While we have carefully selected these options, we cannot guarantee their
            availability, quality, or reliability. Always review each platform terms of
            service before use.
          </p>
        </div>
      </div>

      <section className="external-category-section">
        <h2 className="external-category-title">
          <i className="fa-solid fa-list-ul" />
          Specialized Hosting Directories
        </h2>
        <p className="external-category-description">
          Comprehensive directories focused on specific types of hosting services.
        </p>

        <div className="external-hosts-grid">
          {externalHosts.map((host) => (
            <article className="external-host-card" key={host.name}>
              <div className="external-host-header">
                <div className="external-host-icon-wrapper">
                  {host.image ? (
                    <Image src={host.image} alt={host.name} width={40} height={40} />
                  ) : (
                    host.initials
                  )}
                </div>
                <h3 className="external-host-name">{host.name}</h3>
              </div>
              <p className="external-host-description">{host.description}</p>
              <div className="external-host-links">
                {host.links.map((link) => (
                  <a
                    href={link.href}
                    className="external-host-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${host.name} ${link.label}`}
                    key={link.href}
                  >
                    <i className={link.icon} />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
