"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Host } from "@/types/host";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function CallToAction() {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHosts() {
      try {
        const res = await fetch("/api/hosts");
        const data = await res.json();
        // Get first 3 hosts
        setHosts(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch hosts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHosts();
  }, []);

  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Background gradient */}
      <div
        aria-hidden="true"
        className="-z-10 absolute inset-0 overflow-hidden"
      >
        <div className="-top-1/2 -translate-x-1/2 pointer-events-none absolute left-1/2 size-[120vh] rounded-full bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)] blur-[30px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl rounded-tr-4xl rounded-bl-4xl border bg-background dark:bg-[radial-gradient(40%_60%_at_50%_10%,--theme(--color-foreground/.08),transparent)]">
        {/* Corner decorations */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-plus absolute top-[-12.5px] left-[-12px] z-10 size-6 text-foreground/50"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-plus absolute right-[-12px] bottom-[-12.5px] z-10 size-6 text-foreground/50"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>

        <div className="flex flex-col items-center overflow-hidden rounded-bl-4xl">
          {/* Content */}
          <div className="z-10 mx-auto max-w-xl px-4 pt-8 text-center space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-medium text-2xl md:text-4xl tracking-tight"
            >
              Join Our Community
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base text-muted-foreground leading-relaxed"
            >
              Connect with thousands of developers. Share experiences, get
              recommendations, and stay updated on the latest free hosting
              solutions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="https://discord.gg/QbeZ3b5CQd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 border bg-background shadow-xs hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))] dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-10 px-6 rounded-full"
              >
                Join Discord
              </a>
              <Link
                href="/hosts"
                className="group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 border bg-[rgb(var(--accent))] text-[rgb(var(--accent-foreground))] shadow-xs hover:bg-[rgb(var(--accent))]/90 dark:border-input dark:bg-[rgb(var(--accent))] dark:hover:bg-[rgb(var(--accent))]/90 h-10 px-6 rounded-full"
              >
                Browse Hosts
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up-right group-hover:-translate-y-0.5 size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Floating cards and elements */}
          <div className="relative mt-6 flex h-60 w-full items-start justify-center [perspective:1500px]">
            {/* Floating emoji badges */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute z-30 flex animate-bounce-slow items-center gap-1 rounded-2xl border bg-card px-3 py-2 shadow-lg -top-10 left-[10%] md:left-[20%] -rotate-12"
            >
              <span className="text-xl">📨</span>
              <span className="font-bold">?</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
              className="absolute z-30 flex animate-bounce-slow items-center gap-1 rounded-2xl border bg-card px-3 py-2 shadow-lg -top-5 right-[10%] md:right-[15%] rotate-12"
            >
              <span className="text-xl">🗳️</span>
              <span className="font-bold">?</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
              className="absolute z-30 flex animate-bounce-slow items-center gap-1 rounded-2xl border bg-card px-3 py-2 shadow-lg bottom-[40%] right-[10%] md:right-[20%] rotate-6"
            >
              <span className="text-xl">🥓</span>
              <span className="font-bold">!?</span>
            </motion.div>

            {/* Event cards - stacked with opacity */}
            {!loading && hosts.length > 0 && (
              <>
                <div
                  className="pointer-events-none absolute top-8 left-1/2 opacity-40 blur-[1px]"
                  style={{
                    transform:
                      "translateX(-100%) rotateY(25deg) rotateZ(-7deg) scale(0.95)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <HostCard host={hosts[0]} />
                </div>

                {/* Center card - fully visible */}
                <div
                  className="absolute z-20 shadow-2xl ring-1 ring-white/10 rounded-xl"
                  style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <HostCard host={hosts[1] || hosts[0]} />
                </div>

                {/* Back card - slightly faded */}
                <div
                  className="pointer-events-none absolute top-8 right-1/2 opacity-40 blur-[1px]"
                  style={{
                    transform:
                      "translateX(100%) rotateY(-25deg) rotateZ(7deg) scale(0.95)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <HostCard host={hosts[2] || hosts[0]} />
                </div>
              </>
            )}

            {/* Gradient fade bottom */}
            <div className="pointer-events-none absolute bottom-0 left-0 z-40 h-32 w-full bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HostCard({ host }: { host: Host }) {
  return (
    <div className="w-xs shrink-0 rounded-xl bg-card px-2 py-3 shadow-sm md:w-md">
      <div className="flex items-center justify-between px-2 pb-2">
        <div className="flex items-center gap-1">
          {host.icon && (
            <img
              alt={host.name}
              className="size-5 rounded-full border border-muted object-cover"
              height="20"
              src={host.icon}
              width="20"
            />
          )}
          <span className="font-medium text-muted-foreground text-xs">
            {host.name}
          </span>
        </div>
        <span className="text-muted-foreground text-xs">
          {host.rating ? `${host.rating.toFixed(1)}★` : "New"}
        </span>
      </div>
      <div className="rounded-xl border border-muted-foreground/20 border-dashed bg-background p-4 shadow">
        <h3 className="mb-1 font-medium md:text-lg">{host.name}</h3>
        <p className="mb-4 flex items-center gap-2 text-xs md:text-sm">
          <span className="text-muted-foreground">Type:</span>
          <span className="inline-flex items-center gap-1">
            <span className="font-medium">{host.type}</span>
          </span>
        </p>
        <div className="border-foreground/20 border-t border-dashed pt-4">
          <h4 className="mb-2 font-medium text-sm">About</h4>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {host.description}
          </p>
        </div>
      </div>
    </div>
  );
}
