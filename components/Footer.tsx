"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import TrustpilotWidget from "./TrustpilotWidget";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Footer() {
  const [hoverPoint, setHoverPoint] = useState<{
    cx: number;
    cy: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  function handleProximityMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width) * 100;
    const cy = ((e.clientY - rect.top) / rect.height) * 100;
    setHoverPoint({
      cx: Math.max(0, Math.min(100, cx)),
      cy: Math.max(0, Math.min(100, cy)),
    });
  }

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { label: "Browse Hosts", href: "/hosts" },
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/staff" },
      { label: "FAQ", href: "/faq" },
    ],
    submit: [
      { label: "Submit a Host", href: "/submit-host" },
      { label: "Submit Layout", href: "/submit-layout" },
      { label: "Submission Rules", href: "/submission-rules" },
    ],
    legal: [
      { label: "Terms of Service", href: "/tos" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Server Rules", href: "/server-rules" },
    ],
  };

  const socialLinks = [
    {
      icon: ["fab", "discord"] as IconProp,
      link: "https://discord.gg/QbeZ3b5CQd",
      label: "Discord",
    },
    {
      icon: ["fab", "twitter"] as IconProp,
      link: "https://x.com/freehosts_",
      label: "Twitter",
    },
    {
      icon: ["fab", "instagram"] as IconProp,
      link: "https://www.instagram.com/freehosts/",
      label: "Instagram",
    },
    {
      icon: ["fab", "github"] as IconProp,
      link: "https://github.com/freehostsofficial",
      label: "GitHub",
    },
  ];

  return (
    <footer className="relative">
      {/* Proximity sensor: captures mouse when just above the footer to reveal watermark */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-24 w-full max-w-6xl h-24 pointer-events-auto z-10"
        onMouseMove={handleProximityMove}
        onMouseEnter={() => setHoverPoint({ cx: 50, cy: 70 })}
        onMouseLeave={() => setHoverPoint(null)}
        aria-hidden="true"
      />

      <div
        ref={containerRef}
        className={cn(
          "mx-auto max-w-5xl lg:border-x border-border/40 relative overflow-visible",
          "dark:bg-[radial-gradient(35%_80%_at_50%_0%,--theme(--color-foreground/.05),transparent)]",
        )}
        onMouseMove={handleProximityMove}
        onMouseLeave={() => setHoverPoint(null)}
      >
        {/* Background Text Effect */}
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 -bottom-12 -z-10 h-64 w-[140%] transition-opacity duration-300 ease-in-out pointer-events-none",
            hoverPoint ? "opacity-40 dark:opacity-20" : "opacity-0",
          )}
        >
          <TextHoverEffect text="FREEHOSTS" hoverPoint={hoverPoint} />
        </div>

        <div className="absolute inset-x-0 h-px w-full bg-border/40" />

        <div className="grid grid-cols-6 gap-8 p-6 md:p-12">
          {/* Brand section */}
          <div className="col-span-12 flex flex-col gap-6 md:col-span-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-xl font-bold transition-opacity hover:opacity-90"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-[rgb(var(--accent))] text-white shadow-sm">
                <FontAwesomeIcon icon={["fas", "bolt"]} className="text-sm" />
              </div>
              <span className="font-semibold tracking-tight text-foreground">
                FreeHosts
              </span>
            </Link>
            <p className="max-w-xs text-balance text-muted-foreground text-sm leading-relaxed">
              The trusted directory for finding verified free hosting solutions.
              Built by developers, for developers.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map((item, index) => (
                <Button
                  key={`${item.label}-${index}`}
                  size="icon-sm"
                  variant="outline"
                  asChild
                  className="rounded-lg border-border/40 bg-muted/5 hover:bg-[rgb(var(--accent)/0.15)] hover:text-[rgb(var(--accent))]"
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                  >
                    <FontAwesomeIcon icon={item.icon} className="size-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Links sections */}
          <div className="col-span-3 md:col-span-1">
            <h4 className="font-semibold text-foreground text-sm mb-4">
              Explore
            </h4>
            <div className="flex flex-col gap-3">
              {footerLinks.explore.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="w-max text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-3 md:col-span-1">
            <h4 className="font-semibold text-foreground text-sm mb-4">
              Submit
            </h4>
            <div className="flex flex-col gap-3">
              {footerLinks.submit.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="w-max text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-6 md:col-span-1">
            <h4 className="font-semibold text-foreground text-sm mb-4">
              Legal
            </h4>
            <div className="flex flex-col gap-3">
              {footerLinks.legal.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="w-max text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
            <h4 className="font-semibold text-foreground text-sm mt-8 mb-4">
              Contact
            </h4>
            <a
              href="mailto:support@freehosts.space"
              className="flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              <FontAwesomeIcon icon={["fas", "envelope"]} className="text-xs" />
              Email Support
            </a>
          </div>
        </div>

        <div className="absolute inset-x-0 h-px w-full bg-border/40" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 p-6 md:flex-row md:px-12">
          <p className="order-2 text-center text-muted-foreground text-sm md:order-1 md:text-left">
            &copy; 2023&ndash;{currentYear} FreeHosts. All rights reserved.
          </p>
          <div className="order-1 flex flex-wrap items-center justify-center gap-6 md:order-2">
            <div className="flex gap-6 border-transparent md:border-r border-border/40 md:pr-6">
              <Link
                href="/tos"
                className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy-policy"
                className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
            </div>
            <TrustpilotWidget />
          </div>
        </div>
      </div>
    </footer>
  );
}
