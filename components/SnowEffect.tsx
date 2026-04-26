"use client";

import { useEffect } from "react";

export default function SnowEffect() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (new Date().getMonth() !== 11) return; // December only
    if (document.getElementById("snow-container")) return;

    const container = document.createElement("div");
    container.id = "snow-container";
    container.style.cssText =
      "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:10000;overflow:hidden;";

    const style = document.createElement("style");
    style.textContent = `
      @keyframes fall {
        0%   { opacity: 0; transform: translateY(-10px); }
        10%  { opacity: 1; }
        100% { opacity: 0; transform: translateY(100vh) rotate(360deg); }
      }
      .snowflake { position: absolute; top: -10px; background: currentColor; border-radius: 50%; animation: fall linear infinite; }
      [data-theme="light"] .snowflake { color: rgba(160,200,255,0.8); }
      [data-theme="dark"]  .snowflake { color: rgba(255,255,255,0.9); }
    `;
    document.head.appendChild(style);
    document.body.appendChild(container);

    for (let i = 0; i < 50; i++) {
      const flake = document.createElement("div");
      flake.className = "snowflake";
      const size = Math.random() * 4 + 2;
      flake.style.width = size + "px";
      flake.style.height = size + "px";
      flake.style.left = Math.random() * 100 + "vw";
      flake.style.animationDuration = Math.random() * 10 + 5 + "s";
      flake.style.animationDelay = Math.random() * 5 + "s";
      container.appendChild(flake);
    }

    return () => {
      container.remove();
      style.remove();
    };
  }, []);

  return null;
}
