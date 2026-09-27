"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import type React from "react";
import { corpusById, index, sectionLabel } from "@/lib/corpus";
import { fold, stem } from "@/lib/search";
import { lockScroll, revealEntry } from "@/components/motion/engine";
import { onPalette } from "@/components/search/palette-store";
import { usePlatform } from "@/lib/platform";

const SUGGESTIONS = ["rank fusion", "mqtt", "earthquake", "simulaton", "llm", "seoul"];
const MAX = 8;

function matches(word: string, terms: string[]) {
  const w = stem(fold(word).replace(/[^a-z0-9@.+#]/g, ""));
  return w.length > 1 && terms.some((t) => w === t || (t.length >= 3 && w.startsWith(t)));
}

function Marked({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  return (
    <>
      {text.split(/(\s+)/).map((part, i) => {
        const [, core, tail] = part.match(/^(.*?)([.,;:)]*)$/) ?? [part, part, ""];
        return part.trim() && matches(core, terms) ? (
          <span key={i}>
            <mark>{core}</mark>
            {tail}
          </span>
        ) : (
          part
        );
      })}
    </>
  );
}

function snippet(lines: string[], terms: string[]) {
  let best = lines[0] ?? "";
  let score = 0;
  for (const line of lines) {
    const n = line.split(/\s+/).filter((w) => matches(w, terms)).length;
    if (n > score) [best, score] = [line, n];
  }
  if (best.length <= 140) return best;
  const words = best.split(/\s+/);
  const at = Math.max(0, words.findIndex((w) => matches(w, terms)));
  const start = Math.max(0, at - 6);
  return `${start ? "…" : ""}${words.slice(start, start + 20).join(" ").replace(/[.,;:]+$/, "")}…`;
}

export function CommandPalette() {
  const platform = usePlatform();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const deferred = useDeferredValue(query);

  const result = useMemo(() => (deferred.trim() ? index.search(deferred) : null), [deferred]);
  const hits = result?.hits.slice(0, MAX) ?? [];

  useEffect(() => onPalette(setOpen), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = ["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) window.setTimeout(() => input.current?.focus(), 30);
    lockScroll(open);
  }, [open]);

  useEffect(() => setCursor(0), [deferred]);

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => revealEntry(id), 60);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" && hits.length) {
      e.preventDefault();
      setCursor((c) => (c + 1) % hits.length);
    } else if (e.key === "ArrowUp" && hits.length) {
      e.preventDefault();
      setCursor((c) => (c - 1 + hits.length) % hits.length);
    } else if (e.key === "Enter" && hits[cursor]) {
      go(hits[cursor].id);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 bg-night/70 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            initial={{ y: 24, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 12, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-night-900/90 shadow-[0_40px_120px_-20px_rgba(124,92,255,0.45)] backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <svg viewBox="0 0 20 20" className="h-5 w-5 text-violet-soft" aria-hidden="true">
                <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                ref={input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search publications, research, projects…"
                aria-label="Search"
                role="combobox"
                aria-expanded={hits.length > 0}
                aria-controls="palette-results"
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent text-lg outline-none placeholder:text-fog-faint focus-visible:outline-none"
              />
              {platform === "mobile" ? (
                <button type="button" onClick={() => setOpen(false)} className="text-sm text-fog-dim">
                  Close
                </button>
              ) : (
                <kbd className="rounded-md border border-white/15 px-1.5 font-mono text-xs text-fog-faint">esc</kbd>
              )}
            </div>

            {!query.trim() ? (
              <div className="px-5 py-5">
                <p className="font-mono text-xs text-fog-faint">
                  {index.docs.length} entries · {index.vocabularySize} terms · indexed in your browser
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-fog-dim transition-colors hover:border-violet-soft hover:text-fog"
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-fog-faint">
                  Two retrievers rank every entry, BM25 on words and trigram overlap for typos and partial words. Their
                  scores are normalized per query and weighted by confidence (Top-K gap and entropy), following my ICMLA
                  2026 paper on confidence-guided rank fusion.
                </p>
              </div>
            ) : hits.length ? (
              <>
                <div className="flex flex-wrap gap-x-5 gap-y-1 border-b border-white/5 px-5 py-2.5 font-mono text-[11px] text-fog-faint">
                  <span className="flex items-center gap-1.5">
                    <i className="h-2 w-2 rounded-full bg-violet" /> bm25 w={result!.stats.bm25.weight.toFixed(2)} conf=
                    {result!.stats.bm25.confidence.toFixed(2)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="h-2 w-2 rounded-full bg-orchid" /> trigram w={result!.stats.ngram.weight.toFixed(2)} conf=
                    {result!.stats.ngram.confidence.toFixed(2)}
                  </span>
                </div>
                <ul id="palette-results" role="listbox" className="max-h-[55vh] overflow-y-auto py-2" data-lenis-prevent>
                  {hits.map((hit, i) => {
                    const item = corpusById.get(hit.id)!;
                    return (
                      <motion.li
                        key={hit.id}
                        layout="position"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                        role="option"
                        aria-selected={i === cursor}
                        onMouseEnter={() => setCursor(i)}
                        onClick={() => go(hit.id)}
                        className={`mx-2 grid cursor-pointer grid-cols-[1fr_5.5rem] gap-4 rounded-2xl px-4 py-3 transition-colors ${
                          i === cursor ? "bg-white/[0.07]" : ""
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="font-mono text-[11px] text-violet-soft">{sectionLabel[item.section]}</p>
                          <p className="font-semibold leading-snug">
                            <Marked text={item.title} terms={result!.terms} />
                            {item.org && <span className="font-normal text-fog-faint">, {item.org}</span>}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-fog-dim">
                            <Marked text={snippet(item.text, result!.terms)} terms={result!.terms} />
                          </p>
                        </div>
                        <div className="self-center text-right">
                          <p className="font-mono text-sm">{hit.score.toFixed(2)}</p>
                          <div className="mt-1.5 flex h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full bg-violet transition-[width]" style={{ width: `${hit.parts.bm25 * 100}%` }} />
                            <div className="h-full bg-orchid transition-[width]" style={{ width: `${hit.parts.ngram * 100}%` }} />
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <p className="px-5 py-6 text-sm text-fog-dim">
                Nothing matches &ldquo;{query}&rdquo;. Try a method, a tool or a place, like ranking, Python or Seoul.
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
