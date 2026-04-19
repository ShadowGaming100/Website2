"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const inviteCode = "QbeZ3b5CQd";
const inviteUrl = `https://discord.gg/${inviteCode}`;

const commands = [
  {
    cmd: "npm start",
    output: `<span class="success">✓</span> Server initialized successfully

<span class="success">✓</span> Connected to FreeHosts Community

<span class="terminal-status">Status: <span class="status-online">Online</span><span class="status-cursor">▮</span></span>`,
  },
  {
    cmd: "freehosts --info",
    output: `<span class="info">╔══════════════════════════════╗
║     FreeHosts Directory      ║
╚══════════════════════════════╝</span>

<span class="success">✓</span> Community-curated hosting lists
<span class="success">✓</span> 100+ verified free hosting options
<span class="success">✓</span> Real user reviews & ratings

<span class="terminal-status">Status: <span class="status-online">Active</span><span class="status-cursor">▮</span></span>`,
  },
  {
    cmd: "freehosts search --category bots",
    output: `<span class="info">Searching directory...</span>

<span class="success">✓</span> Found 30+ Discord bot hosting providers
<span class="success">✓</span> Found 15+ Telegram bot hosts
<span class="success">✓</span> All entries community-verified

<span class="terminal-status">Status: <span class="status-online">Ready</span><span class="status-cursor">▮</span></span>`,
  },
  {
    cmd: "community --stats",
    output: `<span class="success">✓</span> 400+ active members joined

<span class="success">✓</span> 100+ hosting reviews published

<span class="success">✓</span> Platform updates daily

<span class="terminal-status">Status: <span class="status-online">Growing</span><span class="status-cursor">▮</span></span>`,
  },
];

type DiscordState = {
  name: string;
  status: string;
  count: string;
  showInvite: boolean;
};

function fetchWithTimeout(url: string, timeout = 7000) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeout);

  return fetch(url, { cache: "no-cache", signal: controller.signal }).finally(() => {
    window.clearTimeout(timer);
  });
}

export default function HomeClient() {
  const [terminalCommand, setTerminalCommand] = useState("");
  const [terminalOutput, setTerminalOutput] = useState("");
  const [discord, setDiscord] = useState<DiscordState>({
    name: "Discord",
    status: "Loading server info...",
    count: "-",
    showInvite: false,
  });

  useEffect(() => {
    let cancelled = false;
    let currentIndex = 0;
    let timer: number | undefined;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });

    const typeText = async (text: string, speed = 50) => {
      setTerminalCommand("");
      for (let i = 0; i < text.length; i += 1) {
        if (cancelled) return;
        setTerminalCommand(text.slice(0, i + 1));
        await sleep(speed);
      }
    };

    const runCommand = async () => {
      while (!cancelled) {
        const command = commands[currentIndex];
        setTerminalOutput("");
        await typeText(command.cmd, 60);
        await sleep(500);
        if (cancelled) return;
        setTerminalOutput(command.output);
        await sleep(4000);
        currentIndex = (currentIndex + 1) % commands.length;
        await sleep(1000);
      }
    };

    timer = window.setTimeout(runCommand, 1000);

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const setFallback = () => {
      setDiscord({
        name: "Discord",
        status: "Server info unavailable",
        count: "-",
        showInvite: false,
      });
    };

    const loadDiscord = async () => {
      try {
        const response = await fetchWithTimeout(
          `https://discord.com/api/v9/invites/${encodeURIComponent(inviteCode)}?with_counts=true&with_expiration=true`,
          8000,
        );
        if (!response.ok) throw new Error("Non-OK response");
        const data = await response.json();
        const count =
          data.approximate_member_count ??
          data.approximate_presence_count ??
          (Array.isArray(data.members) ? data.members.length : null);

        setDiscord({
          name: data.guild?.name || "Discord",
          status: count !== null ? "Live - join the server" : "Live server info",
          count: count !== null ? String(count) : "-",
          showInvite: true,
        });
      } catch {
        try {
          const response = await fetchWithTimeout(
            "https://discord.com/api/guilds/1221389187719102514/widget.json",
            6000,
          );
          if (!response.ok) throw new Error("Widget fetch failed");
          const data = await response.json();
          const count =
            data.presence_count ??
            (Array.isArray(data.members) ? data.members.length : null);

          setDiscord({
            name: data.name || "Discord",
            status: count !== null ? "Live - join the server" : "Live server info",
            count: count !== null ? String(count) : "-",
            showInvite: true,
          });
        } catch {
          setFallback();
        }
      }
    };

    loadDiscord();
  }, []);

  return (
    <main>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="blobs" aria-hidden="true">
          <div className="blob b1" />
          <div className="blob b2" />
          <div className="blob b3" />
        </div>

        <div className="wrap hero-inner">
          <div className="hero-left">
            <h1 id="hero-title" className="hero-title">
              Discover free hosting that just works.
              <span className="typed-wrap" aria-hidden="true">
                <span className="typed" id="typedText" />
                <span className="cursor" id="typedCursor">|</span>
              </span>
            </h1>
            <p className="lead">
              Community-curated directory - find reliable, zero-cost hosting for
              experiments, learning, or small projects.
            </p>

            <div className="hero-cta">
              <Link href="/about" className="btn large">
                <i className="fa-solid fa-circle-info" /> About FreeHosts
              </Link>
              <a className="btn ghost" id="joinCommunity" href={inviteUrl}>
                <i className="fa-solid fa-comments" /> Join the community
              </a>
            </div>

            <div className="hero-stats" aria-hidden="true">
              <div className="stat">
                <div className="num" id="hostsCount">100+</div>
                <div className="label">Hosts listed</div>
              </div>
              <div className="stat">
                <div className="num">400+</div>
                <div className="label">Community members</div>
              </div>
              <div className="stat">
                <div className="num">100+</div>
                <div className="label">Reviews</div>
              </div>
            </div>

            <div className="discord-widget" id="discordWidget" aria-live="polite">
              <div className="dw-row">
                <div className="dw-left">
                  <div className="dw-title" id="discordName">
                    <i className="fa-brands fa-discord" /> {discord.name}
                  </div>
                  <div className="dw-sub" id="discordStatus">{discord.status}</div>
                </div>
                <div className="dw-right">
                  <div className="dw-count" id="discordCount">{discord.count}</div>
                  {discord.showInvite ? (
                    <button
                      className="btn small"
                      id="discordInvite"
                      type="button"
                      onClick={() => window.open(inviteUrl, "_blank", "noopener")}
                    >
                      <i className="fa-solid fa-door-open" /> Join
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="hero-right" aria-hidden="true">
            <div className="terminal-3d" aria-hidden="true">
              <div className="terminal-header">
                <span className="term-dot red" />
                <span className="term-dot yellow" />
                <span className="term-dot green" />
                <div className="terminal-title">terminal@freehosts:~</div>
              </div>
              <div className="terminal-body" id="terminalBody">
                <div className="terminal-line">
                  <span className="terminal-prompt">user@freehosts:~$</span>
                  <span className="terminal-command" id="terminalCommand">
                    {terminalCommand}
                  </span>
                  <span className="terminal-cursor">_</span>
                </div>
                <div
                  className="terminal-output"
                  id="terminalOutput"
                  dangerouslySetInnerHTML={{ __html: terminalOutput }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section features wrap">
        <h2 className="section-title">Why people use FreeHosts</h2>
        <p className="section-sub">Quick highlights - no fluff.</p>
        <div className="cards-grid" aria-hidden="true">
          <article className="feature-card">
            <div className="icon"><i className="fa-solid fa-rocket" /></div>
            <h3>Fast discovery</h3>
            <p>Find hosts by use-case quickly - deploy a demo in minutes.</p>
          </article>
          <article className="feature-card">
            <div className="icon"><i className="fa-solid fa-hands-helping" /></div>
            <h3>Community tips</h3>
            <p>User-contributed reviews and sample setups to get you started.</p>
          </article>
          <article className="feature-card">
            <div className="icon"><i className="fa-solid fa-filter" /></div>
            <h3>Curated lists</h3>
            <p>Hand-curated, up-to-date listings so you do not waste time.</p>
          </article>
        </div>
      </section>

      <section
        id="what-is-free-hosting"
        className="section wrap"
        style={{ padding: "4rem 1rem", maxWidth: "900px", margin: "0 auto" }}
      >
        <h2 className="section-title">What is Free Hosting?</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
          Free hosting allows developers, students, and hobbyists to deploy websites,
          applications, Discord bots, and community projects without paying for server
          infrastructure. These services provide computing resources at no cost, making
          them ideal for learning, experimentation, and small-scale projects.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
          FreeHosts curates a comprehensive directory of verified free hosting providers.
          Our community reviews, staff recommendations, and detailed feature lists help
          you join the right hosting platform and find the most reliable options for your
          specific needs. Whether you need hosting lists for Discord bots or web apps,
          our community has you covered.
        </p>
        <h3 style={{ fontSize: "1.5rem", margin: "2rem 0 1rem" }}>
          Popular Free Hosting Categories
        </h3>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1rem" }}>
          <strong>Website Hosting:</strong> Deploy static sites, blogs, portfolios, and
          landing pages with providers that offer excellent performance through global
          CDN distribution. These services are ideal for frontend projects built with
          HTML, CSS, JavaScript, or modern frameworks.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1rem" }}>
          <strong>Application Hosting:</strong> Run Node.js, Python, Ruby, PHP, and other
          backend applications with full server environments. Perfect for APIs, web apps,
          microservices, and full-stack projects that require dynamic server-side processing.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1rem" }}>
          <strong>Discord Bot Hosting:</strong> Host Discord bots, Telegram bots, Twitter
          bots, and other automated services continuously. Many providers offer 24/7
          uptime with sufficient resources for small to medium bot projects that need
          constant availability. Join our community to discover hosting lists and features
          tailored for Discord developers.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
          <strong>Database Hosting:</strong> Free database services including PostgreSQL,
          MongoDB, MySQL, and Redis. Essential for applications requiring data persistence,
          user authentication, content management, and structured data storage without
          hosting costs.
        </p>
        <h3 style={{ fontSize: "1.5rem", margin: "2rem 0 1rem" }}>
          How to Choose Free Hosting - Join Our Community
        </h3>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1rem" }}>
          Consider your project requirements when selecting a hosting provider. Evaluate
          factors like storage limits, bandwidth allowances, computational resources,
          uptime guarantees, and deployment complexity. Read community reviews on
          FreeHosts and join our Discord to learn from other developers&apos; experiences
          with various hosting lists and features.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1rem" }}>
          Our staff regularly updates hosting lists and FAQ sections to help you make
          informed decisions. Join the FreeHosts community to access curated lists,
          participate in discussions, and get support from experienced developers who
          have tested these hosting solutions.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
          Most free hosting services have usage limitations but are generous enough for
          learning projects, prototypes, personal websites, Discord bots, and small
          community applications. As your project grows, many providers offer easy
          upgrade paths to paid tiers with enhanced features and resources.
        </p>
      </section>

      <section id="about-teaser" className="section about wrap">
        <h2 className="section-title">About FreeHosts</h2>
        <p className="section-sub">
          Built by people who love the web - a friendly place to discover hosting
          options at zero cost.{" "}
          <Link href="/about" className="btn ghost">
            <i className="fa-solid fa-circle-info" /> Read more
          </Link>
        </p>
      </section>
    </main>
  );
}
