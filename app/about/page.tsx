'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Button } from '@/components/ui/Button';

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

export default function AboutPage() {
  const stats = [
    { value: '100+', label: 'Verified Hosts', icon: ['fas', 'server'] as IconProp },
    { value: '5,000+', label: 'Community Members', icon: ['fas', 'users'] as IconProp },
    { value: '50+', label: 'Countries Served', icon: ['fas', 'globe'] as IconProp },
  ];

  const values = [
    {
      icon: ['fas', 'shield-halved'] as IconProp,
      title: 'Trust & Transparency',
      description: 'Every hosting provider undergoes rigorous manual verification. No paid placements.'
    },
    {
      icon: ['fas', 'users'] as IconProp,
      title: 'Community First',
      description: 'Built by developers, for developers. Powered by collective knowledge.'
    },
    {
      icon: ['fas', 'rocket'] as IconProp,
      title: 'Innovation & Quality',
      description: 'We prioritize providers with modern infrastructure and excellent performance.'
    },
    {
      icon: ['fas', 'book-open'] as IconProp,
      title: 'Education & Support',
      description: 'Comprehensive guides and documentation to help you deploy successfully.'
    }
  ];

  const timeline = [
    { year: '2023', title: 'The Beginning', description: 'Founded to solve the challenge of finding reliable free hosting.' },
    { year: '2024', title: 'Platform Expansion', description: 'Added Discord bot hosting, databases, VPS services, and automated monitoring.' },
    { year: '2025', title: 'Community Milestone', description: 'Reached 500+ Discord members and 100+ verified hosting providers.' },
    { year: '2026', title: 'Sustained Excellence', description: 'Continuing to grow while maintaining quality and transparency.' },
  ];

  const verification = [
    { step: '01', title: 'Submission', description: 'Providers submit through our form or community recommendations.' },
    { step: '02', title: 'Technical Review', description: 'We review specs, terms, privacy policy, and verify no hidden fees.' },
    { step: '03', title: 'Hands-on Testing', description: 'Real applications deployed to test actual performance over weeks.' },
    { step: '04', title: 'Community Validation', description: 'Shared with community for additional feedback and testing.' },
    { step: '05', title: 'Continuous Monitoring', description: 'Post-listing monitoring for uptime, performance, and changes.' },
  ];

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      {/* Hero Banner */}
      <section className="relative">
        {/* Banner Gradient */}
        <div className="h-48 md:h-64 lg:h-72 relative overflow-hidden">
          <div className="w-full h-full gradient-bg" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg))] via-[rgb(var(--bg)/0.5)] to-transparent" />
        </div>

        {/* Overlapping Card */}
        <div className="container-default relative -mt-20 md:-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] shadow-large p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h1 className="heading-2 text-[rgb(var(--text))] mb-4">
                  About <span className="gradient-text">FreeHosts</span>
                </h1>
                <p className="body-default text-[rgb(var(--muted))] text-balance">
                  We&apos;re on a mission to democratize web hosting by connecting developers with reliable, truly free hosting solutions. No scams, no hidden fees.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[rgb(var(--accent)/0.1)] flex items-center justify-center">
                  <FontAwesomeIcon icon={['fas', 'circle-info']} className="text-3xl text-[rgb(var(--accent))]" />
                </div>
              </div>
            </div>

            {/* Stats Area in Card Footer */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-[rgb(var(--border))]">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-[rgb(var(--accent))] mb-1">{stat.value}</div>
                  <div className="text-[10px] md:text-xs font-semibold text-[rgb(var(--muted))] uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container-default py-12">



        <section className="section-padding">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-8 md:p-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                  <FontAwesomeIcon icon={['fas', 'book-open']} className="text-white text-lg" />
                </div>
                <h2 className="heading-3 text-[rgb(var(--text))]">Our Story</h2>
              </div>
              <div className="space-y-4 body-default text-[rgb(var(--muted))]">
                <p>
                  FreeHosts was founded in 2023 after our team spent weeks searching for reliable free hosting for side projects, Discord bots, and portfolio websites. The landscape was filled with scams, hidden fees, and services that suddenly disappeared.
                </p>
                <p>
                  We realized there had to be a better way. While legitimate free hosting providers existed, finding them meant sifting through outdated forums and promotional content. We needed a curated, verified directory.
                </p>
                <p>
                  So we built FreeHosts—a community-driven platform where every hosting provider is manually verified and tested. We don&apos;t accept payment for listings, and our rankings are never influenced by affiliates.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-gradient-to-b from-transparent to-[rgb(var(--muted)/0.03)]">
          <div className="container-default">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="heading-2 text-[rgb(var(--text))] mb-4">Our Core Values</h2>
              <p className="body-default text-[rgb(var(--muted))] max-w-2xl mx-auto">
                The principles that guide everything we do.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6 hover:border-[rgb(var(--accent)/0.3)] transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-[rgb(var(--accent)/0.1)] flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={value.icon} className="text-[rgb(var(--accent))]" />
                  </div>
                  <h3 className="heading-4 text-[rgb(var(--text))] mb-2">{value.title}</h3>
                  <p className="body-small text-[rgb(var(--muted))]">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="heading-2 text-[rgb(var(--text))] mb-4">Our Journey</h2>
              <p className="body-default text-[rgb(var(--muted))]">From a simple idea to a global community.</p>
            </motion.div>

            <div className="space-y-6">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 md:gap-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {item.year}
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-[rgb(var(--accent))] to-[rgb(var(--accent-2)/0.2)] mt-2" />
                    )}
                  </div>
                  <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-5 flex-1 mb-2">
                    <h3 className="font-semibold text-[rgb(var(--text))] mb-1">{item.title}</h3>
                    <p className="body-small text-[rgb(var(--muted))]">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-gradient-to-b from-transparent to-[rgb(var(--muted)/0.03)]">
          <div className="container-default">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="heading-2 text-[rgb(var(--text))] mb-4">Verification Process</h2>
              <p className="body-default text-[rgb(var(--muted))] max-w-2xl mx-auto">
                Every hosting provider goes through rigorous testing before being listed.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {verification.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="relative bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 text-7xl font-bold text-[rgb(var(--accent)/0.05)] -mt-2 -mr-2">
                    {step.step}
                  </div>
                  <div className="relative">
                    <div className="inline-block px-3 py-1 rounded-lg gradient-bg text-white text-xs font-bold mb-3">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-[rgb(var(--text))] mb-2">{step.title}</h3>
                    <p className="body-small text-[rgb(var(--muted))]">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-default">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl gradient-bg p-8 md:p-12 text-center"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl" />
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Join Our Community
                </h2>
                <p className="text-lg text-white/80 mb-8">
                  Connect with thousands of developers on Discord. Share experiences and get recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    href="https://discord.gg/QbeZ3b5CQd"
                    variant="secondary"
                    size="lg"
                    icon={['fab', 'discord']}
                    className="bg-white text-[rgb(var(--accent))] border-0 hover:bg-white/90"
                  >
                    Join Discord
                  </Button>
                  <Button
                    href="/hosts"
                    variant="ghost"
                    size="lg"
                    className="text-white border-white/30 hover:bg-white/10"
                  >
                    Browse Hosts
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
