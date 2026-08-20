export type Category = {
  slug: string;
  name: string;
  title: string;
  h1: string;
  description: string;
  updated: string;
  intro: string[];
  howItWorks: string[];
  freeVsPaid: string[];
  commonMistakes: string[];
  gettingStarted: string[];
  faq: { q: string; a: string }[];
};

export const categories: Category[] = [
  {
    slug: "free-website-hosting",
    name: "Website Hosting",
    title: "Free Website Hosting: What It Is, Limits & How to Choose (2026) | FreeHosts",
    h1: "Free Website Hosting: The Complete, Honest Guide",
    description:
      "Is free website hosting worth it in 2026? How free tiers actually work, their real limits (ads, subdomains, idle timeouts), the differences between static and dynamic hosting, and a practical checklist for choosing the right provider.",
    updated: "2026-08-20",
    intro: [
      "Every developer starts somewhere, and for most the first step is a free website. The question that actually matters is not \"is free good enough?\" but \"which free tier fits my project?\". This guide covers how free web hosting works, where the limits really are, and how to pick a provider without getting burned.",
      "Free website hosting is a hosting plan with a zero monthly cost, maintained by a provider that covers its expenses through ads, paid upgrades, or resource limits. What you trade away is control: your storage, bandwidth, and often your domain name are constrained by the provider's business model.",
      "Free hosting works well for static sites, portfolios, blogs, and landing pages, and poorly for big traffic or heavy backend workloads. The realistic ceiling is tens of thousands of page views a month on most plans, with CPU and RAM tight enough that runtimes like PHP or Node.js must be used in moderation.",
    ],
    howItWorks: [
      "When you sign up for free web hosting you rent a slice of a shared server. The provider runs hundreds of accounts on one machine and keeps costs down by capping each account's storage, bandwidth, CPU, and memory. Your site lives on a subdomain of the provider (yoursite.provider.com) unless the plan lets you attach your own domain.",
      "Because the provider's margin is zero, every free plan has an economic valve. Common ones are ads injected into your pages, an inactivity rule that suspends sites with no visits for weeks or months, and an upsell path: your project grows, hits a limit, and moving to a paid plan becomes attractive.",
      "Two families exist. Static hosting serves pre-built HTML, CSS, and JavaScript and is fast, secure, and effectively free forever — ideal for portfolios, docs, and marketing pages. Dynamic hosting runs server-side code (PHP, Node.js, Python) for logins, forms, and databases, and its free tiers are the tightest in the industry.",
    ],
    freeVsPaid: [
      "Free hosting and paid hosting run on the same infrastructure; the difference is which resources you control. Paid plans remove most caps: your own domain, SSL included, dedicated CPU cycles, no injected ads, and a support team with a ticket system instead of a Discord channel.",
      "You can honestly run a small business site, a portfolio, or a community blog on a good free tier indefinitely. What should push you to paid is growth, not fear: sustained daily traffic, a store with payments, or an app where a five-minute outage matters. The upgrade path on most providers takes minutes, so there is little reason to pay before you need to.",
    ],
    commonMistakes: [
      "Picking a host before checking its inactivity policy — sites that sleep after two weeks of no visits are fine for demos, not for a portfolio you reference daily.",
      "Treating a static-only host as if it were dynamic, then discovering there is no PHP or Node.js on the plan.",
      "Ignoring the ads clause and finding injected banners on a site you presented to a client.",
      "Storing backups nowhere but the provider's disk — free tiers are reclaimed without notice when accounts are abused, so keep a local copy.",
      "Choosing by RAM numbers instead of by uptime record and community reviews, which predict reliability better than specs.",
    ],
    gettingStarted: [
      "Decide static or dynamic: if your site has no logins, forms, or server logic, choose static hosting and skip PHP entirely.",
      "Compare providers on storage, bandwidth, and ads policy. Everything you need is visible on the FreeHosts directory for each host.",
      "Deploy a test version first: upload a real page, check load speed, and wait a week to see whether the site is still active.",
      "Attach your own domain if the plan allows it, and enable the provider's SSL certificate before sharing links.",
      "Set up a backup routine: export your files monthly, because free accounts can be reclaimed with little notice.",
    ],
    faq: [
      {
        q: "Is free website hosting actually free forever?",
        a: "Yes, within the plan's limits. Providers fund free tiers through ads, subdomains, and upsells, so the service itself costs nothing. Sites that stay small and within caps can run for years without paying a cent.",
      },
      {
        q: "Can I use my own domain name on free hosting?",
        a: "Often, but not always. Many free plans require the provider's subdomain, while others let you point a custom domain at no cost. Check the plan before committing content.",
      },
      {
        q: "What are the real limits of free web hosting?",
        a: "Storage usually spans a few hundred megabytes to a few gigabytes, bandwidth covers tens of thousands of monthly views, and CPU and RAM are shared. Inactive sites may also be suspended after weeks without traffic.",
      },
      {
        q: "What is the difference between static and dynamic hosting?",
        a: "Static hosting serves pre-built files and is fast and nearly maintenance-free. Dynamic hosting executes server-side code for features like logins and databases, which costs more resources and is why its free tiers are stricter.",
      },
    ],
  },
  {
    slug: "free-app-hosting",
    name: "Application Hosting",
    title: "Free App Hosting: Run Node.js & Python for Free (2026 Guide) | FreeHosts",
    h1: "Free Application Hosting: Guide to Running Real Code for $0",
    description:
      "Can you run Node.js, Python, or PHP apps for free? How free app hosting works, idle-sleep policies, CPU and RAM limits, and the five steps to deploying your first app without paying.",
    updated: "2026-08-20",
    intro: [
      "Free application hosting is where you run actual server-side code — Node.js, Python, PHP, serverless functions, or automation scripts — without paying a hosting bill. It is the upgrade path every hobbyist takes after outgrowing static hosting, and it is more capable than most people expect.",
      "Free app hosting is a managed or semi-managed server environment where your code runs continuously on shared infrastructure, with your account limited to a fixed CPU, memory, and storage budget. Costs are recovered through resource caps, inactivity pauses, and paid upgrades when projects outgrow the free tier.",
      "The rule of thumb: free app hosting comfortably runs APIs with thousands of requests per day, small bots, dashboards, and full-stack prototypes. It struggles with long-running jobs, heavy compute, or anything that needs guaranteed memory. Review your workload before you deploy.",
    ],
    howItWorks: [
      "Unlike static hosting, an app host keeps a runtime alive: you push code, the provider starts it into an environment with your allocated CPU and RAM, and the process serves requests over the internet. Most free tiers run one or two processes comfortably and begin failing under memory pressure, which is why 24/7 services are the hardest thing to keep free.",
      "The biggest operational difference from paid hosting is the idle policy. Because idle processes still consume memory, many free providers pause an application after days without traffic and cold-start it on the next request. Cold starts add seconds of latency — acceptable for dashboards, annoying for bots that must react instantly.",
      "Deployment is usually a Git push or a zip upload, with environment variables for secrets and a dashboard for logs, restarts, and resource monitoring. The provider's job is keeping the platform patched and online; your job is keeping the app within its limits.",
    ],
    freeVsPaid: [
      "Both run the same code; the free tier simply imposes tighter caps and a startup lag. Paid app hosting removes memory ceilings, guarantees always-on processes, and adds persistent storage, horizontal scaling, and priority support.",
      "For an MVP, a personal API, or a portfolio project, a free tier is honest and sufficient. Move to paid when you need guaranteed uptime for users, memory beyond the cap, or background jobs that cannot be cold-started. Because most providers offer seamless upgrades, paying early is usually wasted money.",
    ],
    commonMistakes: [
      "Choosing a host that does not support your runtime — check Node.js, Python, PHP, or serverless support before signing up.",
      "Forgetting the idle policy, then wondering why a bot reacts with a ten-second delay after a quiet night.",
      "Treating free RAM as a ceiling rather than a budget: memory leaks that are invisible on a laptop kill a free tier within days.",
      "Storing data on the app's filesystem instead of a database — free app tiers are ephemeral or tightly disk-capped.",
      "Ignoring cold starts when building user-facing features that must answer instantly.",
    ],
    gettingStarted: [
      "Check the provider supports your language and version — this filter alone removes half the candidates.",
      "Compare RAM and CPU allocations, not just the headline number of hosts in a category.",
      "Deploy a minimal version first: a health endpoint returning JSON, with a log line you can watch.",
      "Instrument uptime: add a lightweight ping every few minutes and check after a quiet weekend whether the app slept.",
      "Move state out of the process: connect a free database from the start so storage survives restarts and cold starts.",
    ],
    faq: [
      {
        q: "Can free app hosting run a production API?",
        a: "Yes, for small workloads. Free tiers commonly handle thousands of requests per day. Watch the idle policy and memory cap — lightweight, stateless APIs survive easily; heavy jobs do not.",
      },
      {
        q: "Do I need to keep my computer running?",
        a: "No. The app runs on the provider's cloud infrastructure independently of your device. It may pause after days of inactivity, but it restarts automatically on the next request.",
      },
      {
        q: "Which languages do free app hosts support?",
        a: "Node.js and Python are the most common, with PHP, Java, and Go widely available. Confirm the exact version on the provider's plan before deploying.",
      },
      {
        q: "Why does my free app feel slow after a break?",
        a: "That is a cold start: the provider paused your idle process and is booting it on demand. It adds a few seconds to the first request, then runs normally until the next idle pause.",
      },
    ],
  },
  {
    slug: "free-game-server-hosting",
    name: "Gaming & Minecraft Hosting",
    title: "Free Minecraft Server Hosting: Honest Guide to Free Game Servers (2026) | FreeHosts",
    h1: "Free Minecraft & Game Server Hosting: The Realistic Guide",
    description:
      "Free Minecraft server hosting explained honestly: what specs a free tier can actually run, how slot and idle limits work, RAM requirements by server type, and five mistakes that kill free game servers.",
    updated: "2026-08-20",
    intro: [
      "Free game server hosting is the most popular category in the FreeHosts directory, and also the most misunderstood. The truth is encouraging and sobering at once: free tiers genuinely run Minecraft and other game servers, but they are sized for small groups, not communities.",
      "Free game server hosting is a shared cloud server instance with a fixed CPU, RAM, and slot allocation, reserved for running game server software such as Minecraft Java, Paper, Forge, or BeamMP. Providers recover costs through resource caps, periodic idle sleeps, and upsells to larger game-focused plans.",
      "Treat free game hosting as \"a server for you and your friends\". A vanilla Minecraft world in 2 GB of RAM, a small modpack, or a handful of BeamMP slots is realistic. A 50-player modded server is not — and no amount of setup skill changes physics.",
    ],
    howItWorks: [
      "You rent a slice of a server, pre-installed with a control panel, and choose your game and version. The panel gives you the console, a file manager, and options to set the world seed, permissions, and plugins. Your world files live on the provider's disk, which is why a good panel includes scheduled backups.",
      "The defining constraint is RAM. Vanilla Minecraft runs comfortably on 1–2 GB, Paper with plugins on 2–4 GB, and heavy modpacks need more than most free tiers will ever give you. If a plan advertises 1 GB, read that as \"vanilla only\". CPU is the second number: game servers are single-thread hungry, so a fast single core beats a slow many-core setup.",
      "Free game servers almost always include an idle sleep: when no player has connected for a set time, the world stops and restarts on the next join. This saves the provider money and keeps your world alive — but it means communal worlds die if nobody logs in.",
    ],
    freeVsPaid: [
      "A free game server and a paid one run identical software; the differences are capacity, persistence, and support. Paid tiers give you the RAM for modpacks, guaranteed wake-on-demand, DDoS protection, backups, and a support team.",
      "For a private vanilla server or a small test world, free is the right answer and can run for years. The moment you host strangers, run modpacks, or need the server awake at 3 a.m. for a community event, the free tier's limits stop being quirks and start being outages.",
    ],
    commonMistakes: [
      "Picking a host by slot count instead of RAM — slots are marketing; memory is physics.",
      "Installing a 50-modpack on a 1 GB free tier and blaming the host for the lag.",
      "Never logging into the panel, so a corrupt world goes unbacked-up when the world file is reclaimed.",
      "Ignoring the idle sleep rule, then discovering the community server has been down for a week.",
      "Choosing a provider with no DDoS protection, then letting your address leak to griefers.",
    ],
    gettingStarted: [
      "Size honestly: vanilla survival for friends needs ~2 GB; anything modded needs more than most free tiers offer.",
      "Compare hosts on RAM, CPU generation, and slots — the FreeHosts directory lists all three per provider.",
      "Create the world, adjust the seed and difficulty, and set permissions before inviting anyone.",
      "Configure backups in the control panel on day one, and download a copy weekly.",
      "Announce the idle policy to your players so nobody panics when the server sleeps after a quiet week.",
    ],
    faq: [
      {
        q: "Is free Minecraft server hosting actually free?",
        a: "Yes. The server runs on the provider's hardware at no cost. Real limits: small RAM, limited slots, and auto-sleep after inactivity. Choose a plan whose RAM matches the server type you run.",
      },
      {
        q: "How many players can a free game server handle?",
        a: "Typically 5 to 20 for vanilla or lightly modded worlds, depending on allocated RAM and CPU. Heavy modpacks need paid-tier memory and far fewer slots.",
      },
      {
        q: "Can I run modded Minecraft on free hosting?",
        a: "Only lightweight mods. Modpacks are memory-hungry and usually exceed free-tier RAM. Check the listing's allocation first; below 2 GB, stay vanilla.",
      },
      {
        q: "Why does my free server shut down when nobody plays?",
        a: "That is the idle policy: providers pause servers without players to save resources and restart them on the next join. It is normal, documented, and the biggest difference between free and paid game hosting.",
      },
    ],
  },
  {
    slug: "free-discord-bot-hosting",
    name: "Discord Bot Hosting",
    title: "Free Discord Bot Hosting: Keep Bots Online 24/7 for $0 (2026) | FreeHosts",
    h1: "Free Discord Bot Hosting: The Practical 2026 Guide",
    description:
      "Everything about hosting Discord bots for free: what makes a host bot-suitable, why idle policies matter, how much RAM bots really need, and how to deploy your first bot without paying.",
    updated: "2026-08-20",
    intro: [
      "A Discord bot is judged by one property: whether it answers when someone pings it. Free hosting is viable for most bots, but it changes the math from \"is the host free\" to \"does the host stay awake for my bot\". This guide covers exactly that distinction.",
      "Free Discord bot hosting is a free server environment suited to long-running scripting workloads, typically Node.js or Python, where your bot process stays online and reacts to Discord events. Its fitness for bots depends on the idle policy, CPU allocation, and how quickly the provider cold-starts paused processes.",
      "Most bots are small: a music bot, a moderation suite, or a role system uses a few hundred megabytes and a fraction of a CPU core. Even an AI-powered bot rarely exceeds 1–2 GB. This is why free hosting genuinely works for bots — and why what kills free bot hosting is always the same thing: the host sleeping when nobody is watching.",
    ],
    howItWorks: [
      "A Discord bot is a client program that connects to Discord's gateway and reacts to events. Hosting it means keeping that process running 24/7, which is exactly what servers do and laptops do not. You deploy the bot's code, the provider starts it, and it stays connected while it stays within memory and CPU limits.",
      "The idle policy is the decisive feature. Free hosts targeting applications pause processes after days without traffic because idle memory costs money. For a bot, that means the first message after a quiet stretch can take seconds to answer — acceptable for a slow-channel bot, awful for a moderation or giveaway bot where timing is the feature.",
      "Everything else is standard: a control panel, environment variables for the bot token, and logs to debug crashes. The token is the security boundary — it is stored in the environment, never committed to your repository, and rotated whenever it leaks.",
    ],
    freeVsPaid: [
      "Free bot hosting and paid bot hosting run the same code. Paid tiers guarantee always-on processes with rapid cold starts (or none), add memory for bigger bots, and offer uptime monitoring and support.",
      "A free tier is the correct choice for personal bots, community utilities, and experimentation — and it scales: most providers upgrade in-place, adding RAM without a redeploy. Move to paid when your community's features depend on the bot answering instantly, or when memory runs out and crashes begin.",
    ],
    commonMistakes: [
      "Choosing a host by machine specs instead of its idle and cold-start policy — the spec sheet is irrelevant if the process sleeps.",
      "Committing the bot token to a repository, then rotating it only after it leaks.",
      "Building a memory-hungry bot (large caches, long-lived objects) on a tier designed for light scripts.",
      "Ignoring logs until a crash, then finding the process has been down for days.",
      "Hosting a music bot without checking bandwidth allowances, which free tiers cap tightly.",
    ],
    gettingStarted: [
      "Filter candidates by supported runtime: Node.js covers most Discord libraries; Python covers the rest.",
      "Read the idle policy before the spec sheet and prefer hosts that cold-start in seconds.",
      "Deploy a hello-world bot first, join it to a test server, and confirm responses within the first hour.",
      "Store the token in environment variables and enable logs from day one.",
      "Add a heartbeat: a simple ping every few minutes proves uptime to you, even if the panel hides it.",
    ],
    faq: [
      {
        q: "Can I host a Discord bot for free forever?",
        a: "Yes, for small and medium bots. Free tiers run Node.js or Python processes within RAM and CPU caps. Budget-friendly bots stay within limits easily and run indefinitely.",
      },
      {
        q: "Why are good Discord bot hosts hard to find?",
        a: "Bot hosting demands always-on processes, which free economics discourage. Many hosts target websites and apps instead, so the set of bot-suitable free plans is small and churns frequently — the FreeHosts directory lists only curated ones.",
      },
      {
        q: "How much RAM does a Discord bot need?",
        a: "A typical moderation or utility bot uses under 512 MB. Music streams and AI features need 1–2 GB. Anything larger means your bot is doing more than Discord should ask of it.",
      },
      {
        q: "My bot is slow to respond sometimes. Is that normal?",
        a: "If the delay follows a quiet period, yes: the host paused the idle process and cold-started it on your message. If delays happen during active use, the bot is strapped for CPU or memory — check its resource graphs.",
      },
    ],
  },
  {
    slug: "free-database-hosting",
    name: "Database Hosting",
    title: "Free Database Hosting: PostgreSQL, MySQL & MongoDB for $0 (2026) | FreeHosts",
    h1: "Free Database Hosting: The 2026 Guide to Free SQL & NoSQL",
    description:
      "Free database hosting explained: how much storage free tiers really provide, which engines are covered, how idle policies affect always-on apps, and five mistakes that lose data on free plans.",
    updated: "2026-08-20",
    intro: [
      "Every application with state — users, content, orders — needs a database, and a surprising number of real projects run on free database tiers. The catch is that the free tier's value is measured in megabytes and connection limits, not promises. This guide maps the territory honestly.",
      "Free database hosting is a managed database instance — PostgreSQL, MySQL, MongoDB, MariaDB, or a Redis-compatible service — provided at zero cost with caps on storage, connections, and throughput. Providers fund it through limits, periodic suspension of idle instances, and upgrades to paid plans with more capacity.",
      "A pragmatic ceiling: free tiers typically offer tens to hundreds of megabytes, enough for a small app, an MVP, a development environment, or analytics on modest data. Production workloads can ride a free tier when the data is small and the workload is light — but connection limits under bursts are the most common source of mysterious failures.",
    ],
    howItWorks: [
      "You provision an instance through a dashboard, which gives you a hostname, port, credentials, and a connection string. Your app connects like it would to any database; the provider manages the engine upgrades, backups, and uptime as a managed service. Most panels also offer a web console, so you can run queries without installing a client.",
      "The three cheap resources on free tiers are storage, connections, and throughput. Storage caps are measured in low hundreds of MB to a few GB. Connection limits (often tens of live connections) break naive connection pooling setups. Throughput throttling makes sudden import jobs slow to a crawl before they fail.",
      "Some providers pause databases after long periods without queries. The instance sleeps and cold-starts on the next connection, adding seconds of latency. For development this is invisible; for always-on public apps it is a feature you must know about before you rely on it.",
    ],
    freeVsPaid: [
      "Free and paid database hosting run identical engines; the difference is headroom. Paid plans lift storage and connection caps, add dedicated throughput, guarantee DBs stay awake, and include more frequent automatic backups.",
      "Choose free when your data fits in the caps and your workload is light — the classic MVP, side project, or portfolio case. Choose paid when data grows, bursts matter, or an outage means lost users. Migrating between tiers on the same provider is usually an in-place operation.",
    ],
    commonMistakes: [
      "Choosing an engine your team does not know — Postgres habits do not transfer to MongoDB queries.",
      "Building a production app without testing how it behaves at the free tier's connection limit.",
      "Skipping your own exports because \"managed\" sounds like backup — free tiers back up less aggressively.",
      "Ignoring the idle policy, then watching a public site fail queries for seconds after a quiet night.",
      "Running analytics on a free tier and crashing the app's reads during reporting hours.",
    ],
    gettingStarted: [
      "Pick the engine that matches your stack: Postgres and MySQL for relational apps, MongoDB for document data.",
      "Compare storage caps and connection limits before choosing — they vary more than engines do.",
      "Create the instance, note the connection string, and verify access from your app with a simple query.",
      "Enable the provider's backups and schedule your own weekly export to a file you control.",
      "Load-test the connection limit: simulate the app's real query patterns, not a single connection.",
    ],
    faq: [
      {
        q: "Is a free database reliable enough for production?",
        a: "For small production workloads, often yes, with two caveats: connection limits fail under traffic bursts, and idle policies pause inactive instances. Size your app to those caps and monitor the first week.",
      },
      {
        q: "PostgreSQL, MySQL, or MongoDB — which free tier should I pick?",
        a: "Match your stack: Postgres and MySQL suit relational data and most ORMs; MongoDB suits flexible, document-shaped data. The engines themselves are equally reliable on managed free tiers.",
      },
      {
        q: "Do free databases sleep when unused?",
        a: "Some do. Providers pause instances with no queries for extended periods and cold-start them on the next connection. Fine for development; check the policy before depending on it for a public app.",
      },
      {
        q: "How much storage do free database tiers include?",
        a: "Typically tens to hundreds of megabytes, up to a few gigabytes on generous plans. Enough for MVPs and side projects; plan your data growth or migrate before hitting the cap.",
      },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}