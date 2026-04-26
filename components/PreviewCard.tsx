"use client";

import { useEffect } from "react";

function escapeHtml(text: string): string {
  return String(text).replace(/[&<>"']/g, (m) => {
    return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" } as Record<string, string>)[m];
  });
}

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
        const image = link.getAttribute("data-image") || "";
        const href = link.href;

        card.innerHTML = `
          ${image ? `<div class="img" style="background-image:url(${escapeHtml(image)})"></div>` : ""}
          <div class="meta">
            <div class="title">${escapeHtml(title)}</div>
            <div class="desc">${escapeHtml(desc)}</div>
            <div style="margin-top:10px">
              <a class="btn primary" href="${escapeHtml(href)}" target="_blank">Open</a>
              <button id="closePreview" class="btn ghost">Close</button>
            </div>
          </div>`;
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
