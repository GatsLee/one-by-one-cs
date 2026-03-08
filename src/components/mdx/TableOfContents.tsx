"use client";

import { useState, useEffect, useCallback } from "react";
import { List, X } from "lucide-react";
import type { TocHeading } from "@/lib/content";

interface TableOfContentsProps {
  headings: TocHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  // Scroll spy: track which heading is currently visible
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -75% 0px" },
    );

    // Observe all heading elements
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="hidden md:block">
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed right-4 top-20 z-30 p-2 rounded-lg bg-white/90 border border-ink/10 shadow-sm hover:shadow-md transition-all text-ink-light hover:text-ink"
        title="목차"
      >
        {open ? <X size={18} /> : <List size={18} />}
      </button>

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 z-20 h-full w-60 bg-paper-dark/95 backdrop-blur-sm border-l border-ink/10 shadow-lg transition-transform duration-200 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-20 px-4 pb-8 h-full overflow-y-auto">
          <h3 className="text-xs font-bold text-ink-light uppercase tracking-wider mb-4">
            목차
          </h3>
          <nav className="space-y-0.5">
            {headings.map((h) => (
              <button
                key={h.id}
                onClick={() => scrollTo(h.id)}
                className={`block w-full text-left text-sm py-1.5 transition-colors rounded-sm ${
                  h.level === 3 ? "pl-5" : "pl-2"
                } ${
                  activeId === h.id
                    ? "text-book-blue font-semibold border-l-2 border-book-blue"
                    : "text-ink-light hover:text-ink border-l-2 border-transparent"
                }`}
              >
                {h.text}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
