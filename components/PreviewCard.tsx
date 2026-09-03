"use client";

import { useEffect, useState } from "react";
import { safeHttpUrl } from "../lib/url";

interface Preview {
  title: string;
  desc: string;
  image: string;
  href: string;
}

// Was 103 lines of imperative document.createElement. Same overlay, as state.
export default function PreviewCard() {
  const [preview, setPreview] = useState<Preview | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Element;
      const link = target.closest<HTMLAnchorElement>(".preview-link");
      if (link) {
        e.preventDefault();
        setPreview({
          title: link.getAttribute("data-title") || link.textContent || "",
          desc: link.getAttribute("data-desc") || "",
          image: safeHttpUrl(link.getAttribute("data-image") || "", ""),
          href: safeHttpUrl(link.href),
        });
        return;
      }
      if (target.closest("#closePreview")) {
        setPreview(null);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (!preview) return <div id="previewCard" className="preview-card" aria-hidden="true" style={{ display: "none" }} />;

  return (
    <div id="previewCard" className="preview-card" style={{ display: "block" }}>
      {preview.image && (
        <div className="img" style={{ backgroundImage: `url(${CSS.escape(preview.image)})` }} />
      )}
      <div className="meta">
        <div className="title">{preview.title}</div>
        <div className="desc">{preview.desc}</div>
        <div style={{ marginTop: "10px" }}>
          <a className="btn primary" href={preview.href} target="_blank" rel="noopener noreferrer">
            Open
          </a>
          <button id="closePreview" className="btn ghost" onClick={() => setPreview(null)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
