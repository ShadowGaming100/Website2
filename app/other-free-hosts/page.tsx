import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import { ExternalLink, Info, List } from "lucide-react";
import { DiscordIcon, type BrandIconComponent } from "../../components/BrandIcons";
import type { LucideIcon } from "lucide-react";
import { safeJsonLd } from "../../lib/safeJsonLd";
import { pageMeta, webPageJsonLd } from "../../lib/pageMeta";

const DESCRIPTION = "Discover other trusted platforms and directories that list free hosting services for websites, Minecraft servers, and applications. Curated by the FreeHosts community.";
const SOCIAL_DESCRIPTION = "Discover other trusted platforms and directories that list free hosting services for websites, Minecraft servers, and applications.";

export const metadata = pageMeta({
  path: "/other-free-hosts",
  title: "Other Free Hosting Platforms & Directories - FreeHosts",
  description: DESCRIPTION,
  ogDescription: SOCIAL_DESCRIPTION,
  keywords: ["other free hosting platforms", "free hosting directories", "free minecraft hosting list", "hosting resource list"],
  imageAlt: "FreeHosts - Other Free Hosting Platforms",
  twitterImageAlt: "FreeHosts - Other Free Hosting Platforms",
});

type ExternalHost = {
  image?: string;
  name: string;
  description: string;
  links: { href: string; icon: LucideIcon | BrandIconComponent; label: string }[];
};

const externalHosts: ExternalHost[] = [
  {
    image: "/Src/Images/free-minecraft-hostings.png",
    name: "Free Minecraft Hostings",
    description: "The best collection of free minecraft server hosting providers. Includings a tons of free minecraft hostings. Allow you to write your own experiences while using free hostings. Founded by the best handsome human in the entire world.",
    links: [
      { href: "https://freeminecrafthostings.com/", icon: ExternalLink, label: "Website" },
      { href: "https://discord.gg/sc2kauFE3D", icon: DiscordIcon, label: "Discord" },
    ],
  },
  {
    image: "/Src/Images/fmhl.png",
    name: "Free Minecraft Hosts List",
    description: "A comprehensive directory dedicated to free Minecraft server hosting providers, help you find the perfect host for your server.",
    links: [
      { href: "https://myuui.com/", icon: ExternalLink, label: "Website" },
      { href: "https://discord.gg/JzvVMZ9Zrm", icon: DiscordIcon, label: "Discord" },
    ],
  },
  {
    image: "/Src/Images/flhl.png",
    name: "Free Low Minecraft Hostings",
    description: "A specialized free hostings catalog which is intended for new and non-recommended hosting providers, with a brief description of reputation to warn against fraud.",
    links: [
      { href: "https://flhl.whiteik.xyz/", icon: ExternalLink, label: "Website" },
    ],
  },
];

const structuredData = webPageJsonLd(
  "/other-free-hosts",
  "Other Free Hosting Platforms & Directories - FreeHosts",
  SOCIAL_DESCRIPTION,
);

export default function OtherFreeHostsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }} />
      <Breadcrumbs siteUrl={process.env.APP_URL} items={[{ name: "Other Free Hosts", path: "/other-free-hosts" }]} />
      <main className="wrap">
        <div className="external-page-header">
          <h1 className="external-page-title">Other Free Hosting Platforms</h1>
          <p className="external-page-subtitle">Explore a curated collection of reliable platforms offering free hosting services for your websites, applications, and projects.</p>
        </div>

        <div className="external-info-banner">
          <Info size={18} className="external-info-banner-icon" aria-hidden="true" />
          <div className="external-info-banner-content">
            <h3>Important Information</h3>
            <p>The platforms listed below are independent services not managed by FreeHosts. We have included them as a helpful resource for our community. While we have carefully selected these options, we cannot guarantee their availability, quality, or reliability. Always review each platform terms of service before use.</p>
          </div>
        </div>

        <section className="external-category-section">
          <h2 className="external-category-title">
            <List size={18} aria-hidden="true" />
            Specialized Hosting Directories
          </h2>
          <p className="external-category-description">Comprehensive directories focused on specific types of hosting services.</p>

          <div className="external-hosts-grid">
            {externalHosts.map((host) => (
              <article className="external-host-card" key={host.name}>
                <div className="external-host-header">
                  <div className="external-host-icon-wrapper">
                    {host.image ? <Image src={host.image} alt={host.name} width={40} height={40} /> : null}
                  </div>
                  <h3 className="external-host-name">{host.name}</h3>
                </div>
                <p className="external-host-description">{host.description}</p>
                <div className="external-host-links">
                  {host.links.map((link) => (
                    <a key={link.href} href={link.href} className="external-host-link" target="_blank" rel="noopener noreferrer" aria-label={`${host.name} ${link.label}`}>
                      <link.icon size={16} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
