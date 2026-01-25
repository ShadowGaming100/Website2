'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

// Terminal Component with improved styling
const terminalCommands = [
  { cmd: 'freehosts search --type static', output: '✓ Found 42 static hosting providers' },
  { cmd: 'freehosts deploy ./my-app', output: '✓ Deploying to Vercel...' },
  { cmd: 'freehosts status', output: '✓ All systems operational (99.9% uptime)' },
  { cmd: 'freehosts list --free --verified', output: '✓ Showing 100+ verified free hosts' },
];

function Terminal() {
  const [lines, setLines] = useState<{ type: 'cmd' | 'output'; text: string }[]>([]);
  const [currentCmd, setCurrentCmd] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let cmdIndex = 0;
    let charIndex = 0;
    let isOutput = false;
    let timeoutId: NodeJS.Timeout;

    const typeWriter = () => {
      if (cmdIndex >= terminalCommands.length) {
        // Reset after showing all commands
        timeoutId = setTimeout(() => {
          setLines([]);
          setCurrentCmd('');
          cmdIndex = 0;
          charIndex = 0;
          isOutput = false;
          typeWriter();
        }, 4000);
        return;
      }

      const command = terminalCommands[cmdIndex];

      if (!isOutput) {
        // Typing command
        if (charIndex <= command.cmd.length) {
          setCurrentCmd(command.cmd.slice(0, charIndex));
          setIsTyping(true);
          charIndex++;
          timeoutId = setTimeout(typeWriter, 40 + Math.random() * 30);
        } else {
          // Command finished, show output
          setIsTyping(false);
          setLines(prev => [...prev, { type: 'cmd', text: command.cmd }]);
          setCurrentCmd('');
          isOutput = true;
          charIndex = 0;
          timeoutId = setTimeout(typeWriter, 300);
        }
      } else {
        // Show output
        setLines(prev => [...prev, { type: 'output', text: command.output }]);
        isOutput = false;
        cmdIndex++;
        timeoutId = setTimeout(typeWriter, 1200);
      }
    };

    timeoutId = setTimeout(typeWriter, 800);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[rgb(var(--accent)/0.15)] to-[rgb(var(--accent-2)/0.15)] rounded-3xl blur-2xl opacity-60" />

      <div className="relative bg-[#0d1117] rounded-2xl overflow-hidden border border-[#30363d] shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#8b949e] text-xs font-mono">
            <FontAwesomeIcon icon={['fas', 'terminal']} className="text-[10px]" />
            <span>freehosts-cli</span>
          </div>
          <div className="w-16" />
        </div>

        {/* Terminal Body */}
        <div className="p-5 font-mono text-sm min-h-[280px] max-h-[280px] overflow-hidden">
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`mb-2 ${line.type === 'cmd' ? 'text-[#58a6ff]' : 'text-[#3fb950]'}`}
            >
              {line.type === 'cmd' ? (
                <span>
                  <span className="text-[#8b949e]">$</span> {line.text}
                </span>
              ) : (
                <span>{line.text}</span>
              )}
            </motion.div>
          ))}

          {/* Current typing line */}
          <div className="text-[#58a6ff]">
            <span className="text-[#8b949e]">$</span> {currentCmd}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-[#58a6ff] ml-0.5 align-middle"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Trustpilot Widget Component
function TrustpilotWidget() {
  return (
    <a
      href="https://www.trustpilot.com/review/freehosts.space"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent)/0.3)] transition-all group"
    >
      {/* Trustpilot Logo SVG */}
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#00b67a]" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
      <div className="flex flex-col">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesomeIcon
              key={star}
              icon={['fas', star <= 4 ? 'star' : 'star-half-alt']}
              className="text-[10px] text-[#00b67a]"
            />
          ))}
        </div>
        <span className="text-xs text-[rgb(var(--muted))] group-hover:text-[rgb(var(--text))] transition-colors">
          4.8 on Trustpilot
        </span>
      </div>
    </a>
  );
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function HomePage() {
  const [count, setCount] = useState({ hosts: 0, users: 0, uptime: 0 });

  // Animated counter effect
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = { hosts: 100, users: 5000, uptime: 99.9 };
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCount({
        hosts: Math.floor(targets.hosts * progress),
        users: Math.floor(targets.users * progress),
        uptime: Number((targets.uptime * progress).toFixed(1))
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: `${count.hosts}+`, label: 'Verified Hosts', icon: ['fas', 'server'] as IconProp },
    { value: `${count.users.toLocaleString()}+`, label: 'Active Users', icon: ['fas', 'users'] as IconProp },
    { value: `${count.uptime}%`, label: 'Avg Uptime', icon: ['fas', 'signal'] as IconProp },
  ];

  const features = [
    {
      icon: ['fas', 'shield'] as IconProp,
      title: 'Verified & Trusted',
      description: 'Every host undergoes rigorous testing. No scams, no hidden fees.',
    },
    {
      icon: ['fas', 'bolt'] as IconProp,
      title: 'High Performance',
      description: 'Modern infrastructure with NVMe SSDs and optimized networks.',
    },
    {
      icon: ['fas', 'users'] as IconProp,
      title: 'Community Driven',
      description: 'Built by developers. Real reviews from real users.',
    },
    {
      icon: ['fas', 'search'] as IconProp,
      title: 'Smart Filtering',
      description: 'Find the perfect host by tech stack, location, or resources.',
    },
    {
      icon: ['fas', 'rotate'] as IconProp,
      title: 'Always Updated',
      description: 'Real-time monitoring ensures accurate, current information.',
    },
    {
      icon: ['fas', 'book'] as IconProp,
      title: 'Expert Guides',
      description: 'Comprehensive tutorials for deployment and optimization.',
    },
  ];

  const hostingTypes = [
    { title: 'Static Sites', description: 'HTML, CSS, JS with CDN', icon: ['fas', 'code'] as IconProp },
    { title: 'Discord Bots', description: '24/7 bot hosting', icon: ['fab', 'discord'] as IconProp },
    { title: 'Node.js', description: 'Full-stack apps', icon: ['fab', 'node-js'] as IconProp },
    { title: 'Databases', description: 'SQL & NoSQL', icon: ['fas', 'database'] as IconProp },
    { title: 'Python', description: 'Django, Flask', icon: ['fab', 'python'] as IconProp },
    { title: 'Cloud & VPS', description: 'Root access', icon: ['fas', 'cloud'] as IconProp },
  ];

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      {/* Hero Banner Section */}
      <section className="relative">
        <div className="h-[32rem] md:h-[36rem] lg:h-[40rem] relative overflow-hidden">
          <div className="w-full h-full gradient-bg" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg))] via-[rgb(var(--bg)/0.4)] to-transparent" />

          {/* Hero Content (Floating above banner) */}
          <div className="container-default absolute inset-0 flex items-center pt-8 md:pt-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center lg:text-left"
              >
                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    <span className="text-sm font-medium text-white">
                      5,000+ developers trust us
                    </span>
                  </div>
                  <TrustpilotWidget />
                </div>

                <h1 className="heading-1 text-white mb-6">
                  Find the Perfect <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">Free Hosting</span> for Your Project
                </h1>

                <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 text-balance font-medium">
                  The most comprehensive directory of verified free hosting providers. Deploy apps without spending a dime.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/hosts"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-[rgb(var(--accent))] font-bold shadow-xl hover:bg-white/90 transition-all w-full sm:w-auto"
                    >
                      <span>Browse Hosts</span>
                      <FontAwesomeIcon icon={['fas', 'arrow-right']} className="text-sm" />
                    </Link>
                  </motion.div>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold hover:bg-white/20 transition-all w-full sm:w-auto"
                  >
                    <span>Learn More</span>
                  </Link>
                </div>
              </motion.div>

              {/* Right Content - Terminal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:block"
              >
                <Terminal />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Overlapping Info Cards */}
        <div className="container-default relative -mt-16 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] shadow-large p-6 flex flex-col items-center text-center group hover:border-[rgb(var(--accent))] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[rgb(var(--accent)/0.1)] flex items-center justify-center text-[rgb(var(--accent))] mb-4 group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={stat.icon} className="text-xl" />
                </div>
                <div className="text-3xl font-bold text-[rgb(var(--text))] mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-[rgb(var(--muted))] uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="py-12">

        {/* Hosting Types Section */}
        <section className="py-16 border-y border-[rgb(var(--border))] bg-[rgb(var(--muted)/0.02)]">
          <div className="container-default">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="heading-3 text-[rgb(var(--text))] mb-3">
                Every Type of Hosting
              </h2>
              <p className="body-default text-[rgb(var(--muted))]">
                From simple static sites to complex full-stack applications
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {hostingTypes.map((type, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="group p-4 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent)/0.5)] hover:shadow-medium transition-all text-center"
                >
                  <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-[rgb(var(--accent)/0.1)] flex items-center justify-center group-hover:bg-[rgb(var(--accent)/0.15)] group-hover:scale-110 transition-all">
                    <FontAwesomeIcon icon={type.icon} className="text-lg text-[rgb(var(--accent))]" />
                  </div>
                  <h3 className="font-semibold text-[rgb(var(--text))] text-sm mb-0.5">{type.title}</h3>
                  <p className="text-xs text-[rgb(var(--muted))]">{type.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding">
          <div className="container-default">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))] text-sm font-medium mb-4">
                Why FreeHosts
              </span>
              <h2 className="heading-2 text-[rgb(var(--text))] mb-4">
                Everything You Need
              </h2>
              <p className="body-default text-[rgb(var(--muted))] max-w-2xl mx-auto">
                We&apos;ve built the most comprehensive and trustworthy free hosting directory on the internet.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="group p-6 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent)/0.3)] hover:shadow-medium transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-[rgb(var(--accent)/0.1)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FontAwesomeIcon icon={feature.icon} className="text-[rgb(var(--accent))]" />
                  </div>
                  <h3 className="heading-4 text-[rgb(var(--text))] mb-2">{feature.title}</h3>
                  <p className="body-small text-[rgb(var(--muted))]">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section-padding bg-gradient-to-b from-transparent to-[rgb(var(--muted)/0.03)]">
          <div className="container-default">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="heading-2 text-[rgb(var(--text))] mb-4">
                How It Works
              </h2>
              <p className="body-default text-[rgb(var(--muted))] max-w-2xl mx-auto">
                Finding the right free hosting is simple with FreeHosts.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: '01', title: 'Browse', description: 'Explore our curated directory of verified free hosting providers', icon: ['fas', 'search'] as IconProp },
                { step: '02', title: 'Compare', description: 'Filter by features, resources, and technology stack', icon: ['fas', 'filter'] as IconProp },
                { step: '03', title: 'Deploy', description: 'Sign up and launch your project in minutes', icon: ['fas', 'rocket'] as IconProp },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-bg flex items-center justify-center text-white shadow-lg shadow-[rgb(var(--accent)/0.25)]">
                    <FontAwesomeIcon icon={item.icon} className="text-xl" />
                  </div>
                  <div className="text-xs font-bold text-[rgb(var(--accent))] mb-2">{item.step}</div>
                  <h3 className="heading-4 text-[rgb(var(--text))] mb-2">{item.title}</h3>
                  <p className="body-small text-[rgb(var(--muted))]">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding">
          <div className="container-default">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl gradient-bg p-8 md:p-12 lg:p-16"
            >
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Join Our Community
                  </h2>
                  <p className="text-lg text-white/80 mb-6">
                    Connect with thousands of developers. Share experiences, get recommendations, and stay updated on the latest free hosting solutions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="https://discord.gg/QbeZ3b5CQd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[rgb(var(--accent))] font-semibold shadow-large transition-all"
                    >
                      <FontAwesomeIcon icon={['fab', 'discord']} />
                      <span>Join Discord</span>
                    </motion.a>
                    <Link
                      href="/hosts"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-white/30 text-white font-medium hover:bg-white/10 transition-all"
                    >
                      <span>Browse Hosts</span>
                    </Link>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: '5,000+', label: 'Members', icon: ['fas', 'users'] as IconProp },
                    { value: '100+', label: 'Daily Chats', icon: ['fas', 'comments'] as IconProp },
                    { value: '24/7', label: 'Support', icon: ['fas', 'clock'] as IconProp },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                      <FontAwesomeIcon icon={stat.icon} className="text-xl text-white/80 mb-2" />
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-white/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
