"use client";

import { useEffect, useRef, useState } from "react";

// Figures from the project's reported results (Granite-350M, test set).
const accuracy = [
  { label: "Before fine-tuning", value: 17.0 },
  { label: "After fine-tuning", value: 99.5 }
];
const size = [
  { label: "Granite-350M", params: 0.35 },
  { label: "Gemma 3-1B", params: 1 }
];

export function SlmChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={ref} className="mt-4 max-w-measure border-l border-rule pl-4">
      <figcaption className="text-sm text-muted">Exact-match accuracy, Granite-350M</figcaption>
      <dl className="mt-2 space-y-2">
        {accuracy.map((row, i) => (
          <div key={row.label} className="grid grid-cols-[9rem_1fr_3.5rem] items-center gap-3 text-sm">
            <dt className="text-muted">{row.label}</dt>
            <div className="h-2 bg-rule/60">
              <div
                className="h-full bg-violet transition-[width] duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]"
                style={{ width: seen ? `${row.value}%` : "0%", transitionDelay: `${i * 250}ms` }}
              />
            </div>
            <dd className="text-right tabular-nums">{row.value.toFixed(1)}%</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-sm text-muted">Parameters at matching accuracy</p>
      <dl className="mt-2 space-y-2">
        {size.map((row, i) => (
          <div key={row.label} className="grid grid-cols-[9rem_1fr_3.5rem] items-center gap-3 text-sm">
            <dt className="text-muted">{row.label}</dt>
            <div className="h-2">
              <div
                className={`h-full transition-[width] duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                  i === 0 ? "bg-violet" : "bg-violet-soft"
                }`}
                style={{ width: seen ? `${row.params * 100}%` : "0%", transitionDelay: `${500 + i * 250}ms` }}
              />
            </div>
            <dd className="text-right tabular-nums">{row.params < 1 ? `${row.params * 1000}M` : `${row.params}B`}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-sm text-muted">
        100% tool-call accuracy, 96.8% out-of-scope commands rejected, runs on 4–8 GB VRAM.
      </p>
    </figure>
  );
}
