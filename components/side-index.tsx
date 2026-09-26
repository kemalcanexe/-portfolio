"use client";

import { useEffect, useState } from "react";
import { sections } from "@/content/cv";
import { useSearch } from "@/components/search-context";
import { corpus } from "@/lib/corpus";

const totals = Object.fromEntries(sections.map((s) => [s.id, corpus.filter((c) => c.section === s.id).length]));

// Section list for wide screens. With a query, counts show how many entries
// in each section the query retrieves.
export function SideIndex() {
  const { result, matched } = useSearch();
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (items) => {
        const visible = items.filter((i) => i.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id.replace("s-", ""));
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    for (const s of sections) {
      const el = document.getElementById(`s-${s.id}`);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className="sticky top-8 hidden lg:block">
      <ul className="space-y-1.5 text-sm">
        {sections.map((s) => {
          const count = result ? corpus.filter((c) => c.section === s.id && matched.has(c.id)).length : totals[s.id];
          const empty = result && count === 0;
          return (
            <li key={s.id}>
              <a
                href={`#s-${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={`group flex items-baseline justify-between gap-4 transition-colors ${
                  active === s.id ? "text-ink" : "text-muted hover:text-ink"
                } ${empty ? "opacity-40" : ""}`}
              >
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`h-px bg-current transition-[width] duration-300 ${active === s.id ? "w-4" : "w-2"}`}
                  />
                  {s.label}
                </span>
                <span className={`tabular-nums ${result && count ? "text-violet" : ""}`}>{count}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
