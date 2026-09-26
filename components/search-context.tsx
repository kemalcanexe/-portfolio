"use client";

import { createContext, useCallback, useContext, useDeferredValue, useMemo, useState } from "react";
import type React from "react";
import { index } from "@/lib/corpus";
import type { SearchResult } from "@/lib/search";

type SearchState = {
  query: string;
  setQuery: (q: string) => void;
  result: SearchResult | null;
  matched: Map<string, number>;
  hoverTerm: string | null;
  setHoverTerm: (t: string | null) => void;
  hovered: Set<string>;
  reveal: (id: string) => void;
};

const SearchContext = createContext<SearchState | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [hoverTerm, setHoverTerm] = useState<string | null>(null);
  const deferred = useDeferredValue(query);

  const result = useMemo(() => (deferred.trim() ? index.search(deferred) : null), [deferred]);
  const matched = useMemo(() => new Map(result?.hits.map((h) => [h.id, h.score]) ?? []), [result]);

  // Hovering a term shows its postings: every entry the term retrieves lexically.
  const hovered = useMemo(() => {
    if (!hoverTerm) return new Set<string>();
    return new Set(index.search(hoverTerm).hits.filter((h) => h.parts.bm25 > 0).map((h) => h.id));
  }, [hoverTerm]);

  const reveal = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    el.classList.remove("arrive");
    void el.offsetWidth;
    el.classList.add("arrive");
  }, []);

  const value = useMemo(
    () => ({ query, setQuery, result, matched, hoverTerm, setHoverTerm, hovered, reveal }),
    [query, result, matched, hoverTerm, hovered, reveal]
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside SearchProvider");
  return ctx;
}
