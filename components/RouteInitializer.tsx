"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll-reveal animation for feature/staff cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document
      .querySelectorAll<Element>(".feature-card, .staff-card")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
