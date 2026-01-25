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
      {/* Hero Banner */}
      <section className="relative">
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
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl gradient-bg flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon icon={['fas', 'clipboard-list']} className="text-3xl text-white" />
              </div>
              <div className="flex-1">
                <h1 className="heading-2 text-[rgb(var(--text))] mb-2">Hosting Submission Rules</h1>
                <p className="body-default text-[rgb(var(--muted))]">
                  Please read these rules carefully before submitting your host
                </p>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-6 pt-6 border-t border-[rgb(var(--border))]">
              <Link
                href="/submit-host"
                className="inline-flex items-center gap-2 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors"
              >
                <FontAwesomeIcon icon={['fas', 'arrow-left']} />
                Back to submission
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-default py-8">
        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={['fas', 'triangle-exclamation']} className="text-amber-500 mt-1" />
            <div>
              <h3 className="font-semibold text-[rgb(var(--text))] mb-2">Important</h3>
              <p className="body-small text-[rgb(var(--muted))]">
                Failure to follow these guidelines may result in your submission being rejected. Submissions not following the required layout will be ignored.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Rules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {ruleCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6 hover:border-[rgb(var(--accent)/0.3)] transition-all"
            >
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[rgb(var(--border))]">
                <div className={`w-10 h-10 rounded-lg bg-${category.color}-500/10 flex items-center justify-center`}>
                  <FontAwesomeIcon icon={category.icon} className={`text-${category.color}-500`} />
                </div>
                <h3 className="font-semibold text-[rgb(var(--text))]">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.rules.map((rule, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[rgb(var(--muted))]">
                    <FontAwesomeIcon icon={['fas', 'check']} className={`text-${category.color}-500 mt-1 text-xs flex-shrink-0`} />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Layout Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-8 mb-8"
        >
          <h2 className="heading-4 text-[rgb(var(--text))] mb-4">Submission Layout</h2>
          <p className="body-default text-[rgb(var(--muted))] mb-6">
            If a host has multiple targets, you must list the specs for each target separately. All hosts must follow the required layout:
          </p>

          <div className="bg-[rgb(var(--muted)/0.05)] rounded-xl p-4 font-mono text-sm mb-4 overflow-x-auto border border-[rgb(var(--border))]">
            <pre className="text-[rgb(var(--text))]">{`Host Name:
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

          <div className="flex flex-col sm:flex-row gap-3">
            <Button href="/submit-layout" variant="secondary" icon={['fas', 'lightbulb']}>
              Use Layout Builder
            </Button>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-8 text-center"
        >
          <h2 className="heading-3 text-[rgb(var(--text))] mb-4">Ready to Submit?</h2>
          <p className="body-default text-[rgb(var(--muted))] mb-6 max-w-2xl mx-auto">
            If your hosting service meets all the requirements above, click the button below to proceed to the submission form.
          </p>
          <Button href="/submit-host" variant="primary" size="lg" icon={['fas', 'paper-plane']}>
            Proceed to Submission
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
