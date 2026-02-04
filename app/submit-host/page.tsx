"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Button } from "@/components/ui/button";

export default function SubmitHostPage() {
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-bg mb-6 text-white shadow-lg">
              <FontAwesomeIcon
                icon={["fas", "server"] as IconProp}
                className="text-3xl"
              />
            </div>

            <h1 className="heading-1 text-[rgb(var(--text))] mb-4">
              Submit a <span className="text-[rgb(var(--accent))]">Host</span>
            </h1>
            <p className="body-large text-[rgb(var(--muted))]">
              Help our community by submitting a free hosting provider.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Under Construction Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-8 md:p-12 text-center shadow-soft"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[rgb(var(--muted)/0.05)] flex items-center justify-center">
              <FontAwesomeIcon
                icon={["fas", "person-digging"] as IconProp}
                className="text-4xl text-[rgb(var(--muted))]"
              />
            </div>

            <h2 className="heading-3 text-[rgb(var(--text))] mb-4">
              Coming Soon
            </h2>

            <p className="body-default text-[rgb(var(--muted))] mb-8 max-w-lg mx-auto leading-relaxed">
              We&apos;re working hard to build a seamless submission experience.
              This feature is technically complex and requires careful security
              implementation.
            </p>

            {/* Progress Bar */}
            <div className="bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl p-6 mb-10 text-left">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-[rgb(var(--text))] flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={["fas", "bars-progress"] as IconProp}
                    className="text-[rgb(var(--accent))]"
                  />
                  Development Status
                </h3>
                <span className="text-sm font-bold text-[rgb(var(--accent))]">
                  60%
                </span>
              </div>

              <div className="w-full h-2.5 bg-[rgb(var(--muted)/0.1)] rounded-full overflow-hidden mb-3">
                <div className="h-full gradient-bg w-[60%] rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>

              <p className="text-xs text-[rgb(var(--muted))]">
                Currently implementing backend validation and anti-spam
                measures.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/submission-rules"
                variant="primary"
                icon={["fas", "list-check"] as IconProp}
              >
                Read Rules
              </Button>
              <Button
                href="https://discord.gg/QbeZ3b5CQd"
                variant="secondary"
                icon={["fab", "discord"] as IconProp}
              >
                Join Discord
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-[rgb(var(--border))]">
              <Link
                href="/"
                className="text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors inline-flex items-center gap-2"
              >
                <FontAwesomeIcon icon={["fas", "arrow-left"] as IconProp} />
                Back to home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
