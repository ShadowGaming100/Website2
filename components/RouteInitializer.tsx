"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    initPageLogic?: () => void;
    createSnowEffect?: () => void;
  }
}

export default function RouteInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.initPageLogic?.();
      window.createSnowEffect?.();
    }, 100);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
