"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { profile } from "@/content/cv";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/components/motion/engine";
import { HeroSearchDemo } from "@/components/search/hero-search-demo";
import { openPalette } from "@/components/search/palette-store";

const LiquidEther = dynamic(() => import("@/components/fx/liquid-ether"), { ssr: false });

const FIELDS = ["Information retrieval", "Edge AI", "Humanitarian logistics"];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      if (prefersReducedMotion()) return;

      const name = SplitText.create(q(".hero-name"), { type: "chars", mask: "chars" });
      // Gradient across the surname, one colour per letter (background-clip breaks on split text).
      const grad = q(".hero-grad")[0]?.querySelectorAll<HTMLElement>(".hero-grad *:not(:has(*))") ?? [];
      const mix = gsap.utils.interpolate("#C6B5FF", "#FF6FD8");
      grad.forEach((c, i) => (c.style.color = mix(i / Math.max(grad.length - 1, 1))));
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(q(".hero-veil"), { opacity: 1, duration: 1.6, ease: "power2.inOut" }, 0)
        .from(name.chars, { yPercent: 115, rotate: 10, duration: 1.4, stagger: 0.035 }, 0.2)
        .from(q(".hero-in"), { y: 28, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.8);

      // Field names cycle in place.
      const words = q(".hero-field");
      const cycle = gsap.timeline({ repeat: -1, delay: 1.6 });
      words.forEach((w, i) => {
        const next = words[(i + 1) % words.length];
        cycle
          .to(w, { yPercent: -120, opacity: 0, duration: 0.5, ease: "power3.in" }, "+=2.2")
          .fromTo(next, { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, ease: "expo.out" }, ">-0.05");
      });

      // Name drifts and fades as the page scrolls away.
      gsap.to(q(".hero-name-wrap"), {
        yPercent: -30,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true }
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="top" className="relative flex h-[100svh] min-h-[680px] flex-col overflow-hidden">
      <div className="absolute inset-0">
        <LiquidEther
          colors={["#2A0F8A", "#7C5CFF", "#FF6FD8"]}
          backgroundColor="#07050D"
          resolution={0.4}
          iterationsPoisson={20}
          iterationsViscous={16}
          mouseForce={24}
          cursorSize={120}
          autoDemo
          autoSpeed={0.4}
          autoIntensity={2.4}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_40%,transparent_30%,#07050D_92%)]" />
      <div className="hero-veil pointer-events-none absolute inset-0 bg-night opacity-0" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-end px-5 pb-10 sm:px-10 sm:pb-14">
        <div className="hero-in mb-auto mt-28 flex flex-wrap items-center gap-3">
          <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-mint" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            Fulbright Principal Candidate, 2026–2027
          </span>
          <span className="glass rounded-full px-4 py-2 text-sm text-fog-dim">{profile.location}</span>
        </div>

        <div className="hero-in absolute right-10 top-[24%] hidden xl:block">
          <HeroSearchDemo />
        </div>

        <div className="hero-name-wrap">
          <h1 className="hero-name split-room display text-[clamp(4.2rem,15vw,15.5rem)] leading-[0.86] tracking-[-0.04em]">
            Neşenaz
            <br />
            <span className="hero-grad text-violet-soft">Yalçın</span>
          </h1>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="hero-in max-w-xl text-lg text-fog-dim sm:text-xl">
              Computer Science &amp; Industrial Engineering, Sabancı University
            </p>
            <p className="hero-in mt-2 flex flex-col text-2xl sm:flex-row sm:items-baseline sm:gap-3 sm:text-4xl">
              <span className="whitespace-nowrap text-fog-faint">Research in</span>
              <span className="inline-grid overflow-hidden py-1 align-bottom">
                {FIELDS.map((f, i) => (
                  <span
                    key={f}
                    className={`hero-field display whitespace-nowrap text-violet-soft [grid-area:1/1] ${
                      i === 0 ? "" : "opacity-0"
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </span>
            </p>
          </div>

          <div className="hero-in flex flex-wrap gap-3">
            <a
              href={profile.cv}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-full bg-fog px-6 py-3.5 font-semibold text-night transition-transform hover:scale-[1.03]"
            >
              <span className="relative z-10">Download CV</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-soft to-orchid transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="glass rounded-full px-6 py-3.5 font-semibold transition-colors hover:bg-white/10"
            >
              Email
            </a>
            <button
              type="button"
              onClick={openPalette}
              className="glass flex items-center gap-3 rounded-full px-5 py-3.5 font-semibold transition-colors hover:bg-white/10"
            >
              Search my work
              <kbd className="rounded-md border border-white/15 px-1.5 font-mono text-xs text-fog-dim">⌘K</kbd>
            </button>
          </div>
        </div>
      </div>

      <div className="hero-in pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-fog-faint sm:flex">
        <span>Scroll</span>
        <span className="h-10 w-px overflow-hidden bg-white/10">
          <span className="block h-1/2 w-px animate-[scrollcue_1.8s_ease-in-out_infinite] bg-violet-soft" />
        </span>
      </div>
    </section>
  );
}
