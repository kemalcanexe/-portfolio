"use client";

import { useRef } from "react";
import type React from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/engine";

// Background tint per section; the page slides between them as you scroll.
const TONES: Record<string, [string, string]> = {
  publications: ["#24105E", "#3A0D40"],
  explore: ["#0B1F5C", "#1A0F4D"],
  experience: ["#1A0F4D", "#0B1F5C"],
  projects: ["#3A0D40", "#24105E"],
  education: ["#062C3A", "#0B1F5C"],
  skills: ["#1C1150", "#3A0D40"],
  awards: ["#3A1A0E", "#3A0D40"],
  contact: ["#2A0F55", "#3A0D40"]
};

export function ToneShift() {
  const layer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = layer.current!;
    const to = ([a, b]: [string, string]) =>
      gsap.to(el, { "--tone-a": a, "--tone-b": b, duration: 1.4, ease: "power2.out", overwrite: true });
    Object.entries(TONES).forEach(([id, tone]) => {
      const section = document.querySelector<HTMLElement>(`[data-tone="${id}"]`) ?? document.getElementById(id);
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: "top 55%",
        end: "bottom 55%",
        // Refresh after the pinned experience track has added its spacing.
        refreshPriority: -1,
        onToggle: (self) => self.isActive && to(tone)
      });
    });
    // Above the first toned section the page is plain night.
    ScrollTrigger.create({
      trigger: document.getElementById("publications"),
      start: "top 55%",
      refreshPriority: -1,
      onLeaveBack: () => to(["#07050D", "#07050D"])
    });
  });

  return (
    <div
      ref={layer}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={
        {
          "--tone-a": "#07050D",
          "--tone-b": "#07050D",
          background:
            "radial-gradient(70% 55% at 15% 20%, var(--tone-a), transparent 72%), radial-gradient(65% 55% at 90% 85%, var(--tone-b), transparent 72%)"
        } as React.CSSProperties
      }
    />
  );
}
