"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/engine";

// Small animated panels for the project cards. Numbers come from the CV.

export function SlmViz() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const bars = gsap.utils.toArray<HTMLElement>(".slm-bar");
      const nums = gsap.utils.toArray<HTMLElement>(".slm-num");
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%" } });
      tl.from(bars, { scaleX: 0, transformOrigin: "left", duration: 1.6, ease: "expo.out", stagger: 0.15 });
      nums.forEach((n, i) => {
        const target = Number(n.dataset.v);
        const obj = { v: 0 };
        tl.to(obj, { v: target, duration: 1.6, ease: "expo.out", onUpdate: () => (n.textContent = obj.v.toFixed(1)) }, i * 0.15);
      });
    },
    { scope: ref }
  );
  const rows = [
    { label: "Before fine-tuning", v: 17.0, w: "17%", tone: "bg-white/25" },
    { label: "After fine-tuning", v: 99.5, w: "99.5%", tone: "bg-gradient-to-r from-violet to-orchid" },
    { label: "Tool-call accuracy", v: 100, w: "100%", tone: "bg-violet-soft" },
    { label: "Out-of-scope rejected", v: 96.8, w: "96.8%", tone: "bg-mint/80" }
  ];
  return (
    <div ref={ref} className="space-y-3">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="flex justify-between text-xs">
            <span className="text-fog-dim">{r.label}</span>
            <span className="font-mono">
              <span className="slm-num" data-v={r.v}>
                {r.v.toFixed(1)}
              </span>
              %
            </span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <div className={`slm-bar h-full rounded-full ${r.tone}`} style={{ width: r.w }} />
          </div>
        </div>
      ))}
      <div className="flex items-end gap-4 pt-3">
        <div className="flex items-end gap-2">
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-violet to-orchid" />
          <span className="text-xs text-fog-dim">Granite-350M</span>
        </div>
        <div className="flex items-end gap-2">
          <div className="h-12 w-12 rounded-md border border-white/20 bg-white/[0.04]" />
          <span className="text-xs text-fog-dim">Gemma 3-1B, same accuracy</span>
        </div>
      </div>
    </div>
  );
}

// Top communicated needs in week 1 vs week 4, as reported in the news-cycle study.
export function NeedsViz() {
  const weeks = [
    { week: "Week 1", items: [["1", "Food & water"], ["2", "Winter clothing & heaters"]] },
    { week: "Week 4", items: [["1", "Shelter"], ["↑", "Hygiene products"], ["5", "Winter clothing & heaters"]] }
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {weeks.map((w) => (
        <div key={w.week} className="rounded-2xl bg-white/[0.04] p-3">
          <p className="font-mono text-[11px] text-violet-soft">{w.week}</p>
          <ol className="mt-2 space-y-1.5 text-sm">
            {w.items.map(([rank, it]) => (
              <li key={it} className="flex gap-2 rounded-lg bg-white/[0.05] px-2 py-1">
                <span className="font-mono text-fog-faint">{rank}</span>
                {it}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

// Passengers flowing through a checkpoint with three servers.
export function QueueViz() {
  return (
    <svg viewBox="0 0 300 90" className="w-full" aria-hidden="true">
      <line x1="0" y1="45" x2="150" y2="45" stroke="rgba(255,255,255,0.08)" strokeWidth="22" strokeLinecap="round" />
      {Array.from({ length: 7 }).map((_, i) => (
        <circle key={i} r="5" cy="45" fill="#C6B5FF">
          <animate attributeName="cx" from="-10" to="150" dur="3.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" dur="3.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {[20, 45, 70].map((y, i) => (
        <g key={y}>
          <rect x="160" y={y - 9} width="40" height="18" rx="5" fill="#1E1836" stroke="#7C5CFF" />
          <circle r="4" cy={y} fill="#FF6FD8">
            <animate attributeName="cx" from="205" to="300" dur="2.4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}

export function ChatViz() {
  const msgs = [
    { me: false, w: "w-2/3" },
    { me: true, w: "w-1/2" },
    { me: false, w: "w-3/5" },
    { me: true, w: "w-2/5" }
  ];
  return (
    <div className="space-y-2">
      {msgs.map((m, i) => (
        <div key={i} className={`flex ${m.me ? "justify-end" : ""}`}>
          <div
            className={`h-6 ${m.w} animate-[bubble_4s_ease-in-out_infinite] rounded-2xl ${
              m.me ? "rounded-br-md bg-gradient-to-r from-violet to-orchid" : "rounded-bl-md bg-white/10"
            }`}
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        </div>
      ))}
    </div>
  );
}
