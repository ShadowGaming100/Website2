'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Button } from '@/components/ui/Button';

export default function SubmitHostPage() {
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
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl gradient-bg flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon icon={['fas', 'server'] as IconProp} className="text-3xl text-white" />
              </div>
              <div className="flex-1">
                <h1 className="heading-2 text-[rgb(var(--text))] mb-2">Submit Host</h1>
                <p className="body-default text-[rgb(var(--muted))]">
                  Help our community by submitting a free hosting provider
                </p>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-6 pt-6 border-t border-[rgb(var(--border))]">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors"
              >
                <FontAwesomeIcon icon={['fas', 'arrow-left'] as IconProp} />
                Back to home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-default py-8">
        <div className="max-w-3xl mx-auto">
          {/* Under Construction Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-8 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[rgb(var(--accent)/0.1)] flex items-center justify-center">
              <FontAwesomeIcon icon={['fas', 'code-branch'] as IconProp} className="text-4xl text-[rgb(var(--accent))]" />
            </div>

            <h2 className="heading-3 text-[rgb(var(--text))] mb-4">
              Under Construction
            </h2>

            <p className="body-default text-[rgb(var(--muted))] mb-8 max-w-lg mx-auto">
              We&apos;re working hard to bring you our host submission form. This page is currently being built and will be available soon.
            </p>

            {/* Progress Bar */}
            <div className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-[rgb(var(--text))] mb-4 flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={['fas', 'code-branch'] as IconProp} className="text-[rgb(var(--accent))]" />
                Development Status
              </h3>
              <p className="body-small text-[rgb(var(--muted))] mb-6">
                We are currently implementing the submission logic and backend integration to ensure a smooth process.
              </p>

              <div className="w-full h-2 bg-[rgb(var(--muted)/0.1)] rounded-full overflow-hidden mb-2">
                <div className="h-full gradient-bg w-[60%] rounded-full" />
              </div>
              <div className="flex justify-between text-xs text-[rgb(var(--muted))] font-semibold">
                <span>Progress</span>
                <span>60%</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/submission-rules"
                variant="primary"
                icon={['fas', 'list-check'] as IconProp}
              >
                Read Submission Rules
              </Button>
              <Button
                href="https://discord.gg/QbeZ3b5CQd"
                variant="secondary"
                icon={['fab', 'discord'] as IconProp}
              >
                Join Discord
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
