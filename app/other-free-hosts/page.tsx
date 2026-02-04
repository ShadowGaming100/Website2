"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Button } from "@/components/ui/button";

export default function OtherFreeHostsPage() {
  const platforms = [
    {
      name: "Free Minecraft Hostings",
      short: "FMH",
      description:
        "Curated collection of free hosting providers specifically for Minecraft servers featuring detailed reviews, comparisons, and community ratings within various configurations and performance options.",
      website: "https://freeminecrafthostings.com/",
      discord: "https://discord.gg/sc2kauFE3D",
    },
    {
      name: "Free Minecraft Hosts List",
      short: null,
      image: "/Src/Images/fmhl.png",
      description:
        "A comprehensive directory dedicated to free Minecraft server hosting providers, helping you find the perfect host for your server.",
      website: "https://myuui.com/",
      discord: "https://discord.gg/JzvVMZ9Zrm",
    },
    {
      name: "Free Low Minecraft Hostings",
      short: "FLMH",
      description:
        "Specialized directory for low-resource Minecraft hosting solutions that are optimized for budget-conscious users.",
      website: "https://flhl.whiteik.xyz/",
      discord: null,
    },
  ];

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      {/* Header Section */}
      <section className="pt-24 pb-12">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <Link
              href="/hosts"
              className="inline-flex items-center gap-2 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors mb-6"
            >
              <FontAwesomeIcon icon={["fas", "arrow-left"] as IconProp} />
              Back to hosts
            </Link>

            <h1 className="heading-1 text-[rgb(var(--text))] mb-4">
              Other Free{" "}
              <span className="text-[rgb(var(--accent))]">
                Hosting Platforms
              </span>
            </h1>
            <p className="body-large text-[rgb(var(--muted))]">
              Explore a curated collection of reliable platforms offering free
              hosting services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-default pb-24">
        {/* Info Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl p-6 mb-12 flex flex-col sm:flex-row gap-4 items-start"
        >
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-500">
            <FontAwesomeIcon icon={["fas", "circle-info"] as IconProp} />
          </div>
          <div>
            <h3 className="font-semibold text-[rgb(var(--text))] mb-2">
              Important Information
            </h3>
            <p className="text-sm text-[rgb(var(--muted))] leading-relaxed">
              The platforms listed below are independent services not managed by
              FreeHosts. We've included them as a helpful resource for our
              community. While we've carefully selected these options, we cannot
              guarantee their availability, quality, or reliability. Always
              review each platform's terms of service before use.
            </p>
          </div>
        </motion.div>

        {/* Section Header */}
        <div className="mb-8">
          <h2 className="heading-3 text-[rgb(var(--text))]">
            Specialized Directories
          </h2>
        </div>

        {/* Platforms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6 hover:border-[rgb(var(--accent)/0.3)] transition-all card-hover flex flex-col h-full"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-lg shadow-sm overflow-hidden flex-shrink-0">
                  {platform.image ? (
                    <Image
                      src={platform.image}
                      alt={platform.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{platform.short}</span>
                  )}
                </div>
                <h3 className="font-semibold text-[rgb(var(--text))] leading-tight line-clamp-2">
                  {platform.name}
                </h3>
              </div>

              {/* Description */}
              <p className="body-small text-[rgb(var(--muted))] mb-6 flex-1 line-clamp-4">
                {platform.description}
              </p>

              {/* Links */}
              <div className="flex gap-3 pt-4 border-t border-[rgb(var(--border))] mt-auto">
                {platform.website && (
                  <Button
                    href={platform.website}
                    variant="primary"
                    size="sm"
                    icon={["fas", "arrow-up-right-from-square"] as IconProp}
                    className="flex-1"
                  >
                    Visit
                  </Button>
                )}
                {platform.discord && (
                  <Button
                    href={platform.discord}
                    variant="secondary"
                    size="sm"
                    icon={["fab", "discord"] as IconProp}
                    className="flex-1"
                  >
                    Discord
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
