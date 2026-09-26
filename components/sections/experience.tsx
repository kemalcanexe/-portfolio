"use client";

import { useRef } from "react";
import { entries, type Entry } from "@/content/cv";
import { gsap, Heading, prefersReducedMotion, useGSAP } from "@/components/motion/engine";

// Research, industry and teaching roles, newest start date first.
const ORDER = ["twente", "dsa210", "hepsiburada", "siemens", "bekaert", "getirfinans", "suhope", "pure"];
const roles = ORDER.map((id) => entries.find((e) => e.id === id)!).filter(Boolean);

const KIND: Record<string, { label: string; tone: string }> = {
  research: { label: "Research", tone: "bg-violet/20 text-violet-soft" },
  industry: { label: "Industry", tone: "bg-orchid/15 text-orchid" },
  teaching: { label: "Teaching", tone: "bg-mint/15 text-mint" }
};

function Card({ e, i }: { e: Entry; i: number }) {
  const kind = KIND[e.section];
  return (
    <article
      id={e.id}
      data-index={i}
      className="exp-card glass relative flex w-full shrink-0 lg:w-[460px] flex-col rounded-[2rem] p-7 sm:p-8"
    >
      <div className="flex items-center justify-between gap-3">
        <span className={`rounded-full px-3 py-1 font-mono text-xs ${kind.tone}`}>{kind.label}</span>
        <span className="font-mono text-xs text-fog-faint">{e.period}</span>
      </div>
      <h3 className="display mt-6 text-4xl leading-none sm:text-5xl">{e.org}</h3>
      <p className="mt-3 font-semibold text-fog">{e.title}</p>
      <p className="text-sm text-fog-faint">{e.location}</p>
      <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-fog-dim">
        {e.bullets.map((b) => (
          <li key={b} className="relative pl-5 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-violet">
            {b}
          </li>
        ))}
      </ul>
      {e.tags && (
        <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
          {e.tags.map((t) => (
            <span key={t} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-fog-dim">
              {t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current!.querySelector<HTMLElement>("[data-htrack]")!;
        const distance = () => track.scrollWidth - window.innerWidth + 80;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            id: "experience",
            trigger: root.current!.querySelector(".exp-pin"),
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        });
        gsap.to(".exp-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current!.querySelector(".exp-pin"),
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true
          }
        });
        // Cards tilt into place as they enter from the right.
        gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card) => {
          gsap.from(card, {
            rotateY: -18,
            opacity: 0.25,
            scale: 0.92,
            transformPerspective: 1200,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 100%",
              end: "left 72%",
              scrub: true
            }
          });
        });
      });
      mm.add("(max-width: 1023px)", () => {
        if (prefersReducedMotion()) return;
        gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card) =>
          gsap.from(card, { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%" } })
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="experience" className="relative py-24">
      <div className="exp-pin flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-10">
          <Heading kicker="Experience">Research, industry, teaching</Heading>
        </div>
        <div
          data-htrack
          data-count={roles.length}
          className="mt-12 flex flex-col gap-4 px-5 sm:px-10 lg:flex-row lg:gap-5 lg:pl-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))]"
        >
          {roles.map((e, i) => (
            <Card key={e.id} e={e} i={i} />
          ))}
        </div>
        <div className="mx-auto mt-10 hidden w-full max-w-[1400px] px-10 lg:block">
          <div className="h-px w-full bg-white/10">
            <div className="exp-progress h-px w-full origin-left scale-x-0 bg-gradient-to-r from-violet to-orchid" />
          </div>
        </div>
      </div>
    </section>
  );
}
