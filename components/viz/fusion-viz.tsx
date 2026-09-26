"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/components/motion/engine";

// Illustration of confidence-guided rank fusion: three retrievers rank the same
// documents, each gets a confidence, and the fused list is their weighted vote.
// Rankings reshuffle every few seconds; the fused column is actually computed.
const DOCS = ["d1", "d2", "d3", "d4", "d5"];
const RETRIEVERS = [
  { name: "BM25", color: "#7C5CFF" },
  { name: "SPLADE", color: "#C6B5FF" },
  { name: "Dense", color: "#FF6FD8" }
];

function shuffle<T>(arr: T[], seed: number) {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function state(seed: number) {
  const lists = RETRIEVERS.map((_, r) => shuffle(DOCS, seed * 7 + r * 13 + 1));
  const conf = RETRIEVERS.map((_, r) => 0.25 + (((seed * 31 + r * 17) % 60) / 100));
  const total = conf.reduce((a, b) => a + b, 0);
  const weights = conf.map((c) => c / total);
  const score = new Map<string, number>();
  lists.forEach((list, r) => list.forEach((d, rank) => score.set(d, (score.get(d) ?? 0) + weights[r] * (1 - rank / DOCS.length))));
  const fused = [...DOCS].sort((a, b) => (score.get(b) ?? 0) - (score.get(a) ?? 0));
  return { lists, weights, fused };
}

const ROW = 30;
const COL = [20, 110, 200, 330];

export function FusionViz() {
  const [seed, setSeed] = useState(3);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e.isIntersecting) timer = window.setInterval(() => setSeed((s) => s + 1), 2600);
    });
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const { lists, weights, fused } = state(seed);
  const y = (rank: number) => 34 + rank * ROW;

  return (
    <svg ref={ref} viewBox="0 0 400 200" className="w-full" role="img" aria-label="Illustration of rank fusion across three retrievers">
      {RETRIEVERS.map((r, i) => (
        <g key={r.name}>
          <text x={COL[i] + 20} y="14" fill="#A7A1BC" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">
            {r.name}
          </text>
          <rect x={COL[i]} y="20" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.08)" />
          <rect
            x={COL[i]}
            y="20"
            width={40 * weights[i] * 2.2}
            height="3"
            rx="1.5"
            fill={r.color}
            style={{ transition: "width .9s cubic-bezier(.2,.8,.2,1)" }}
          />
        </g>
      ))}
      <text x={COL[3] + 20} y="14" fill="#EEEAF7" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">
        fused
      </text>

      {/* Links from each retriever's ranking to the fused ranking */}
      {lists.map((list, r) =>
        list.map((d, rank) => (
          <line
            key={`${r}-${d}`}
            x1={COL[r] + 40}
            x2={COL[3]}
            y1={y(rank) + 9}
            y2={y(fused.indexOf(d)) + 9}
            stroke={RETRIEVERS[r].color}
            strokeOpacity={0.12 + weights[r] * 0.5}
            strokeWidth={0.8}
            style={{ transition: "all .9s cubic-bezier(.2,.8,.2,1)" }}
          />
        ))
      )}

      {lists.map((list, r) =>
        list.map((d, rank) => (
          <g key={`${r}-${d}-node`} style={{ transform: `translateY(${y(rank)}px)`, transition: "transform .9s cubic-bezier(.2,.8,.2,1)" }}>
            <rect x={COL[r]} width="40" height="18" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
            <text x={COL[r] + 20} y="12.5" fontSize="9" fill="#EEEAF7" textAnchor="middle" fontFamily="var(--font-mono)">
              {d}
            </text>
          </g>
        ))
      )}

      {fused.map((d, rank) => (
        <g key={`f-${d}`} style={{ transform: `translateY(${y(rank)}px)`, transition: "transform .9s cubic-bezier(.2,.8,.2,1)" }}>
          <rect x={COL[3]} width="50" height="18" rx="6" fill="url(#fusedGrad)" />
          <text x={COL[3] + 25} y="12.5" fontSize="9" fill="#07050D" fontWeight="700" textAnchor="middle" fontFamily="var(--font-mono)">
            {d}
          </text>
        </g>
      ))}
      <defs>
        <linearGradient id="fusedGrad" x1="0" x2="1">
          <stop offset="0" stopColor="#C6B5FF" />
          <stop offset="1" stopColor="#FF6FD8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
