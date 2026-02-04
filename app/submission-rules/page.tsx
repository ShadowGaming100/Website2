'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Button } from '@/components/ui/Button';

export default function SubmissionRulesPage() {
  const ruleCategories: { title: string; icon: IconProp; color: string; rules: string[] }[] = [
    {
      title: 'Security',
      icon: ['fas', 'shield-halved'] as IconProp,
      color: 'red',
      rules: [
        'No malicious code, malware, or backdoors',
        'No data harvesting or unauthorized tracking',
        'Secure your panel and billing system'
      ]
    },
    {
      title: 'Service',
      icon: ['fas', 'server'] as IconProp,
      color: 'green',
      rules: [
        'Must provide a free tier that is usable without payment',
        'Resource specifications must be accurate',
        'Uptime should be reasonable for a free service',
        'Must clearly state if resources are dedicated or shared'
      ]
    },
    {
      title: 'Policies',
      icon: ['fas', 'file-contract'] as IconProp,
      color: 'purple',
      rules: [
        'Must have clear Terms of Service (ToS)',
        'Must have a transparent Privacy Policy',
        'Must disclose any data collection practices'
      ]
    },
    {
      title: 'Software',
      icon: ['fas', 'code'] as IconProp,
      color: 'indigo',
      rules: [
        'You cannot use nulled software (WHMCS, Blesta, etc.)',
        'We do not support nulled software in any way'
      ]
    },
    {
      title: 'Conduct',
      icon: ['fas', 'user-shield'] as IconProp,
      color: 'orange',
      rules: [
        'Be professional and respectful to users',
        'Address support tickets in a timely manner',
        'Do not engage in deceptive marketing practices'
      ]
    },
    {
      title: 'Renewal',
      icon: ['fas', 'rotate'] as IconProp,
      color: 'teal',
      rules: [
        'If your host has renewal, you must state exactly how to renew and how long the server lasts',
        'Renewal terms must be clear and reasonable'
      ]
    },
    {
      title: 'Enforcement',
      icon: ['fas', 'gavel'] as IconProp,
      color: 'slate',
      rules: [
        'Violations may result in removal from FreeHosts',
        'Serious or repeated violations can lead to a ban',
        'We reserve the right to remove any host at our discretion'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      {/* Header Section */}
      <section className="pt-24 pb-12">
        <div className="container-default text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <Link
              href="/submit-host"
              className="inline-flex items-center gap-2 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors mb-6"
            >
              <FontAwesomeIcon icon={['fas', 'arrow-left'] as IconProp} />
              Back to submission
            </Link>

            <h1 className="heading-1 text-[rgb(var(--text))] mb-4">
              Submission <span className="text-[rgb(var(--accent))]">Rules</span>
            </h1>
            <p className="body-large text-[rgb(var(--muted))]">
              Please read these rules carefully before submitting your host.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-default pb-24">
        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl p-6 mb-12 flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 text-amber-500">
            <FontAwesomeIcon icon={['fas', 'triangle-exclamation']} />
          </div>
          <div>
            <h3 className="font-semibold text-[rgb(var(--text))] mb-1">Important Requirement</h3>
            <p className="text-sm text-[rgb(var(--muted))]">
              Failure to follow these guidelines may result in your submission being rejected. Submissions not following the required layout will be ignored.
            </p>
          </div>
        </motion.div>

        {/* Rules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {ruleCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6 hover:border-[rgb(var(--accent)/0.3)] transition-all card-hover"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-lg bg-[rgb(var(--muted)/0.05)] flex items-center justify-center text-[rgb(var(--text))]`}>
                  <FontAwesomeIcon icon={category.icon} />
                </div>
                <h3 className="font-semibold text-[rgb(var(--text))] text-lg">{category.title}</h3>
              </div>
              <ul className="space-y-3">
                {category.rules.map((rule, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[rgb(var(--muted))]">
                    <FontAwesomeIcon icon={['fas', 'check']} className={`text-[rgb(var(--accent))] mt-1 text-xs flex-shrink-0`} />
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Layout Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-8 mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="flex-1">
              <h2 className="heading-3 text-[rgb(var(--text))] mb-4">Submission Layout</h2>
              <p className="body-default text-[rgb(var(--muted))] mb-6">
                If a host has multiple targets, you must list the specs for each target separately. All hosts must follow the required format.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button href="/submit-layout" variant="primary" icon={['fas', 'wand-magic-sparkles']}>
                  Use Layout Builder
                </Button>
              </div>
            </div>

            <div className="flex-1 w-full md:max-w-md">
              <div className="bg-[rgb(var(--bg))] rounded-xl p-5 font-mono text-xs md:text-sm overflow-x-auto border border-[rgb(var(--border))] text-[rgb(var(--muted))] leading-relaxed shadow-inner">
                <pre>{`Host Name:
Targets:
Specs:

For <Target 1>:
  • RAM:
  • CPU (vCores/Percentage):
  • Disk:

For <Target 2> (if any):
  • RAM:
  • CPU (vCores/Percentage):
  • Disk:

Links: (ToS, Privacy Policy, plan links)
Information: (Renewal info, duration, coins needed, notes)`}</pre>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="heading-3 text-[rgb(var(--text))] mb-4">Ready to Submit?</h2>
          <p className="body-default text-[rgb(var(--muted))] mb-8">
            If your hosting service meets all the requirements above, you can proceed.
          </p>
          <Button href="/submit-host" variant="secondary" size="lg" icon={['fas', 'arrow-right']}>
            Return to Submission
          </Button>
        </div>
      </div>
    </div>
  );
}
