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
    title: "Free Website Hosting: Limits & How to Choose",
    h1: "Free Website Hosting: The Complete, Honest Guide",
    description:
      "How free website hosting really works: storage, bandwidth and domain limits, static vs dynamic tiers, and how to choose a provider without getting burned.",
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
    title: "Free App Hosting: Node.js & Python for $0",
    h1: "Free Application Hosting: Guide to Running Real Code for $0",
    description:
      "Run Node.js, Python or PHP apps for free: how free app hosting works, idle-sleep policies, CPU and RAM limits, and five steps to deploying your first app.",
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
    title: "Free Minecraft Server Hosting: Honest Guide",
    h1: "Free Minecraft & Game Server Hosting: The Realistic Guide",
    description:
      "Free Minecraft server hosting explained: what specs free tiers actually run, how idle limits work, RAM by server type, and the mistakes that kill game servers.",
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
    title: "Free Discord Bot Hosting: Stay Online for $0",
    h1: "Free Discord Bot Hosting: The Practical 2026 Guide",
    description:
      "Hosting Discord bots for free: what makes a host bot-suitable, why idle policies matter, how much RAM bots need, and deploying your first bot for $0.",
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
    title: "Free Database Hosting: SQL & NoSQL for $0",
    h1: "Free Database Hosting: The 2026 Guide to Free SQL & NoSQL",
    description:
      "Free database hosting explained: real storage caps, which engines are covered, how idle policies affect apps, and mistakes that lose data on free plans.",
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
  {
    slug: "free-vps-hosting",
    name: "VPS Hosting",
    title: "Free VPS Hosting: Real Options & Limits",
    h1: "Free VPS Hosting: The Realistic Guide",
    description:
      "Does free VPS hosting exist? How root access, always-on uptime and reserved RAM drive costs, which free tiers are genuine, and how to judge any offer.",
    updated: "2026-08-26",
    intro: [
      "A VPS — virtual private server — is the closest thing free hosting offers to owning a machine. You get reserved CPU and RAM, a rebootable OS image, and usually root access. The catch: an always-on server with guaranteed memory is the single most expensive thing a host can give away, so genuinely free VPS plans are rare, small, and strict.",
      "Free VPS hosting is a virtual machine provided at zero cost with fixed resources — commonly 1 vCPU, 512 MB to 1 GB of RAM, and 5–20 GB of disk. Providers fund it through paid upgrades, credit systems, community programs, or strict idle and renewal policies.",
      "Judge every offer against three questions: Is it free permanently or a trial in disguise? Does it stay running or sleep? And what happens when it does — suspension, deletion, or just downtime? The answers separate real free VPS hosting from marketing.",
    ],
    howItWorks: [
      "Unlike shared web hosting, a VPS reserves its resources whether you use them or not. The provider cannot oversell your RAM to ten other users, which is exactly why free VPS plans are tiny: every gigabyte given away is a gigabyte that cannot be sold.",
      "Most free VPS offerings fall into three families: community or education programs that sponsor small instances, freemium platforms offering one always-on micro instance alongside paid tiers, and time-limited cloud credits that look free but expire. Always identify which family a plan belongs to before building on it.",
      "Running the server is only half the bill. Bandwidth (egress traffic), extra IPv4 addresses, snapshots, and backups are the add-ons providers charge for, and free tiers cap them hardest. A plan with generous specs and a 100 GB traffic limit can be less useful than a smaller one with unmetered bandwidth.",
    ],
    freeVsPaid: [
      "A paid VPS removes the ceiling: more RAM, guaranteed uptime SLAs, snapshot scheduling, and support that answers tickets. A free VPS gives you the same root prompt over a much smaller machine, with the constant awareness that resource abuse affects everyone on the program.",
      "Free is the right choice for learning Linux administration, running a personal VPN or small bot, and staging environments. Paid becomes necessary the moment something matters — a production API, a game server with friends depending on it, or any workload where losing the box means losing data.",
    ],
    commonMistakes: [
      "Assuming 'free trial' means 'free forever' — cloud credits run out and some providers auto-charge the card on file unless you downgrade first.",
      "Skipping backups because the VPS feels permanent; free instances are reclaimed more readily than paid ones, and snapshots are rarely included.",
      "Ignoring bandwidth caps until the month's traffic runs out and the box is throttled or suspended.",
      "Running Docker-heavy stacks on 512 MB of RAM and blaming the host for OOM crashes — container overhead alone eats half of that.",
      "Forgetting renewal requirements: several free VPS programs require periodic activity or forum participation to keep the instance alive.",
    ],
    gettingStarted: [
      "Confirm the plan is genuinely free: read the pricing page for expiry dates, card requirements, and renewal conditions.",
      "Choose the smallest OS image that works — Debian or Alpine leave far more RAM for your applications than heavier distributions.",
      "Harden the box immediately: key-only SSH login, a firewall allowing only needed ports, and automatic security updates.",
      "Set up monitoring before deploying anything real — a cron ping to yourself tells you when the instance sleeps or dies.",
      "Export data off the box weekly; treat the VPS as disposable and you will never be caught out by a reclamation.",
    ],
    faq: [
      {
        q: "Is free VPS hosting really free?",
        a: "Some programs genuinely are — sponsored by communities or offered as a single micro instance per user. Others are trials or credit schemes. Check for expiry dates, card requirements, and renewal rules before committing anything important.",
      },
      {
        q: "How much RAM does a free VPS have?",
        a: "Typically 512 MB to 1 GB. That comfortably runs a lightweight bot, a VPN endpoint, or a small web service — and rules out Java applications, containers at scale, or busy databases.",
      },
      {
        q: "Can I run a website on a free VPS instead of shared hosting?",
        a: "Yes, and you gain full control — but you also inherit setup, updates, and security. For a simple static or low-traffic site, purpose-built free web hosting is usually easier than administering your own server.",
      },
      {
        q: "What happens if I exceed the free resources?",
        a: "Usually throttling first, then suspension. Unlike paid plans there is rarely an overage option — the instance stops until usage drops or the next billing window resets the counters.",
      },
    ],
  },
  {
    slug: "free-nodejs-hosting",
    name: "Node.js Hosting",
    title: "Free Node.js Hosting: Deploy for $0",
    h1: "Free Node.js Hosting: From npm Start to Live URL",
    description:
      "Run Node.js apps for free: versions and start commands hosts expect, memory ceilings, cold starts vs always-on processes, and shipping a clean first deploy.",
    updated: "2026-08-26",
    intro: [
      "Node.js is the most widely supported runtime on free application hosts, which makes 'free Node.js hosting' the default starting point for backend projects. The catch is not support — it is choosing between platforms that pause idle apps and platforms that keep processes awake, because that single feature shapes everything else.",
      "Free Node.js hosting runs your JavaScript server-side — Express APIs, Discord bots, WebSocket servers, automation — on shared infrastructure with a memory budget (commonly 512 MB–1 GB) and a deployment flow built around Git pushes or CLI uploads.",
      "This guide covers the practical details: which files hosts look for, how versions are pinned, why your app sleeps, and how to ship a first deploy that survives contact with real users.",
    ],
    howItWorks: [
      "Hosts detect a Node project through package.json. The two fields that matter are engines (the runtime version — pin it, or you deploy against whatever the platform defaults to) and scripts.start (the command that boots your app). Missing either is the most common reason a first deploy fails.",
      "Once deployed, your process receives an allocated RAM slice and typically listens through the port the platform injects via environment variables. Reading process.env.PORT instead of hardcoding 3000 is the second most common fix.",
      "The runtime model differs by platform: long-running processes stay resident and answer instantly but consume your allocation continuously, while serverless-style platforms spin functions up per request — cheaper to run free, slower on the first hit. Know which model you are deploying into before architecting around WebSockets or cron jobs.",
    ],
    freeVsPaid: [
      "Free Node.js hosting handles development, demos, hobby bots, and low-traffic APIs honestly well. What money buys is persistence (no idle pauses), memory headroom for heavy dependency trees, and log retention beyond a few minutes.",
      "Upgrade when one of three things happens: your process needs more than the allocation allows, users notice cold-start latency, or you need background jobs that must not die between requests. Most platforms upgrade in place — same repo, bigger plan.",
    ],
    commonMistakes: [
      "Not pinning the Node version, then debugging behaviour that only appears on the platform's newer runtime.",
      "Committing node_modules or skipping a lockfile, producing builds that differ from the machine they were tested on.",
      "Hardcoding ports and localhost references instead of reading the injected PORT environment variable.",
      "Storing uploaded files on the instance's disk — ephemeral filesystems wipe them on redeploy or restart.",
      "Keeping secrets (bot tokens, API keys) in code rather than the dashboard's environment variable settings.",
    ],
    gettingStarted: [
      "Add engines and a working start script to package.json, and test both locally with a clean install first.",
      "Read process.env.PORT for the listener, and bind 0.0.0.0 rather than localhost so the proxy can reach you.",
      "Push the repository and watch the build log end to end — the first deploy teaches you the platform's opinions.",
      "Configure environment variables in the dashboard before the app needs them, never inside the code.",
      "Add a health route (/up returning 200) so both you and the platform's monitors can verify liveness instantly.",
    ],
    faq: [
      {
        q: "Can free Node.js hosting run a Discord bot?",
        a: "Yes — it is the most popular free-tier workload. Bots need an always-on process and modest memory, so pick a host whose idle policy keeps processes alive, and keep your token in environment variables.",
      },
      {
        q: "Which Node.js versions do free hosts support?",
        a: "Most platforms track current LTS releases and let you pin via the engines field in package.json. If a specific version matters — for native modules especially — confirm it in the host's docs before deploying.",
      },
      {
        q: "Why does my free Node.js app go to sleep?",
        a: "Idle processes cost memory, so many free platforms stop them after quiet periods and restart on demand. The next request pays a few seconds of startup. Always-on processes generally require a paid tier or a host that specialises in bots.",
      },
      {
        q: "How much RAM does a free Node.js plan include?",
        a: "Commonly 512 MB to 1 GB. That suits APIs, bots, and dashboards; heavy dependencies such as headless browsers or large ML libraries will exceed it quickly.",
      },
    ],
  },
  {
    slug: "free-python-hosting",
    name: "Python Hosting",
    title: "Free Python Hosting: Scripts & Apps for $0",
    h1: "Free Python Hosting: The Practical Guide",
    description:
      "Host Python apps for free: Flask, Django and FastAPI on free tiers, dependency pinning, background scripts vs web processes, and memory limits explained.",
    updated: "2026-08-26",
    intro: [
      "Python powers everything from one-file Flask sites to Django applications and FastAPI services — and free hosting supports all of them, within limits. Understanding those limits before you deploy is the difference between a smooth first launch and an afternoon of cryptic 500 errors.",
      "Free Python hosting runs your interpreter on shared infrastructure with a fixed RAM allocation (typically 512 MB) and either a persistent process or a web-worker model that starts on request. Dependencies install from requirements.txt at deploy time.",
      "The guide below maps the terrain: which frameworks fit free tiers comfortably, why memory is the constraint that bites Python hardest, and how to structure a project that deploys cleanly.",
    ],
    howItWorks: [
      "Deployment starts with dependency resolution: the platform reads requirements.txt, creates an environment, and pip installs everything. Large packages (pandas, numpy, anything compiled) consume both build time and your runtime memory budget — slim requirements are the cheapest performance win available.",
      "Web apps are served through a WSGI or ASGI server (gunicorn and uvicorn are the usual choices) that the platform starts using a declared command or detected convention. Frameworks with dev servers — Flask's built-in runner, Django's runserver — are expected to be replaced by production servers on the platform.",
      "Background scripts behave differently: a script that finishes gets charged nothing, while an always-running loop consumes allocation continuously. Many Python workloads — scrapers, schedulers, bot pollers — sit in the second group, which makes the host's idle policy the deciding factor.",
    ],
    freeVsPaid: [
      "Free tiers run small Django and FastAPI applications, personal APIs, and scheduled scripts well. Paid tiers add the memory for data-heavy libraries, multiple workers, longer log retention, and processes that never sleep.",
      "Django deserves a specific note: its ORM, admin, and middleware stack are memory-hungry relative to Flask. It runs on free tiers — but size your expectations to a handful of concurrent requests, and lean on the platform's free database integrations carefully.",
    ],
    commonMistakes: [
      "Shipping requirements.txt without version pins, then receiving a different dependency tree than the one you developed against.",
      "Using the framework's development server in production because it works locally — platforms expect a WSGI/ASGI entrypoint.",
      "Loading large datasets into memory at import time, exhausting the allocation before the first request arrives.",
      "Hardcoding SECRET_KEY and database credentials instead of using environment variables the platform provides.",
      "Assuming SQLite survives — ephemeral filesystems reset it on every deploy; use a hosted database for anything persistent.",
    ],
    gettingStarted: [
      "Pin every dependency with == versions, and generate the file from a clean virtual environment rather than your system Python.",
      "Declare a start command that runs gunicorn (or uvicorn) bound to the platform's injected host and port.",
      "Move configuration — secrets, database URLs, debug flags — into environment variables before the first deploy.",
      "Test the production server locally with the same command the platform will run; surprises belong on your machine, not theirs.",
      "Watch the memory graph on the first day: Python's baseline plus your imports should sit well under the allocation, leaving room for request spikes.",
    ],
    faq: [
      {
        q: "Can Django run on free Python hosting?",
        a: "Yes, with care. Disable unneeded middleware, serve static files via the platform or a CDN, and expect comfortable headroom for low traffic rather than bursts. Pair it with a free managed database rather than SQLite.",
      },
      {
        q: "Flask or FastAPI — which fits free tiers better?",
        a: "Both are light enough. FastAPI's async model handles waiting on external APIs efficiently; Flask remains the simplest path for classic request-response sites. Memory footprint is similar for comparable apps.",
      },
      {
        q: "Can I run Python scripts on a schedule for free?",
        a: "Often, yes — either through the platform's cron features or a long-running scheduler process. Long-running loops count against your allocation continuously, so check whether the host pauses idle processes.",
      },
      {
        q: "Why did my deploy fail during pip install?",
        a: "Usually memory or build tools: compiled packages need headroom to install. Pin lighter versions, remove unused dependencies, or split heavy libraries out — the build log names the exact package.",
      },
    ],
  },
  {
    slug: "free-static-site-hosting",
    name: "Static Site Hosting",
    title: "Free Static Site Hosting: Fast & Free Forever",
    h1: "Free Static Hosting: Sites That Stay Fast for $0",
    description:
      "Static sites are the one thing free hosting does perfectly. How CDN-backed hosting works, deploy methods, custom domains, and where static falls short.",
    updated: "2026-08-26",
    intro: [
      "If your website is HTML, CSS, and JavaScript served to visitors as-is, you are in the best possible position: static sites are the one workload free hosting does perfectly. Serving pre-built files costs providers almost nothing, so the free tiers are genuinely generous — global CDNs, HTTPS certificates, and custom domains included.",
      "Static site hosting stores your built files on edge servers worldwide and delivers them from the location nearest each visitor. There is no server-side processing at request time: whatever was uploaded is what everyone sees, which is why these plans can be fast, secure, and free indefinitely.",
      "This guide explains how static hosting differs from the dynamic plans in our directory, how deployments work in practice, and the honest trade-offs — because 'no server' also means 'no server-side features' until you wire one in.",
    ],
    howItWorks: [
      "Every visit is served from a cache close to the visitor rather than from one origin machine. Latency drops, traffic spikes barely register, and downtime requires the entire CDN to fail — this is why static sites tolerate viral moments that crush small dynamic servers.",
      "Deployment replaces files. Connect a Git repository and the host rebuilds on every push, drag a folder into the dashboard, or use a CLI. Modern static site generators — Hugo, Astro, Eleventy, Next.js in export mode — turn templates and markdown into those files at build time.",
      "Because there is no runtime, there is nothing to hack through your site's code and nothing to crash under load. Security updates largely disappear as a concern; the platform patches its edge, you patch your dependencies when you feel like it.",
    ],
    freeVsPaid: [
      "The free tier of a static host is frequently indistinguishable from paid for small sites: same CDN, same HTTPS, same deploy pipeline. Paid tiers add team features, build minutes, analytics, and higher limits — not speed.",
      "You cross into paid territory when you need server-side logic at the edge: authentication, databases, form processing, image transforms. Even then the pattern is static front-end plus a small paid function or free-tier API, rather than abandoning static hosting entirely.",
    ],
    commonMistakes: [
      "Needing a contact form and assuming static means impossible — form endpoints and serverless functions slot in cleanly, but they must be planned.",
      "Committing the build output instead of the source, making every content change a manual rebuild-and-upload chore.",
      "Letting a stale deployment linger: static sites do not warn you when dependencies behind the build have known vulnerabilities.",
      "Testing only on desktop fibre and missing that unoptimized images, not hosting, are why mobile loads crawl.",
      "Choosing static for an app that needs logins or server logic, then fighting the architecture instead of switching to a dynamic free tier.",
    ],
    gettingStarted: [
      "Put the site source in a Git repository — even a single index.html benefits from version-controlled deploys.",
      "Connect the repo to a static host and let it build; learn the build command and output directory conventions once, they repeat everywhere.",
      "Attach a custom domain and enable HTTPS — both are standard on free tiers and take minutes.",
      "Compress images before committing them; media weight, not hosting, dominates load times on well-served static sites.",
      "Add the two things static lacks natively when you need them: a forms endpoint and a small function for anything dynamic.",
    ],
    faq: [
      {
        q: "Are static sites really free forever?",
        a: "On reputable platforms, yes for reasonable usage — serving pre-built files is inexpensive enough that providers give generous bandwidth and build allowances at no cost. Watch build-minute limits on very frequent deploys, not serving itself.",
      },
      {
        q: "Can I use my own domain with free static hosting?",
        a: "Almost universally yes, with automatic HTTPS. Point the domain's DNS records at the platform and the certificate is issued automatically — this is one area where free static hosting beats many paid shared hosts.",
      },
      {
        q: "Can a static site handle a traffic spike?",
        a: "Better than almost anything else. Files are cached across a global CDN, so a viral link typically costs you nothing but attention — there is no origin server to overwhelm.",
      },
      {
        q: "How do I add a contact form without a server?",
        a: "Use a form endpoint service or a tiny serverless function: the static page posts the message, the endpoint delivers it to your email. Both have usable free tiers and take minutes to wire up.",
      },
    ],
  },
  {
    slug: "free-wordpress-hosting",
    name: "WordPress Hosting",
    title: "Free WordPress Hosting: What Works",
    h1: "Free WordPress Hosting: The Honest Guide",
    description:
      "Can WordPress run well on free hosting? PHP and MySQL demands explained, what free plans deliver, the security duties you keep, and when paying is honest.",
    updated: "2026-08-26",
    intro: [
      "WordPress is the most demanded workload in free hosting — and the hardest to deliver well. Every WordPress site needs PHP processing and a MySQL database on every single request, which puts it at the heavy end of what zero-cost infrastructure can comfortably serve. Honest expectations first: it works, but it works within narrow lanes.",
      "Free WordPress hosting provides the PHP runtime, MySQL database, and wp-admin environment needed to run WordPress at no cost, typically on a provider subdomain with capped storage, limited plugins, and shared CPU. Some plans are ad-supported; a growing number are loss-leaders hoping you upgrade.",
      "This guide covers what free WordPress hosting genuinely delivers, which responsibilities stay yours (spoiler: updates and backups), and the point at which a cheap paid plan becomes the more honest choice.",
    ],
    howItWorks: [
      "Unlike static or app hosting, every WordPress page view executes PHP and queries MySQL — there is no caching layer hiding the work unless the host adds one. That is why free plans meter you on exactly the two resources WordPress consumes fastest: database connections and PHP workers.",
      "Setup is usually automated: the host provisions the database, installs core, and hands you wp-admin credentials. Custom installations are possible on hosts that expose MySQL databases separately — our directory flags which free hosts include databases at all, since without MySQL WordPress cannot run.",
      "Performance on free tiers lives or dies on caching. Hosts that add server-level caching or let you run a caching plugin serve repeat views from RAM; hosts without it execute full PHP on every visit, which is why identical-looking plans behave completely differently under real traffic.",
    ],
    freeVsPaid: [
      "Free WordPress hosting suits portfolios, blogs written weekly rather than hourly, and testing environments. Paid plans earn their fee with staging sites, daily backups, malware scanning, email mailboxes, and support contracts — the unglamorous machinery serious sites rely on.",
      "The honest threshold: if the site represents a business, takes payments, or would hurt to lose, the cost of a backup-and-malware incident exceeds years of cheap hosting. Free WordPress remains perfect for learning WordPress itself and running sites where neither income nor reputation ride on uptime.",
    ],
    commonMistakes: [
      "Installing twenty plugins on a plan with one PHP worker — every active plugin multiplies every page view's cost.",
      "Skipping updates because 'it is only a free site'; abandoned WordPress installs are the internet's favourite malware target, free or not.",
      "Never exporting the site, assuming the host's backups exist — most free plans keep none, and a database wipe is total.",
      "Chasing premium themes and page builders on infrastructure that cannot carry them, then blaming the host for the resulting slowness.",
      "Building a shop or membership site on a free tier without checking the terms — many prohibit commercial use or payment processing outright.",
    ],
    gettingStarted: [
      "Decide subdomain-or-domain first: free plans usually provide a subdomain, while attaching your own domain varies by host and is worth filtering for.",
      "Start with a lightweight theme and the minimum plugin set — add pieces only when the site demonstrably needs them.",
      "Install a caching plugin on day one if the host permits it; cached views cost a fraction of dynamic ones on shared free CPUs.",
      "Schedule weekly exports of both the database and the uploads folder — the standard WordPress backup pair — to storage you control.",
      "Enable automatic core updates and keep the plugin list audited monthly; on free hosting you are the security department.",
    ],
    faq: [
      {
        q: "Can WordPress run on free hosting forever?",
        a: "Technically yes, and many sites do. Practically, plan for the constraints: modest traffic ceilings, limited plugins, a provider subdomain unless domains are supported, and no guarantee of performance under load.",
      },
      {
        q: "Do free WordPress hosts allow my own domain?",
        a: "Some do, some bundle it into paid tiers only. If a custom domain matters to you, filter the directory for hosts that list domain support before investing effort in a build.",
      },
      {
        q: "Is free WordPress hosting safe for a business site?",
        a: "We advise against it. The hosting itself is not unsafe — the risk is the missing safety net: no managed backups, no malware response, no support contract. Businesses feel those absences the moment something breaks.",
      },
      {
        q: "Why is my free WordPress site slow compared to a static site?",
        a: "Every view executes PHP and queries a database on shared free resources, while static sites serve cached files from a CDN. Caching plugins narrow the gap dramatically — which is why they top our getting-started list.",
      },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}