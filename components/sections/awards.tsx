"use client";

import { useRef } from "react";
import { entries } from "@/content/cv";
import { gsap, Heading, prefersReducedMotion, useGSAP } from "@/components/motion/engine";

const awards = entries.filter((e) => e.section === "awards");
const TONES = [
  "from-[#2A0F8A] via-[#5B3BE0] to-[#FF6FD8]",
  "from-[#141024] via-[#2A1F5C] to-[#7C5CFF]",
  "from-[#1B0F2E] via-[#6B2A8C] to-[#FF6FD8]",
  "from-[#0F1A24] via-[#1E3A5C] to-[#7CF2C8]"
];

// Cards pin on top of each other; the ones underneath shrink and dim as the next arrives.
export function Awards() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>(".award-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.9 + i * 0.02,
          filter: "brightness(0.55)",
          ease: "none",
          // Dim only while the next card is actually sliding over this one.
          scrollTrigger: { trigger: cards[i + 1], start: "top 60%", end: "top 18%", scrub: true }
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="awards" className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-10">
      <Heading kicker="Awards">Recognition</Heading>
      <div className="mt-14">
        {awards.map((a, i) => (
          <article
            key={a.id}
            id={a.id}
            className={`award-card sticky mb-6 flex min-h-[46vh] origin-top flex-col justify-between overflow-hidden rounded-[2.5rem] bg-gradient-to-br p-8 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.6)] sm:p-12 ${TONES[i % TONES.length]}`}
            style={{ top: `calc(14vh + ${i * 22}px)` }}
          >
            <div className="flex items-start justify-between gap-6">
              <span className="font-mono text-sm text-white/70">
                {String(i + 1).padStart(2, "0")} / {String(awards.length).padStart(2, "0")}
              </span>
              {a.links?.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/25"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
            <div>
              <h3 className="display max-w-4xl text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.95]">{a.title}</h3>
              {a.bullets.map((b) => (
                <p key={b} className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
                  {b}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
