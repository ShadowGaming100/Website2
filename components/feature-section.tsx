"use client";

import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type React from "react";
import { motion } from "framer-motion";

type FeatureType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | IconProp;
  description: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function FeatureSection() {
  return (
    <section className="relative w-full py-24 md:py-32">
      <div className="mx-auto w-full max-w-5xl px-4 space-y-12">
        <motion.div
          className="mx-auto max-w-3xl text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-balance font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
            Everything You Need
          </h2>
          <p className="text-balance text-muted-foreground text-base md:text-lg">
            Reliable, transparent, and built for developers.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function FeatureCard({
  feature,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  feature: FeatureType;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:border-[rgb(var(--accent))] hover:shadow-lg hover:shadow-[rgb(var(--accent))]/10",
        className,
      )}
      {...props}
    >
      {/* Background gradient effect */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--accent))]/5 via-transparent to-transparent" />
      </div>

      {/* Grid pattern background */}
      <div className="-mt-2 -ml-20 mask-[radial-gradient(farthest-side_at_top,white,transparent)] pointer-events-none absolute top-0 left-1/2 size-full">
        <GridPattern
          className="absolute inset-0 size-full stroke-foreground/5 transition-colors duration-300 group-hover:stroke-foreground/10"
          height={40}
          width={40}
          x={5}
        />
      </div>

      {/* Icon */}
      <div className="relative z-10 inline-flex p-2 rounded-lg bg-[rgb(var(--accent))]/10 group-hover:bg-[rgb(var(--accent))]/20 transition-colors duration-300">
        {typeof feature.icon === "function" ? (
          <feature.icon
            aria-hidden
            className="size-5 text-[rgb(var(--accent))] transition-transform duration-300 group-hover:scale-110"
            strokeWidth={1.5}
          />
        ) : (
          <FontAwesomeIcon
            aria-hidden
            icon={feature.icon as IconProp}
            className="size-5 text-[rgb(var(--accent))] transition-transform duration-300 group-hover:scale-110"
          />
        )}
      </div>

      {/* Content */}
      <h3 className="relative z-10 mt-6 font-semibold text-base md:text-lg text-foreground tracking-tight">
        {feature.title}
      </h3>
      <p className="relative z-10 mt-2 text-muted-foreground text-sm leading-relaxed">
        {feature.description}
      </p>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[rgb(var(--accent))] to-transparent group-hover:w-full transition-all duration-300" />
    </div>
  );
}

const features: FeatureType[] = [
  {
    title: "Verified & Trusted",
    icon: ["fas", "shield"] as IconProp,
    description:
      "Every host undergoes rigorous testing. No scams, no hidden fees.",
  },
  {
    title: "High Performance",
    icon: ["fas", "bolt"] as IconProp,
    description: "Modern infrastructure with NVMe SSDs and optimized networks.",
  },
  {
    title: "Community Driven",
    icon: ["fas", "users"] as IconProp,
    description: "Built by developers. Real reviews from real users.",
  },
  {
    title: "Smart Filtering",
    icon: ["fas", "search"] as IconProp,
    description: "Find the perfect host by tech stack, location, or resources.",
  },
  {
    title: "Always Updated",
    icon: ["fas", "rotate"] as IconProp,
    description: "Real-time monitoring ensures accurate, current information.",
  },
  {
    title: "Expert Guides",
    icon: ["fas", "book"] as IconProp,
    description: "Comprehensive tutorials for deployment and optimization.",
  },
] as const;
