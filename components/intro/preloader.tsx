"use client";

import { useEffect, useRef } from "react";
import { gsap, lockScroll, prefersReducedMotion } from "@/components/motion/engine";
import { finishIntro, INTRO_KEY } from "@/components/intro/intro-store";

const NAME = "Neşenaz Yalçın";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/";

// First-visit intro: a load counter, the name decoding out of random glyphs,
// then the panel lifts off the page. Skipped on later visits (a head script
// adds html.intro-seen before paint); add ?intro to the URL to see it again.
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const seen = document.documentElement.classList.contains("intro-seen");
    if (seen || prefersReducedMotion()) {
      el.style.display = "none";
      finishIntro();
      return;
    }
    lockScroll(true);
    const counter = el.querySelector<HTMLElement>(".pl-count")!;
    const bar = el.querySelector<HTMLElement>(".pl-bar")!;
    const letters = [...el.querySelectorAll<HTMLElement>(".pl-letter")];

    const count = { v: 0 };
    // Start once the first frames have painted, so hydration work does not eat the counter.
    const tl = gsap.timeline({ paused: true });
    let raf = requestAnimationFrame(() => (raf = requestAnimationFrame(() => tl.play())));
    tl.to(count, {
      v: 100,
      duration: 1.9,
      ease: "power2.inOut",
      onUpdate: () => {
        counter.textContent = String(Math.round(count.v)).padStart(3, "0");
        bar.style.transform = `scaleX(${count.v / 100})`;
      }
    });

    // Each letter cycles through random glyphs and locks in, left to right.
    letters.forEach((letter, i) => {
      const final = letter.dataset.char!;
      if (final === " ") return;
      const scramble = { t: 0 };
      tl.to(
        scramble,
        {
          t: 1,
          duration: 0.9,
          ease: "none",
          onStart: () => (letter.style.opacity = "1"),
          onUpdate: () => {
            letter.textContent = scramble.t < 0.85 ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : final;
          },
          onComplete: () => {
            letter.textContent = final;
            letter.style.color = "#EEEAF7";
          }
        },
        0.15 + i * 0.07
      );
    });

    const ready = document.fonts?.ready ?? Promise.resolve();
    tl.addPause(">", () => {
      ready.then(() => tl.resume());
    });
    tl.to(el.querySelector(".pl-inner"), { yPercent: -30, opacity: 0, duration: 0.7, ease: "power3.in" }, ">+0.15")
      .add(() => {
        finishIntro();
        lockScroll(false);
        try {
          localStorage.setItem(INTRO_KEY, "1");
        } catch {
          /* private mode */
        }
      })
      .to(el, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut" }, "<")
      .set(el, { display: "none" });

    return () => {
      cancelAnimationFrame(raf);
      tl.kill();
      lockScroll(false);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="preloader fixed inset-0 z-[90] flex items-end bg-night"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      <div className="pl-inner mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-5 pb-12 sm:px-10">
        <p className="display text-[clamp(2.6rem,9vw,8rem)] leading-none">
          {[...NAME].map((c, i) => (
            <span key={i} data-char={c} className="pl-letter inline-block text-violet-soft opacity-0">
              {c === " " ? " " : c}
            </span>
          ))}
        </p>
        <div className="flex items-end justify-between gap-6 font-mono text-sm text-fog-dim">
          <span>Indexing CV · building fusion index · warming WebGL</span>
          <span className="pl-count display text-6xl text-fog sm:text-8xl">000</span>
        </div>
        <div className="h-px w-full bg-white/10">
          <div className="pl-bar h-px w-full origin-left scale-x-0 bg-gradient-to-r from-violet to-orchid" />
        </div>
      </div>
    </div>
  );
}
