"use client";

import { useEffect } from "react";

export default function PreviewCard() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Element;

      const link = target.closest<HTMLAnchorElement>(".preview-link");
      if (link) {
        e.preventDefault();
        const card = document.getElementById("previewCard");
        if (!card) return;

        const title = link.getAttribute("data-title") || link.textContent || "";
        const desc = link.getAttribute("data-desc") || "";
        const rawImage = link.getAttribute("data-image") || "";
        const href = link.href;

        // Validate href — only allow http/https to prevent javascript: URLs
        let safeHref = "#";
        try {
          const parsed = new URL(href);
          if (parsed.protocol === "https:" || parsed.protocol === "http:") {
            safeHref = href;
          }
        } catch {
          // malformed URL — keep "#"
        }

        // Build DOM nodes safely instead of using innerHTML
        card.textContent = "";

        if (rawImage) {
          // Validate image URL — only allow http/https
          let safeImage = "";
          try {
            const parsed = new URL(rawImage);
            if (parsed.protocol === "https:" || parsed.protocol === "http:") {
              safeImage = rawImage;
            }
          } catch {
            // invalid image URL — skip
          }

          if (safeImage) {
            const imgDiv = document.createElement("div");
            imgDiv.className = "img";
            imgDiv.style.backgroundImage = `url(${CSS.escape(safeImage)})`;
            card.appendChild(imgDiv);
          }
        }

        const meta = document.createElement("div");
        meta.className = "meta";

        const titleEl = document.createElement("div");
        titleEl.className = "title";
        titleEl.textContent = title;

        const descEl = document.createElement("div");
        descEl.className = "desc";
        descEl.textContent = desc;

        const actions = document.createElement("div");
        actions.style.marginTop = "10px";

        const openBtn = document.createElement("a");
        openBtn.className = "btn primary";
        openBtn.href = safeHref;
        openBtn.target = "_blank";
        openBtn.rel = "noopener noreferrer";
        openBtn.textContent = "Open";

        const closeBtn = document.createElement("button");
        closeBtn.id = "closePreview";
        closeBtn.className = "btn ghost";
        closeBtn.textContent = "Close";

        actions.appendChild(openBtn);
        actions.appendChild(closeBtn);
        meta.appendChild(titleEl);
        meta.appendChild(descEl);
        meta.appendChild(actions);
        card.appendChild(meta);

        card.style.display = "block";
        return;
      }

      if (target.closest("#closePreview")) {
        const card = document.getElementById("previewCard");
        if (card) card.style.display = "none";
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
