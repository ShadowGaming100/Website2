import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TrustpilotWidget() {
  return (
    <a
      href="https://www.trustpilot.com/review/freehosts.space"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-4 py-2 rounded-3xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent)/0.3)] transition-all group"
    >
      {/* Trustpilot Logo SVG */}
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-[#00b67a]"
        fill="currentColor"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
      <div className="flex flex-col">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesomeIcon
              key={star}
              icon={["fas", star <= 4 ? "star" : "star-half-alt"]}
              className="text-[10px] text-[#00b67a]"
            />
          ))}
        </div>
        <span className="text-xs text-[rgb(var(--muted))] group-hover:text-[rgb(var(--text))] transition-colors font-medium">
          4.8 on Trustpilot
        </span>
      </div>
    </a>
  );
}
