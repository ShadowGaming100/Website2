"use client";

import { useMemo, useState } from "react";
import { type FaqCategory, faqItems } from "./data";

const categories: { id: FaqCategory | "all"; icon: string; label: string }[] = [
  { id: "all", icon: "fa-th", label: "All Questions" },
  { id: "general", icon: "fa-circle-info", label: "General" },
  { id: "technical", icon: "fa-gear", label: "Technical" },
  { id: "submissions", icon: "fa-plus-circle", label: "Submissions" },
  { id: "support", icon: "fa-life-ring", label: "Support" },
];

const sections: { id: FaqCategory; icon: string; title: string }[] = [
  { id: "general", icon: "fa-circle-info", title: "General Information" },
  { id: "technical", icon: "fa-gear", title: "Technical Questions" },
  { id: "submissions", icon: "fa-plus-circle", title: "Submitting Hosts" },
  { id: "support", icon: "fa-life-ring", title: "Support & Contact" },
];

export default function FaqClient() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const visibleItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return faqItems.filter((item) => {
      const categoryMatches =
        activeCategory === "all" || item.category === activeCategory;
      const searchMatches =
        !normalizedSearch ||
        item.question.toLowerCase().includes(normalizedSearch) ||
        item.answer.toLowerCase().includes(normalizedSearch);

      return categoryMatches && searchMatches;
    });
  }, [activeCategory, search]);

  const setCategory = (category: FaqCategory | "all") => {
    setActiveCategory(category);
    setSearch("");
    setOpenQuestion(null);
  };

  return (
    <main className="wrap">
      <section className="faq-hero">
        <div className="faq-hero-icon">
          <i className="fa-solid fa-question-circle" />
        </div>
        <h1>Frequently Asked Questions</h1>
        <p>
          Find answers to common questions about FreeHosts, free hosting, and how
          our community directory works.
        </p>
      </section>

      <div className="faq-search">
        <i className="fa-solid fa-search faq-search-icon" />
        <input
          id="faqSearch"
          type="search"
          placeholder="Search questions..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setOpenQuestion(null);
          }}
        />
      </div>

      <div className="faq-categories">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`faq-category-btn ${activeCategory === category.id ? "active" : ""}`}
            type="button"
            onClick={() => setCategory(category.id)}
          >
            <i className={`fa-solid ${category.icon}`} />
            {category.label}
          </button>
        ))}
      </div>

      <div className="faq-list">
        {sections.map((section) => {
          const sectionItems = visibleItems.filter(
            (item) => item.category === section.id,
          );

          if (sectionItems.length === 0) return null;

          return (
            <div className="faq-section" key={section.id}>
              <h2 className="faq-section-title">
                <i className={`fa-solid ${section.icon}`} />
                {section.title}
              </h2>

              {sectionItems.map((item) => {
                const isOpen = openQuestion === item.question;

                return (
                  <div
                    className={`faq-item ${isOpen ? "open" : ""}`}
                    data-category={item.category}
                    key={item.question}
                  >
                    <button
                      className="faq-question"
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenQuestion(isOpen ? null : item.question)}
                    >
                      <span className="faq-question-text">{item.question}</span>
                      <div className="faq-icon">
                        <i className="fa-solid fa-chevron-down" />
                      </div>
                    </button>
                    <div
                      className="faq-answer"
                      style={{ maxHeight: isOpen ? "260px" : "0" }}
                    >
                      <div className="faq-answer-content">{item.answer}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {visibleItems.length === 0 ? (
        <div className="no-results" id="noResults">
          <i className="fa-solid fa-search" />
          <h3>No results found</h3>
          <p>Try adjusting your search or browse all categories</p>
        </div>
      ) : null}

      <div className="faq-cta">
        <h2>Still have questions?</h2>
        <p>Join our community and get help from our team and fellow users.</p>
        <div className="faq-cta-buttons">
          <a
            href="https://discord.gg/QbeZ3b5CQd"
            className="faq-cta-btn primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-discord" />
            Join Discord
          </a>
          <a href="mailto:support@freehosts.space" className="faq-cta-btn secondary">
            <i className="fa-solid fa-envelope" />
            Email Us
          </a>
        </div>
      </div>
    </main>
  );
}
