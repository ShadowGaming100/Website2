import type { Metadata } from "next";
import Link from "@/components/NoPrefetchLink";

export const metadata: Metadata = {
  title: "About - FreeHosts",
  description: "About FreeHosts - our mission, team, and how to contribute.",
  robots: "index, follow",
  alternates: {
    canonical: "https://freehosts.space/about",
  },
  openGraph: {
    locale: "en_US",
    siteName: "FreeHosts",
    type: "website",
    url: "https://freehosts.space/about",
    title: "About - FreeHosts",
    description:
      "A community-driven directory to discover, compare and review free hosting services.",
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
    title: "About - FreeHosts",
    description:
      "A community-driven directory to discover, compare and review free hosting services.",
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://freehosts.space/#website",
      url: "https://freehosts.space/",
      name: "FreeHosts",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://freehosts.space/hosts?search={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://freehosts.space/#organization",
      name: "FreeHosts",
      url: "https://freehosts.space/",
      logo: "https://freehosts.space/Src/Images/icon.png",
      sameAs: [
        "https://x.com/freehosts_",
        "https://www.instagram.com/freehosts/",
        "https://github.com/freehostsofficial",
        "https://discord.gg/QbeZ3b5CQd",
      ],
      description:
        "FreeHosts is a community-curated directory of free hosting providers and services.",
    },
    {
      "@type": "WebPage",
      "@id": "https://freehosts.space/about#webpage",
      url: "https://freehosts.space/about",
      name: "About - FreeHosts",
      isPartOf: { "@id": "https://freehosts.space/#website" },
      inLanguage: "en",
      description: "About FreeHosts - our mission, team, and how to contribute.",
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="wrap">
        <section className="about-hero">
          <div className="about-hero-icon">
            <i className="fa-solid fa-heart" />
          </div>
          <h1>About FreeHosts</h1>
          <p>
            A community-driven directory helping developers, students, and makers
            discover reliable free hosting for their projects.
          </p>
        </section>

        <div className="about-stats">
          <div className="stat-card">
            <div className="stat-number">100+</div>
            <div className="stat-label">Hosting Providers</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">400+</div>
            <div className="stat-label">Community Members</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">40+</div>
            <div className="stat-label">User Reviews</div>
          </div>
        </div>

        <div className="about-content">
          <section className="content-section">
            <div className="section-icon">
              <i className="fa-solid fa-bullseye" />
            </div>
            <h2>Our Mission</h2>
            <p>
              FreeHosts was created to help hobbyists, students, and makers quickly
              find free hosting options for small projects and learning. We believe
              everyone should have access to the tools they need to bring their ideas
              to life without financial barriers.
            </p>
            <p>
              Our focus is on providing clear, accurate listings and
              community-contributed insights so people can make informed decisions
              and get their projects online fast. We are committed to maintaining a
              trustworthy, up-to-date directory that serves the community.
            </p>
          </section>

          <section className="content-section">
            <div className="section-icon">
              <i className="fa-solid fa-star" />
            </div>
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <i className="fa-solid fa-users" />
                </div>
                <h3>Community First</h3>
                <p>
                  Built by the community, for the community. Every contribution
                  matters and helps others succeed.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <i className="fa-solid fa-shield-check" />
                </div>
                <h3>Transparency</h3>
                <p>
                  Honest reviews, clear information, and open communication about our
                  processes and decisions.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <i className="fa-solid fa-bolt" />
                </div>
                <h3>Quality Over Quantity</h3>
                <p>
                  We carefully curate listings to ensure every host meets our standards
                  for reliability and usefulness.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <i className="fa-solid fa-hand-holding-heart" />
                </div>
                <h3>Free & Accessible</h3>
                <p>
                  Our directory will always be free. No paywalls, no premium tiers,
                  just helpful resources for everyone.
                </p>
              </div>
            </div>
          </section>

          <section className="content-section">
            <div className="section-icon">
              <i className="fa-solid fa-hands-helping" />
            </div>
            <h2>How You Can Help</h2>
            <p>
              FreeHosts thrives because of community contributions. Here is how you can
              make a difference:
            </p>
            <ul>
              <li>
                <strong>Suggest Hosts:</strong> Join our Discord and post in the
                &quot;add-host&quot; channel with provider details, features, and links.
              </li>
              <li>
                <strong>Share Reviews:</strong> Help others by sharing your experiences
                with different hosting providers.
              </li>
              <li>
                <strong>Report Issues:</strong> Let us know if you find outdated
                information or broken links so we can keep listings accurate.
              </li>
              <li>
                <strong>Share Tips:</strong> Post your setup guides, tips, and best
                practices to help newcomers get started.
              </li>
              <li>
                <strong>Spread the Word:</strong> Tell others about FreeHosts to help
                grow our community.
              </li>
            </ul>
          </section>

          <section className="content-section">
            <div className="section-icon">
              <i className="fa-solid fa-book" />
            </div>
            <h2>Our Story</h2>
            <p>
              FreeHosts started as a simple idea: make it easier for people to find
              reliable free hosting without endless searching and comparing.
            </p>
            <div className="timeline">
              <div className="timeline-item">
                <h4>The Beginning</h4>
                <p>
                  Started as a small list shared among friends to help each other find
                  free hosting for hobby projects.
                </p>
              </div>
              <div className="timeline-item">
                <h4>Growing Community</h4>
                <p>
                  Word spread, and more people joined to share their experiences and
                  suggestions, forming the foundation of our community.
                </p>
              </div>
              <div className="timeline-item">
                <h4>Launch of Directory</h4>
                <p>
                  Built a proper directory website with reviews, ratings, and detailed
                  information to serve the growing community better.
                </p>
              </div>
              <div className="timeline-item">
                <h4>Today</h4>
                <p>
                  A thriving community of 400+ members with 100+ curated hosting
                  providers, helping thousands find the right hosting solution.
                </p>
              </div>
            </div>
          </section>

          <section className="content-section">
            <div className="section-icon">
              <i className="fa-solid fa-envelope" />
            </div>
            <h2>Get In Touch</h2>
            <p>
              Have questions, suggestions, or want to get involved? We would love to
              hear from you!
            </p>
            <div className="contact-cards">
              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fa-brands fa-discord" />
                </div>
                <h3>Join Discord</h3>
                <p>
                  Connect with the community, get help, and stay updated with the latest
                  additions.
                </p>
                <a
                  href="https://discord.gg/QbeZ3b5CQd"
                  className="contact-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-discord" />
                  Join Server
                </a>
              </div>
              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fa-solid fa-envelope" />
                </div>
                <h3>Email Us</h3>
                <p>
                  For general inquiries, partnerships, or formal communications, reach
                  out via email.
                </p>
                <a href="mailto:support@freehosts.space" className="contact-btn">
                  <i className="fa-solid fa-envelope" />
                  Send Email
                </a>
              </div>
            </div>
          </section>
        </div>

        <div className="team-cta">
          <h2>Meet Our Team</h2>
          <p>
            Learn more about the volunteers who keep FreeHosts running and discover
            opportunities to join us.
          </p>
          <Link href="/staff" className="team-cta-btn">
            <i className="fa-solid fa-users" />
            View Team
          </Link>
        </div>
      </main>
    </>
  );
}
