"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function toggleSidebar(open: boolean) {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (open) {
    sidebar?.classList.add("open");
    overlay?.classList.add("active");
    if (overlay) {
      overlay.style.visibility = "visible";
      overlay.style.opacity = "1";
      overlay.style.pointerEvents = "auto";
    }
    document.body.style.overflow = "hidden";
    sidebar?.setAttribute("aria-hidden", "false");
  } else {
    sidebar?.classList.remove("open");
    overlay?.classList.remove("active");
    if (overlay) {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      setTimeout(() => {
        overlay.style.visibility = "hidden";
      }, 300);
    }
    document.body.style.overflow = "";
    sidebar?.setAttribute("aria-hidden", "true");
  }
}

// Was SidebarController + RouteInitializer: two null-render usePathname()
// effects in two files. One subscription covers both: close sidebar on
// navigation + scroll-reveal for feature/staff cards.
export default function ClientChrome() {
  const pathname = usePathname();

  useEffect(() => {
    toggleSidebar(false);

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

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Element;

      if (target.closest("#sidebarToggle")) {
        toggleSidebar(true);
        return;
      }
      if (
        target.closest("#sidebarClose") ||
        target.closest("#overlay") ||
        target.closest(".sidebar-link") ||
        target.closest(".sidebar-dropdown-menu a")
      ) {
        toggleSidebar(false);
        return;
      }

      const dropdownToggle = target.closest<HTMLElement>(".sidebar-dropdown-toggle");
      if (dropdownToggle) {
        e.preventDefault();
        const dropdown = dropdownToggle.closest(".sidebar-dropdown");
        if (!dropdown) return;
        const isOpen = dropdown.classList.contains("open");
        document.querySelectorAll(".sidebar-dropdown").forEach((d) => {
          if (d !== dropdown) d.classList.remove("open");
        });
        dropdown.classList.toggle("open", !isOpen);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
