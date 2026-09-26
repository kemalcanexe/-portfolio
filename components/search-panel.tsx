"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type React from "react";
import { Highlight, matchesTerm } from "@/components/highlight";
import { useSearch } from "@/components/search-context";
import { corpusById, index, sectionLabel } from "@/lib/corpus";

const SUGGESTIONS = ["rank fusion", "mqtt", "earthquake", "simulaton", "llm"];
const MAX_RESULTS = 8;

function snippet(lines: string[], terms: string[]): string {
  let best = lines[0] ?? "";
  let bestCount = 0;
  for (const line of lines) {
    const count = line.split(/\s+/).filter((w) => matchesTerm(w, terms)).length;
    if (count > bestCount) {
      best = line;
      bestCount = count;
    }
  }
  if (best.length <= 150) return best;
  const trim = (s: string) => s.replace(/[.,;:]+$/, "");
  const words = best.split(/\s+/);
  const first = Math.max(0, words.findIndex((w) => matchesTerm(w, terms)));
  const start = Math.max(0, first - 6);
  const cut = words.slice(start, start + 22).join(" ");
  return `${start > 0 ? "…" : ""}${trim(cut)}…`;
}

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

export function SearchPanel() {
  const { query, setQuery, result, reveal } = useSearch();
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [stuck, setStuck] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const sentinel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const hits = result?.hits.slice(0, MAX_RESULTS) ?? [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(target.tagName)) {
        e.preventDefault();
        input.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!shell.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  useEffect(() => {
    if (!sentinel.current) return;
    const observer = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting));
    observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => setCursor(0), [query]);

  const go = (id: string) => {
    setOpen(false);
    input.current?.blur();
    reveal(id);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setCursor((c) => Math.min(c + 1, hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter" && hits[cursor]) {
      go(hits[cursor].id);
    } else if (e.key === "Escape") {
      if (query) setQuery("");
      else input.current?.blur();
      setOpen(false);
    }
  };

  const showPanel = open && query.trim().length > 0;

  return (
    <>
      <div ref={sentinel} aria-hidden="true" />
      <div
        ref={shell}
        style={{ "--i": 3 } as React.CSSProperties}
        className={`rise sticky top-0 z-30 -mx-5 mt-7 px-5 py-3 transition-[background-color,box-shadow] duration-300 sm:-mx-8 sm:px-8 ${
          stuck ? "bg-paper/90 shadow-[0_1px_0_#DCDBE3] backdrop-blur" : ""
        }`}
      >
        <div className="relative">
          <label htmlFor="q" className="sr-only">
            Search publications, research, experience and projects
          </label>
          <div className="flex items-center gap-3 border-b-2 border-ink pb-2 focus-within:border-violet">
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-muted">
              <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              ref={input}
              id="q"
              type="search"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={onKeyDown}
              role="combobox"
              aria-expanded={showPanel}
              aria-controls="q-results"
              aria-activedescendant={showPanel && hits[cursor] ? `r-${hits[cursor].id}` : undefined}
              placeholder="Search my work"
              className="w-full bg-transparent text-xl outline-none focus-visible:outline-none placeholder:text-muted/70 [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  input.current?.focus();
                }}
                className="shrink-0 text-sm text-muted hover:text-ink"
              >
                Clear
              </button>
            ) : (
              <kbd className="hidden shrink-0 rounded border border-rule px-1.5 text-xs text-muted sm:block">/</kbd>
            )}
          </div>

          {!query && !stuck && (
            <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-muted">
              <span>
                {index.docs.length} entries, {index.vocabularySize} terms, indexed in your browser. Try
              </span>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setQuery(s);
                    setOpen(true);
                    input.current?.focus();
                  }}
                  className="text-violet underline decoration-violet/30 underline-offset-4 hover:decoration-violet"
                >
                  {s}
                </button>
              ))}
            </p>
          )}

          {showPanel && (
            <div
              id="q-results"
              role="listbox"
              className="absolute inset-x-0 top-full mt-2 max-h-[70vh] overflow-y-auto border border-rule bg-paper shadow-[0_18px_40px_-24px_rgba(23,22,28,0.35)]"
            >
              {result && hits.length > 0 ? (
                <>
                  <FusionReadout />
                  <ul>
                    <AnimatePresence initial={false}>
                      {hits.map((hit, i) => {
                        const item = corpusById.get(hit.id)!;
                        return (
                          <motion.li
                            key={hit.id}
                            id={`r-${hit.id}`}
                            role="option"
                            aria-selected={i === cursor}
                            layout={reduced ? false : "position"}
                            initial={reduced ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            transition={{ type: "spring", stiffness: 520, damping: 40 }}
                            onMouseEnter={() => setCursor(i)}
                            onClick={() => go(hit.id)}
                            className={`grid cursor-pointer grid-cols-[1fr_5.5rem] gap-4 border-t border-rule px-4 py-3 ${
                              i === cursor ? "bg-violet-wash" : ""
                            }`}
                          >
                            <div className="min-w-0">
                              <p className="text-xs text-muted">{sectionLabel[item.section]}</p>
                              <p className="font-medium leading-snug">
                                <Highlight text={item.title} />
                                {item.org && <span className="font-normal text-muted">, {item.org}</span>}
                              </p>
                              <p className="mt-1 text-sm leading-relaxed text-muted">
                                <Highlight text={snippet(item.text, result.terms)} />
                              </p>
                            </div>
                            <ScoreBar bm25={hit.parts.bm25} ngram={hit.parts.ngram} />
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                  </ul>
                </>
              ) : (
                <p className="px-4 py-4 text-sm text-muted">
                  Nothing matches &ldquo;{query}&rdquo;. Try a method, a tool or a place, like ranking, Python or Seoul.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ScoreBar({ bm25, ngram }: { bm25: number; ngram: number }) {
  return (
    <div className="self-center text-right" title={`BM25 ${pct(bm25)} + trigram ${pct(ngram)}`}>
      <p className="text-sm tabular-nums">{(bm25 + ngram).toFixed(2)}</p>
      <div className="mt-1 flex h-1.5 w-full bg-rule/60">
        <div className="h-full bg-violet transition-[width] duration-300" style={{ width: pct(bm25) }} />
        <div className="h-full bg-violet-soft transition-[width] duration-300" style={{ width: pct(ngram) }} />
      </div>
    </div>
  );
}

function FusionReadout() {
  const { result } = useSearch();
  if (!result) return null;
  const { bm25, ngram } = result.stats;
  return (
    <details className="group px-4 py-2.5 text-xs text-muted">
      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-1 marker:hidden">
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-2 w-2 bg-violet" /> BM25 weight {bm25.weight.toFixed(2)}
        </span>
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-2 w-2 bg-violet-soft" /> Trigram weight {ngram.weight.toFixed(2)}
        </span>
        <span className="ml-auto text-violet group-open:hidden">How this ranks</span>
      </summary>
      <p className="mt-2 max-w-measure leading-relaxed">
        Two retrievers score every entry: BM25 on words, and trigram overlap, which tolerates typos and partial words.
        Each is normalized per query and weighted by how confident it is, measured from the shape of its top-5 scores
        (Top-K gap and entropy). Here BM25 found {bm25.hits} and trigrams found {ngram.hits} entries, with confidence{" "}
        {bm25.confidence.toFixed(2)} and {ngram.confidence.toFixed(2)}. The method follows{" "}
        <a href="#icmla-2026" className="text-violet underline underline-offset-2">
          my ICMLA 2026 paper
        </a>
        .
      </p>
    </details>
  );
}
