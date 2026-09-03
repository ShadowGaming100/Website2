"use client";

import { useMemo, useState } from "react";
import { type FaqCategory, getFaqItems } from "./data";
import { ChevronDown, CircleHelp, Info, LayoutGrid, LifeBuoy, Mail, PlusCircle, Search, Settings } from "lucide-react";
import { DiscordIcon } from "@/components/BrandIcons";
import type { LucideIcon } from "lucide-react";

const categories: { id: FaqCategory | "all"; icon: LucideIcon; label: string }[] = [
  { id: "all", icon: LayoutGrid, label: "All Questions" },
  { id: "general", icon: Info, label: "General" },
  { id: "technical", icon: Settings, label: "Technical" },
  { id: "submissions", icon: PlusCircle, label: "Submissions" },
  { id: "support", icon: LifeBuoy, label: "Support" },
];

const sections: { id: FaqCategory; icon: LucideIcon; title: string }[] = [
  { id: "general", icon: Info, title: "General Information" },
  { id: "technical", icon: Settings, title: "Technical Questions" },
  { id: "submissions", icon: PlusCircle, title: "Submitting Hosts" },
  { id: "support", icon: LifeBuoy, title: "Support & Contact" },
];

export default function FaqClient({ emailDomain }: { emailDomain: string }) {
  const faqItems = getFaqItems(emailDomain);
  const [activeCategory, setActiveCategory] = useState<FaqCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const visibleItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return faqItems.filter((item) => {
      const catMatch = activeCategory === "all" || item.category === activeCategory;
      const searchMatch = !q || item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
      return catMatch && searchMatch;
    });
  }, [activeCategory, search, faqItems]);

  const setCategory = (category: FaqCategory | "all") => {
    setActiveCategory(category);
    setSearch("");
    setOpenQuestion(null);
  };

  return (
    <main className="wrap">
      <section className="faq-hero">
        <div className="faq-hero-icon">
          <CircleHelp size={48} aria-hidden="true" />
        </div>
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about FreeHosts, free hosting, and how our community directory works.</p>
        <p className="faq-hero-lead">
          New to free hosting? Start here — these answers explain how the FreeHosts directory works, what you can host
          for free, and how listings are reviewed and kept up to date. If your question is not covered, join our
          Discord community or email support and a team member will help you out.
        </p>
      </section>

      <div className="faq-search">
        <Search size={16} className="faq-search-icon" aria-hidden="true" />
        <input
          id="faqSearch"
          type="search"
          placeholder="Search questions..."
          aria-label="Search frequently asked questions"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setOpenQuestion(null); }}
        />
      </div>

      <div className="faq-categories">
        {categories.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            className={`faq-category-btn ${activeCategory === id ? "active" : ""}`}
            type="button"
            onClick={() => setCategory(id)}
          >
            <Icon size={14} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      <div className="faq-list">
        {sections.map(({ id, icon: Icon, title }) => {
          const items = visibleItems.filter((item) => item.category === id);
          if (items.length === 0) return null;
          return (
            <div className="faq-section" key={id}>
              <h2 className="faq-section-title">
                <Icon size={16} aria-hidden="true" />
                {title}
              </h2>
              {items.map((item) => {
                const isOpen = openQuestion === item.question;
                return (
                  <div className={`faq-item ${isOpen ? "open" : ""}`} data-category={item.category} key={item.question}>
                    <h3 className="faq-question-heading">
                      <button
                        className="faq-question"
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenQuestion(isOpen ? null : item.question)}
                      >
                        <span className="faq-question-text">{item.question}</span>
                        <div className="faq-icon">
                          <ChevronDown size={16} aria-hidden="true" />
                        </div>
                      </button>
                    </h3>
                    <div className="faq-answer" style={{ maxHeight: isOpen ? "260px" : "0" }}>
                      <div className="faq-answer-content">{item.answer}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {visibleItems.length === 0 && (
        <div className="no-results" id="noResults">
          <Search size={48} aria-hidden="true" />
          <h3>No results found</h3>
          <p>Try adjusting your search or browse all categories</p>
        </div>
      )}

      <div className="faq-cta">
        <h2>Still have questions?</h2>
        <p>Join our community and get help from our team and fellow users.</p>
        <div className="faq-cta-buttons">
          <a href="https://discord.gg/QbeZ3b5CQd" className="faq-cta-btn primary" target="_blank" rel="noopener noreferrer">
            <DiscordIcon aria-hidden="true" />
            Join Discord
          </a>
          <a href={`mailto:support@${emailDomain}`} className="faq-cta-btn secondary">
            <Mail size={14} aria-hidden="true" />
            Email Us
          </a>
        </div>
      </div>
    </main>
  );
}
