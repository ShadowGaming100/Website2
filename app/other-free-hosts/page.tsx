'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Button } from '@/components/ui/Button';

export default function OtherFreeHostsPage() {
  const platforms = [
    {
      name: 'Free Minecraft Hostings',
      short: 'FMH',
      description: 'Curated collection of free hosting providers specifically for Minecraft servers featuring detailed reviews, comparisons, and community ratings with various configurations and performance options.',
      website: 'https://freeminecrafthostings.com/',
      discord: 'https://discord.gg/sc2kauFE3D'
    },
    {
      name: 'Free Minecraft Hosts List',
      short: null,
      image: '/Src/Images/fmhl.png',
      description: 'A comprehensive directory dedicated to free Minecraft server hosting providers, help you find the perfect host for your server.',
      website: 'https://myuui.com/',
      discord: 'https://discord.gg/JzvVMZ9Zrm'
    },
    {
      name: 'Free Low Minecraft Hostings',
      short: 'FLMH',
      description: 'Specialized directory for low-resource Minecraft hosting solutions that are optimized for budget-conscious users.',
      website: 'https://flhl.whiteik.xyz/',
      discord: null
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
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[rgb(var(--accent)/0.1)] flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon icon={['fas', 'list-ul'] as IconProp} className="text-3xl text-[rgb(var(--accent))]" />
              </div>
              <div className="flex-1">
                <h1 className="heading-2 text-[rgb(var(--text))] mb-2">Other Free Hosting Platforms</h1>
                <p className="body-default text-[rgb(var(--muted))]">
                  Explore a curated collection of reliable platforms offering free hosting services
                </p>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-6 pt-6 border-t border-[rgb(var(--border))]">
              <Link
                href="/hosts"
                className="inline-flex items-center gap-2 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors"
              >
                <FontAwesomeIcon icon={['fas', 'arrow-left'] as IconProp} />
                Back to hosts
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-default py-8">
        {/* Info Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={['fas', 'circle-info'] as IconProp} className="text-blue-500 mt-1" />
            <div>
              <h3 className="font-semibold text-[rgb(var(--text))] mb-2">Important Information</h3>
              <p className="body-small text-[rgb(var(--muted))]">
                The platforms listed below are independent services not managed by FreeHosts. We&apos;ve included them as a helpful resource for our community. While we&apos;ve carefully selected these options, we cannot guarantee their availability, quality, or reliability. Always review each platform&apos;s terms of service before use.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section Header */}
        <div className="mb-8">
          <h2 className="heading-3 text-[rgb(var(--text))] mb-2">Specialized Hosting Directories</h2>
          <p className="body-default text-[rgb(var(--muted))]">
            Comprehensive directories focused on specific types of hosting services.
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6 hover:border-[rgb(var(--accent)/0.5)] hover:shadow-medium transition-all group"
            >
              {/* Icon/Logo */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg group-hover:scale-110 transition-transform overflow-hidden">
                  {platform.image ? (
                    <Image src={platform.image} alt={platform.name} width={64} height={64} className="w-full h-full object-cover" />
                  ) : (
                    <span>{platform.short}</span>
                  )}
                </div>
                <h3 className="font-semibold text-[rgb(var(--text))] mb-2 leading-tight">
                  {platform.name}
                </h3>
              </div>

              {/* Description */}
              <p className="body-small text-[rgb(var(--muted))] mb-6 line-clamp-4">
                {platform.description}
              </p>

              {/* Links */}
              <div className="flex gap-3 mt-auto pt-4 border-t border-[rgb(var(--border))]">
                {platform.website && (
                  <Button
                    href={platform.website}
                    variant="primary"
                    size="sm"
                    icon={['fas', 'arrow-up-right-from-square'] as IconProp}
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
                    icon={['fab', 'discord'] as IconProp}
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
