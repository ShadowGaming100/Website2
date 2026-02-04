"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CountingNumber } from "@/components/animate-ui/primitives/texts/counting-number";
import { FeatureSection } from "@/components/feature-section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Terminal from "@/components/Terminal";
import TrustpilotWidget from "@/components/TrustpilotWidget";
import Hero from "@/components/hero";
import CallToAction from "@/components/CallToAction";

const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function HomePage() {
  // Replaced animated counter with animate-ui CountingNumber component

  const stats = [
    {
      value: (
        <>
          <CountingNumber number={100} />+
        </>
      ),
      label: "Verified Hosts",
      icon: ["fas", "server"] as IconProp,
    },
    {
      value: (
        <>
          <CountingNumber number={5000} />+
        </>
      ),
      label: "Active Users",
      icon: ["fas", "users"] as IconProp,
    },
    {
      value: (
        <>
          <CountingNumber number={99.9} decimalPlaces={1} />%
        </>
      ),
      label: "Avg Uptime",
      icon: ["fas", "signal"] as IconProp,
    },
  ];

  const hostingTypes = [
    {
      title: "Static Sites",
      description: "HTML, CSS, JS with CDN",
      icon: ["fas", "code"] as IconProp,
    },
    {
      title: "Discord Bots",
      description: "24/7 bot hosting",
      icon: ["fab", "discord"] as IconProp,
    },
    {
      title: "Node.js",
      description: "Full-stack apps",
      icon: ["fab", "node-js"] as IconProp,
    },
    {
      title: "Databases",
      description: "SQL & NoSQL",
      icon: ["fas", "database"] as IconProp,
    },
    {
      title: "Python",
      description: "Django, Flask",
      icon: ["fab", "python"] as IconProp,
    },
    {
      title: "Cloud & VPS",
      description: "Root access",
      icon: ["fas", "cloud"] as IconProp,
    },
  ];

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      <Hero />
      {/* Stats Section */}
      <section className="py-12 border-y border-[rgb(var(--border))] bg-[rgb(var(--card))]">
        <div className="container-default">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="text-3xl font-bold text-[rgb(var(--text))] mb-2">
                  {stat.value}
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[rgb(var(--muted))] uppercase tracking-wider">
                  <FontAwesomeIcon
                    icon={stat.icon}
                    className="text-[rgb(var(--accent))]"
                  />
                  <span>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div>
        {/* Hosting Types Section */}
        <section className="section-padding bg-[rgb(var(--bg))]">
          <div className="container-default">
            <div className="text-center mb-16">
              <h2 className="heading-2 text-[rgb(var(--text))] mb-4">
                Every Type of Hosting
              </h2>
              <p className="body-default text-[rgb(var(--muted))] max-w-2xl mx-auto">
                From simple static sites to complex full-stack applications, we
                verify them all.
              </p>
            </div>

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
                  className="group p-5 rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent)/0.5)] transition-all text-center card-hover"
                >
                  <div className="w-10 h-10 mx-auto mb-4 rounded-lg bg-[rgb(var(--muted)/0.1)] flex items-center justify-center group-hover:bg-[rgb(var(--accent)/0.1)] group-hover:text-[rgb(var(--accent))] transition-colors">
                    <FontAwesomeIcon icon={type.icon} className="text-lg" />
                  </div>
                  <h3 className="font-semibold text-[rgb(var(--text))] text-sm mb-1">
                    {type.title}
                  </h3>
                  <p className="text-xs text-[rgb(var(--muted))]">
                    {type.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-[rgb(var(--card))] border-y border-[rgb(var(--border))]">
          <div className="container-default">
            <FeatureSection />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section-padding bg-[rgb(var(--bg))]">
          <div className="container-default">
            <div className="text-center mb-16">
              <h2 className="heading-2 text-[rgb(var(--text))] mb-4">
                How It Works
              </h2>
              <p className="body-default text-[rgb(var(--muted))] max-w-2xl mx-auto">
                Finding the right free hosting is simple with FreeHosts.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Browse Directory",
                  description:
                    "Explore our curated directory of verified free hosting providers",
                  icon: ["fas", "search"] as IconProp,
                },
                {
                  step: "02",
                  title: "Compare Features",
                  description:
                    "Filter by features, resources, and technology stack",
                  icon: ["fas", "filter"] as IconProp,
                },
                {
                  step: "03",
                  title: "Deploy Project",
                  description: "Sign up and launch your project in minutes",
                  icon: ["fas", "rocket"] as IconProp,
                },
              ].map((item, i) => (
                <div key={i} className="relative text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] flex items-center justify-center text-[rgb(var(--text))] shadow-sm group-hover:border-[rgb(var(--accent))] transition-colors">
                    <FontAwesomeIcon icon={item.icon} className="text-2xl" />
                  </div>
                  <div className="text-xs font-bold text-[rgb(var(--accent))] mb-3 tracking-widest uppercase">
                    {item.step}
                  </div>
                  <h3 className="heading-4 text-[rgb(var(--text))] mb-3">
                    {item.title}
                  </h3>
                  <p className="body-small text-[rgb(var(--muted))]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CallToAction />

        {/* Old CTA Section - Removed */}
      </div>
    </div>
  );
}
