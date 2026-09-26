"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { corpusById, index } from "@/lib/corpus";
import type { Estimator } from "@/lib/search";

const ESTIMATORS: { id: Estimator; label: string; note: string }[] = [
  { id: "hybrid", label: "Hybrid", note: "mean of Top-K gap and entropy" },
  { id: "topk", label: "Top-K gap", note: "best score minus 5th best" },
  { id: "entropy", label: "Entropy", note: "1 − normalized entropy of top 5" },
  { id: "equal", label: "Equal", note: "no confidence, 50/50 weights" }
];
const QUERIES = ["python ranking", "relief python", "models", "data science"];

// Live rank fusion over this site's own index: change the confidence estimator
// and watch the retriever weights and the fused ranking move.
export function FusionPlayground() {
  const [query, setQuery] = useState(QUERIES[0]);
  const [estimator, setEstimator] = useState<Estimator>("hybrid");
  const result = useMemo(() => (query.trim() ? index.search(query, estimator) : null), [query, estimator]);
  const hits = result?.hits.slice(0, 5) ?? [];
  const note = ESTIMATORS.find((e) => e.id === estimator)!.note;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] text-fog-faint">Live fusion on this site&apos;s index</p>
        <p className="font-mono text-[11px] text-fog-faint">{note}</p>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-1 rounded-2xl bg-white/[0.04] p-1" role="radiogroup" aria-label="Confidence estimator">
        {ESTIMATORS.map((e) => (
          <button
            key={e.id}
            type="button"
            role="radio"
            aria-checked={estimator === e.id}
            onClick={() => setEstimator(e.id)}
            className="relative rounded-xl px-2 py-2 text-xs font-semibold"
          >
            {estimator === e.id && (
              <motion.span
                layoutId="estimator-pill"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet to-orchid"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative">{e.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Query"
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-night/60 px-3 py-2 font-mono text-sm outline-none focus:border-violet-soft"
        />
        {QUERIES.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => setQuery(q)}
            className={`rounded-full px-2.5 py-1 font-mono text-[11px] transition-colors ${
              query === q ? "bg-white/15 text-fog" : "text-fog-faint hover:text-fog"
            }`}
          >
            {q}
          </button>
        ))}
      </div>

      {result && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {(["bm25", "ngram"] as const).map((r) => (
            <div key={r} className="rounded-xl bg-white/[0.04] p-3">
              <div className="flex items-baseline justify-between font-mono text-[11px]">
                <span className={r === "bm25" ? "text-violet-soft" : "text-orchid"}>{r === "bm25" ? "BM25" : "Trigram"}</span>
                <span className="text-fog-faint">
                  {result.stats[r].hits} hits · conf {result.stats[r].confidence.toFixed(2)}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className={`h-full ${r === "bm25" ? "bg-violet" : "bg-orchid"}`}
                  animate={{ width: `${result.stats[r].weight * 100}%` }}
                  transition={{ type: "spring", stiffness: 200, damping: 26 }}
                />
              </div>
              <p className="mt-1.5 font-mono text-lg">w = {result.stats[r].weight.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}

      <ol className="mt-3 min-h-[13rem] space-y-1">
        {hits.map((h, i) => (
          <motion.li
            key={h.id}
            layout
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            className="grid grid-cols-[1.25rem_1fr_4.5rem] items-center gap-2 rounded-xl px-2 py-1.5 text-sm odd:bg-white/[0.03]"
          >
            <span className="font-mono text-xs text-fog-faint">{i + 1}</span>
            <span className="truncate">{corpusById.get(h.id)!.title}</span>
            <span className="flex h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.span className="h-full bg-violet" animate={{ width: `${h.parts.bm25 * 100}%` }} />
              <motion.span className="h-full bg-orchid" animate={{ width: `${h.parts.ngram * 100}%` }} />
            </span>
          </motion.li>
        ))}
        {!hits.length && query.trim() && <li className="px-2 py-3 text-sm text-fog-faint">No entry matches this query.</li>}
      </ol>
    </div>
  );
}
