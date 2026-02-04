"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Button } from "@/components/ui/button";

const FAQ_CATEGORIES = [
  {
    category: "Getting Started",
    icon: ["fas", "rocket"] as IconProp,
    faqs: [
      {
        question: "Is the hosting really free?",
        answer:
          "Yes! All hosting providers listed on FreeHosts offer genuinely free tiers with no credit card required. We rigorously verify that there are no hidden fees or deceptive practices.",
      },
      {
        question: "Do I need a credit card to sign up?",
        answer:
          "No! All providers listed in our directory offer free tiers that don't require credit card information. You can sign up and start hosting immediately with just an email address.",
      },
      {
        question: "What can I host for free?",
        answer:
          "You can host static websites, dynamic web applications, Discord bots, APIs, databases, serverless functions, and more. Different providers specialize in different types of hosting.",
      },
      {
        question: "Are there any limitations on free hosting?",
        answer:
          "Yes, free tiers typically have resource limitations such as bandwidth caps, storage limits, and CPU/RAM restrictions. However, these limits are usually generous enough for personal projects and learning.",
      },
    ],
  },
  {
    category: "Finding the Right Host",
    icon: ["fas", "magnifying-glass"] as IconProp,
    faqs: [
      {
        question: "How do I choose the right hosting provider?",
        answer:
          "Consider your project's needs: the programming language/framework, required resources, geographic location, special features (databases, cron jobs, SSL), and deployment method. Use our filtering system to narrow down providers.",
      },
      {
        question: "Which hosting is best for Discord bots?",
        answer:
          "For Discord bots, look for providers offering 24/7 uptime, persistent processes, adequate RAM (at least 512MB), support for Node.js or Python, and automatic restarts. Filter by 'Discord Bot Hosting' in our directory.",
      },
      {
        question: "What's the difference between static and dynamic hosting?",
        answer:
          "Static hosting serves pre-built HTML, CSS, and JavaScript files—perfect for portfolios and JAMstack apps. Dynamic hosting runs server-side code and can handle databases and real-time functionality.",
      },
    ],
  },
  {
    category: "Technical Questions",
    icon: ["fas", "gear"] as IconProp,
    faqs: [
      {
        question: "Do I get SSL/HTTPS for free?",
        answer:
          "Yes! Most modern free hosting providers automatically provide free SSL certificates through Let's Encrypt or similar services. HTTPS is now standard even for free tiers.",
      },
      {
        question: "Can I use databases with free hosting?",
        answer:
          "Absolutely! Many free hosting providers include database support. You can find free MySQL, PostgreSQL, MongoDB, Redis, and other database services. Storage limits vary by provider.",
      },
      {
        question: "Can I run cron jobs or scheduled tasks?",
        answer:
          "Many free hosting providers support cron jobs, though this varies. Some platforms offer built-in cron functionality, while others require external services or GitHub Actions.",
      },
    ],
  },
  {
    category: "Performance & Reliability",
    icon: ["fas", "bolt"] as IconProp,
    faqs: [
      {
        question: "How reliable is free hosting?",
        answer:
          "Reliability varies by provider, which is why we rigorously test and monitor uptime. Many free hosting providers achieve 99%+ uptime, comparable to paid services.",
      },
      {
        question: "Will my free hosted site be slow?",
        answer:
          "Not necessarily! Many free providers use modern infrastructure with NVMe SSDs and CDN integration. Performance depends on the provider and your application's optimization.",
      },
      {
        question: "What happens if I exceed the free tier limits?",
        answer:
          "Most providers will either throttle your service, pause your application, or ask you to upgrade. We document each provider's overage policies in their listing.",
      },
    ],
  },
  {
    category: "About FreeHosts",
    icon: ["fas", "circle-info"] as IconProp,
    faqs: [
      {
        question: "How do you verify hosting providers?",
        answer:
          "Our verification includes manual technical review, hands-on testing with real applications, uptime monitoring, community feedback, and continuous post-listing monitoring.",
      },
      {
        question: "Do you get paid to list hosts?",
        answer:
          "No. We do not accept payment for listings, and rankings are never influenced by affiliate commissions. Providers are listed purely based on quality and community feedback.",
      },
      {
        question: "How can I submit a hosting provider?",
        answer:
          "Visit our Submit page or share it in our Discord community. Our team will review, verify, and add it if it meets our quality standards.",
      },
    ],
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredCategories = FAQ_CATEGORIES.map((cat) => ({
    ...cat,
    faqs: cat.faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase()),
    ),
  })).filter((cat) => cat.faqs.length > 0);

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      {/* Hero Section */}
      <section className="pt-12 pb-16 lg:pt-24 lg:pb-20">
        <div className="container-default text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl gradient-bg mb-6">
              <FontAwesomeIcon
                icon={["fas", "circle-question"]}
                className="text-2xl text-white"
              />
            </div>

            <h1 className="heading-1 text-[rgb(var(--text))] mb-4">
              Frequently Asked{" "}
              <span className="text-[rgb(var(--accent))]">Questions</span>
            </h1>

            <p className="body-large text-[rgb(var(--muted))] max-w-2xl mx-auto mb-10">
              Everything you need to know about FreeHosts and the hosting
              providers we list.
            </p>

            {/* Search Input */}
            <div className="max-w-2xl mx-auto relative">
              <FontAwesomeIcon
                icon={["fas", "magnifying-glass"]}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))]"
              />
              <input
                type="text"
                placeholder="Search for answers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-12 py-3.5 rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] text-[rgb(var(--text))] placeholder-[rgb(var(--muted)/0.6)] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] focus:border-transparent transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors"
                >
                  <FontAwesomeIcon icon={["fas", "xmark"] as IconProp} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-default pb-16 max-w-4xl">
        {filteredCategories.length > 0 ? (
          <div className="space-y-12">
            {filteredCategories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1, duration: 0.5 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[rgb(var(--accent)/0.1)] flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={category.icon}
                      className="text-[rgb(var(--accent))]"
                    />
                  </div>
                  <h2 className="heading-4 text-[rgb(var(--text))]">
                    {category.category}
                  </h2>
                </div>

                {/* FAQs */}
                <div className="space-y-3">
                  {category.faqs.map((faq, faqIndex) => {
                    const itemId = `${catIndex}-${faqIndex}`;
                    const isOpen = openItems.has(itemId);

                    return (
                      <div
                        key={faqIndex}
                        className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full flex items-center justify-between p-5 text-left hover:bg-[rgb(var(--muted)/0.03)] transition-colors"
                        >
                          <span className="font-semibold text-[rgb(var(--text))] pr-4">
                            {faq.question}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-[rgb(var(--muted))] flex-shrink-0"
                          >
                            <FontAwesomeIcon
                              icon={["fas", "chevron-down"] as IconProp}
                            />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="px-5 pb-5 text-[rgb(var(--muted))] body-default border-t border-[rgb(var(--border))] pt-4">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[rgb(var(--muted)/0.08)] flex items-center justify-center">
              <FontAwesomeIcon
                icon={["fas", "magnifying-glass"] as IconProp}
                className="text-2xl text-[rgb(var(--muted))]"
              />
            </div>
            <h3 className="heading-4 text-[rgb(var(--text))] mb-2">
              No results found
            </h3>
            <p className="text-[rgb(var(--muted))] mb-6">
              We couldn't find any questions matching &quot;{search}&quot;
            </p>
            <Button onClick={() => setSearch("")} variant="secondary">
              Clear Search
            </Button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="pb-16">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl gradient-bg p-8 md:p-12 text-center"
          >
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-white/20 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={["fas", "comments"] as IconProp}
                  className="text-2xl text-white"
                />
              </div>

              <h2 className="heading-2 text-white mb-4">
                Still Have Questions?
              </h2>

              <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
                Join our Discord community where thousands of developers discuss
                free hosting.
              </p>

              <Button
                href="https://discord.gg/QbeZ3b5CQd"
                variant="secondary"
                size="lg"
                icon={["fab", "discord"]}
                className="bg-white text-[rgb(var(--accent))] border-0 hover:bg-white/90"
              >
                Join Discord
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
