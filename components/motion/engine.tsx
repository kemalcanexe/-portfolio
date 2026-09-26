"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import type React from "react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

let lenis: Lenis | null = null;

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Smooth scrolling driven by the GSAP ticker so ScrollTrigger and Lenis share one clock.
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    lenis = new Lenis({ lerp: 0.09, anchors: { offset: -80 } });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    // Keep GSAP's lag smoothing: WebGL start-up can block a frame for a while,
    // and timelines should not leap ahead when it does.
    gsap.ticker.lagSmoothing(250, 33);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}

export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y, { duration: 1.4 });
  else window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

// Brings an entry into view, including ones that live inside the pinned
// horizontal experience track, then flashes it.
export function revealEntry(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const track = el.closest<HTMLElement>("[data-htrack]");
  const st = track ? ScrollTrigger.getById("experience") : null;
  if (track && st) {
    const index = Number(el.dataset.index ?? 0);
    const count = Number(track.dataset.count ?? 1);
    scrollToY(st.start + (st.end - st.start) * (index / Math.max(count - 1, 1)));
  } else {
    scrollToY(el.getBoundingClientRect().top + window.scrollY - 110);
  }
  window.setTimeout(() => {
    el.classList.remove("arrive");
    void el.offsetWidth;
    el.classList.add("arrive");
  }, 700);
}

// Pointer-following glow for .glow-card elements inside `ref`.
export function useGlow<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const onMove = (e: PointerEvent) => {
      for (const card of root.querySelectorAll<HTMLElement>(".glow-card")) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - r.left}px`);
        card.style.setProperty("--y", `${e.clientY - r.top}px`);
        const near =
          e.clientX > r.left - 120 && e.clientX < r.right + 120 && e.clientY > r.top - 120 && e.clientY < r.bottom + 120;
        card.style.setProperty("--glow", near ? "1" : "0");
      }
    };
    const onLeave = () => root.querySelectorAll<HTMLElement>(".glow-card").forEach((c) => c.style.setProperty("--glow", "0"));
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return ref;
}

// Section heading: words rise out of a mask when scrolled into view.
export function Heading({
  kicker,
  children,
  className = ""
}: {
  kicker: string;
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const split = SplitText.create(ref.current!.querySelector("h2")!, { type: "words", mask: "words" });
      gsap.from(split.words, {
        yPercent: 110,
        rotate: 4,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.06,
        scrollTrigger: { trigger: ref.current, start: "top 82%" }
      });
      gsap.from(ref.current!.querySelector("p"), {
        opacity: 0,
        x: -16,
        duration: 0.8,
        scrollTrigger: { trigger: ref.current, start: "top 82%" }
      });
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={`split-room ${className}`}>
      <p className="kicker">{kicker}</p>
      <h2 className="display mt-3 text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.92]">{children}</h2>
    </div>
  );
}

// Children rise and fade in, staggered, when the container enters.
export function Rise({
  children,
  className = "",
  selector = ":scope > *",
  y = 40
}: {
  children: React.ReactNode;
  className?: string;
  selector?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const items = ref.current!.querySelectorAll(selector);
      gsap.from(items, {
        y,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 85%" }
      });
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
