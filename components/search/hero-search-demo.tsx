"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { corpusById, index, sectionLabel } from "@/lib/corpus";
import { prefersReducedMotion } from "@/components/motion/engine";
import { openPalette } from "@/components/search/palette-store";
import { useShortcutLabel } from "@/lib/platform";

// The real search index, typing to itself: each query is typed out and the
// live fused ranking appears underneath.
const QUERIES = ["rank fusion", "mqtt edge", "earthquake", "simulaton"];

export function HeroSearchDemo() {
  const shortcut = useShortcutLabel();
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState(QUERIES[0]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cancelled = false;
    let timer = 0;
    const run = (i: number) => {
      const q = QUERIES[i];
      let n = 0;
      const type = () => {
        if (cancelled) return;
        n += 1;
        setTyped(q.slice(0, n));
        if (n < q.length) timer = window.setTimeout(type, 70 + Math.random() * 60);
        else timer = window.setTimeout(() => run((i + 1) % QUERIES.length), 3200);
      };
      setQi(i);
      setTyped("");
      timer = window.setTimeout(type, 400);
    };
    timer = window.setTimeout(() => run(1), 3500);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  const hits = useMemo(() => (typed.trim() ? index.search(typed).hits.slice(0, 3) : []), [typed]);

  return (
    <button
      type="button"
      onClick={openPalette}
      aria-label="Open search"
      className="glass group w-[340px] rounded-3xl p-4 text-left shadow-[0_30px_80px_-30px_rgba(124,92,255,0.6)] transition-transform hover:-translate-y-1"
    >
      <div className="flex items-center gap-2 rounded-2xl bg-night/60 px-3 py-2.5">
        <svg viewBox="0 0 20 20" className="h-4 w-4 text-violet-soft" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span className="font-mono text-sm">
          {typed}
          <span className="ml-px inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-violet-soft" />
        </span>
      </div>
      <ul className="mt-2 min-h-[168px]">
        <AnimatePresence initial={false} mode="popLayout">
          {hits.map((h) => {
            const item = corpusById.get(h.id)!;
            return (
              <motion.li
                key={`${qi}-${h.id}`}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="flex items-center gap-3 rounded-xl px-2 py-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] text-violet-soft">{sectionLabel[item.section]}</p>
                  <p className="truncate text-sm font-semibold">{item.title}</p>
                </div>
                <div className="w-14">
                  <p className="text-right font-mono text-[11px] text-fog-dim">{h.score.toFixed(2)}</p>
                  <div className="mt-1 flex h-1 overflow-hidden rounded-full bg-white/10">
                    <div className="bg-violet transition-[width] duration-500" style={{ width: `${h.parts.bm25 * 100}%` }} />
                    <div className="bg-orchid transition-[width] duration-500" style={{ width: `${h.parts.ngram * 100}%` }} />
                  </div>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
      <p className="mt-1 flex items-center justify-between px-2 font-mono text-[10px] text-fog-faint">
        <span>
          <i className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-violet" />
          bm25 <i className="mx-1 ml-2 inline-block h-1.5 w-1.5 rounded-full bg-orchid" />
          trigram
        </span>
        <span className="text-fog-dim group-hover:text-fog">{shortcut ? `${shortcut} to search` : "Click to search"}</span>
      </p>
    </button>
  );
}
