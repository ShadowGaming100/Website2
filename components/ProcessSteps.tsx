"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Step = {
  step: string;
  title: string;
  description: string;
  icon: IconProp;
};

const STEPS: Step[] = [
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
    description: "Filter by features, resources, and technology stack",
    icon: ["fas", "filter"] as IconProp,
  },
  {
    step: "03",
    title: "Deploy Project",
    description: "Sign up and launch your project in minutes",
    icon: ["fas", "rocket"] as IconProp,
  },
];

export default function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iconRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState<number | null>(null);
  const [triggered, setTriggered] = useState<boolean>(false);
  const controls = useAnimation();

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggered) {
            // trigger from first step when the block scrolls into view
            runChain(0);
            setTriggered(true);
          }
        });
      },
      { threshold: 0.25 },
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current]);

  // Utility: get center of an element relative to container
  function getCenter(el?: HTMLElement | null) {
    if (!el || !containerRef.current) return { x: 0, y: 0 };
    const cRect = containerRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      x: r.left + r.width / 2 - cRect.left,
      y: r.top + r.height / 2 - cRect.top,
    };
  }

  // Emit particles from source index to target index and return a promise that resolves when done
  function emitParticles(fromIndex: number, toIndex: number) {
    return new Promise<void>((resolve) => {
      const fromEl = iconRefs.current[fromIndex];
      const toEl = iconRefs.current[toIndex];
      if (!fromEl || !toEl || !containerRef.current) return resolve();

      const from = getCenter(fromEl);
      const to = getCenter(toEl);
      const particleCount = 6;
      const parent = containerRef.current;

      const particles: HTMLDivElement[] = [];
      for (let i = 0; i < particleCount; i++) {
        const p = document.createElement("div");
        p.className = `absolute pointer-events-none w-2 h-2 rounded-full bg-[rgba(99,102,241,0.95)] blur-sm`;
        p.style.left = `${from.x}px`;
        p.style.top = `${from.y}px`;
        p.style.transform = `translate(-50%, -50%)`;
        parent.appendChild(p);
        particles.push(p);

        const delay = i * 0.06 + Math.random() * 0.12;
        // animate using element.animate for minimal dependencies
        const keyframes = [
          {
            transform: `translate(${from.x - 50}px, ${from.y - 50}px) scale(0.8)`,
            opacity: 1,
          },
          {
            transform: `translate(${to.x - 50}px, ${to.y - 50}px) scale(0.6)`,
            opacity: 0.9,
          },
          {
            transform: `translate(${to.x - 40}px, ${to.y - 40}px) scale(0.2)`,
            opacity: 0,
          },
        ];
        const anim = p.animate(keyframes, {
          duration: 700 + Math.random() * 200,
          easing: "cubic-bezier(.2,.9,.2,1)",
          delay: delay * 1000,
        });
        if (i === particleCount - 1) {
          anim.onfinish = () => {
            particles.forEach((el) => el.remove());
            resolve();
          };
        }
      }
    });
  }

  // animate icon wiggle & pulse for index
  async function animateIcon(index: number) {
    const el = iconRefs.current[index];
    if (!el) return;
    // wiggle using keyframes
    el.animate(
      [
        { transform: "rotate(-6deg) scale(0.98)" },
        { transform: "rotate(8deg) scale(1.02)" },
        { transform: "rotate(-4deg) scale(1)" },
      ],
      { duration: 420, easing: "ease-in-out" },
    );
    // small glow pulse
    el.animate(
      [
        { boxShadow: "0 6px 20px rgba(99,102,241,0.0)", filter: "blur(0px)" },
        { boxShadow: "0 12px 38px rgba(99,102,241,0.14)", filter: "blur(4px)" },
        { boxShadow: "0 6px 20px rgba(99,102,241,0.0)", filter: "blur(0px)" },
      ],
      { duration: 600, easing: "ease-out" },
    );
    // slight delay so it feels lively
    await new Promise((r) => setTimeout(r, 220));
  }

  // chain reaction
  async function runChain(start: number) {
    for (let i = start; i < STEPS.length; i++) {
      setActive(i);
      await animateIcon(i);
      if (i < STEPS.length - 1) {
        await emitParticles(i, i + 1);
      } else {
        // final rocket flourish
        const rocket = iconRefs.current[i];
        if (rocket) {
          rocket.animate(
            [
              {
                transform: "translateY(0) scale(1)",
                filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
              },
              {
                transform: "translateY(-26px) scale(1.08)",
                filter: "drop-shadow(0 8px 24px rgba(99,102,241,0.28))",
              },
              {
                transform: "translateY(0) scale(1)",
                filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
              },
            ],
            { duration: 700, easing: "cubic-bezier(.2,.9,.2,1)" },
          );
        }
      }
      // small pause between chain steps
      await new Promise((r) => setTimeout(r, 140));
    }
    setActive(null);
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="grid md:grid-cols-3 gap-12 w-full">
        {STEPS.map((item, i) => (
          <div
            key={i}
            className={`relative text-center group rounded-2xl p-6 bg-[rgb(var(--card))] border border-[rgb(var(--border))] transition-all shadow-lg hover:scale-[1.01] backdrop-blur-sm`}
            onMouseEnter={() => runChain(i)}
          >
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] flex items-center justify-center text-[rgb(var(--text))] shadow-md"
              ref={(el) => { iconRefs.current[i] = el }}
            >
              <div className="relative inline-flex items-center justify-center size-10">
                <motion.div
                  animate={
                    i === active
                      ? { scale: [1, 1.06, 1], rotate: [0, 6, -6, 0] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.45 }}
                  className="size-8 text-[rgb(var(--accent))]"
                >
                  <FontAwesomeIcon icon={item.icon} className="text-2xl" />
                </motion.div>
                {/* subtle neon glow */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow:
                      i === active
                        ? "0 18px 60px rgba(99,102,241,0.12)"
                        : "0 8px 30px rgba(0,0,0,0)",
                  }}
                />
              </div>
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
            {/* pulse ring when active */}
            {i === active && (
              <motion.div
                layoutId={`pulse-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: [0.9, 1.04, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 rounded-2xl border-[rgba(99,102,241,0.06)] pointer-events-none"
                style={{ boxShadow: "0 12px 48px rgba(99,102,241,0.08)" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
