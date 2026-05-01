"use client";

import { useEffect } from "react";

function getTheme(): string {
  try {
    return (
      localStorage.getItem("fh_theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    );
  } catch {
    return "light";
  }
}

function setTheme(theme: string) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.add("theme-transition");

  try {
    localStorage.setItem("fh_theme", theme);
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
    const secure = location.protocol === "https:" ? ";Secure" : "";
    document.cookie = `fh_theme=${theme};expires=${date.toUTCString()};path=/;SameSite=Lax${secure}`;
  } catch {
    // storage unavailable
  }

  document.querySelectorAll<HTMLElement>("[data-theme-toggle]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(theme === "dark"));
    btn.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark theme" : "Switch to light theme"
    );
  });

  setTimeout(() => {
    document.documentElement.classList.remove("theme-transition");
  }, 220);
}

export default function ThemeProvider() {
  // Apply theme immediately on mount (before first paint where possible)
  useEffect(() => {
    const theme = getTheme();
    setTheme(theme);

    function handleToggle(e: MouseEvent) {
      const target = (e.target as Element).closest("[data-theme-toggle]");
      if (!target) return;
      e.preventDefault();
      const current = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(current === "light" ? "dark" : "light");
    }

    document.addEventListener("click", handleToggle);
    return () => document.removeEventListener("click", handleToggle);
  }, []);

  return null;
}
