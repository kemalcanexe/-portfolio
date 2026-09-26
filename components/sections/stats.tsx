"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGlow, useGSAP } from "@/components/motion/engine";

// Every figure is taken from the CV.
const STATS = [
  { value: 2, decimals: 0, suffix: "", label: "IEEE publications in 2026", note: "ICMLA and SIU" },
  { value: 99.5, decimals: 1, suffix: "%", label: "exact-match accuracy", note: "fine-tuned Granite-350M, up from 17.0%" },
  { value: 3700, decimals: 0, suffix: "+", label: "operator commands", note: "synthetic dataset for MQTT tool calls" },
  { value: 5, decimals: 0, suffix: "", label: "countries", note: "Turkey, Italy, China, Netherlands, South Korea" },
  { value: 3.65, decimals: 2, suffix: "", label: "GPA across a double major", note: "Computer Science and Industrial Engineering" },
  { value: 8.5, decimals: 1, suffix: "", label: "IELTS overall band", note: "Listening 9.0, Reading 9.0" }
];

export function Stats() {
  const glow = useGlow<HTMLDivElement>();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const nums = gsap.utils.toArray<HTMLElement>(".stat-num");
      nums.forEach((el) => {
        const target = Number(el.dataset.value);
        const decimals = Number(el.dataset.decimals);
        const format = (n: number) =>
          n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
        if (prefersReducedMotion()) {
          el.textContent = format(target);
          return;
        }
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 2.2,
          ease: "expo.out",
          onUpdate: () => (el.textContent = format(obj.n)),
          scrollTrigger: { trigger: el, start: "top 90%" }
        });
      });
      if (!prefersReducedMotion()) {
        gsap.from(".stat-card", {
          y: 60,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: root.current, start: "top 85%" }
        });
      }
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-label="Highlights" className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-10">
      <div ref={glow} className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="stat-card glow-card glass rounded-3xl p-6 sm:p-8">
            <p className="display text-[clamp(2.6rem,6vw,5rem)] leading-none">
              <span className="stat-num" data-value={s.value} data-decimals={s.decimals}>
                0
              </span>
              <span className="text-violet-soft">{s.suffix}</span>
            </p>
            <p className="mt-3 font-semibold">{s.label}</p>
            <p className="mt-1 text-sm text-fog-faint">{s.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
