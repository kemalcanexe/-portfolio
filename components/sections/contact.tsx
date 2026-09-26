"use client";

import { useRef } from "react";
import type React from "react";
import { profile } from "@/content/cv";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/components/motion/engine";

// Button that leans toward the pointer.
function Magnetic({ href, children, external = true }: { href: string; children: string; external?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (e: React.PointerEvent) => {
    if (prefersReducedMotion()) return;
    const r = ref.current!.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - r.left - r.width / 2) * 0.35,
      y: (e.clientY - r.top - r.height / 2) * 0.35,
      duration: 0.4,
      ease: "power3.out"
    });
  };
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
  return (
    <a
      ref={ref}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      onPointerMove={move}
      onPointerLeave={leave}
      className="glass inline-flex rounded-full px-7 py-4 text-lg font-semibold transition-colors hover:bg-white/10"
    >
      {children}
    </a>
  );
}

export function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const split = SplitText.create(root.current!.querySelector(".contact-big"), { type: "chars", mask: "chars" });
      gsap.from(split.chars, {
        yPercent: 100,
        duration: 1,
        ease: "expo.out",
        stagger: 0.02,
        scrollTrigger: { trigger: root.current, start: "top 70%" }
      });
      gsap.to(".contact-orb", { rotate: 360, duration: 40, ease: "none", repeat: -1 });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="contact" className="relative overflow-hidden pb-10 pt-32">
      <div className="contact-orb pointer-events-none absolute left-1/2 top-1/3 h-[70vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-[conic-gradient(from_0deg,#2A0F8A,#7C5CFF,#FF6FD8,#2A0F8A)] opacity-25 blur-[120px]" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-10">
        <p className="kicker">Contact</p>
        <a
          href={`mailto:${profile.email}`}
          className="contact-big display mt-4 block break-all text-[clamp(2.2rem,8.2vw,9rem)] leading-[0.95] transition-colors hover:text-violet-soft"
        >
          {profile.email}
        </a>
        <div className="mt-12 flex flex-wrap gap-3">
          <Magnetic href={profile.cv}>Download CV</Magnetic>
          <Magnetic href={profile.linkedin}>LinkedIn</Magnetic>
          <Magnetic href={profile.github} external={false}>
            GitHub
          </Magnetic>
        </div>

        <footer className="mt-32 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-fog-faint">
          <span>{profile.name}, {profile.location}</span>
          <span className="font-mono text-xs">Search: BM25 + trigram, confidence-weighted fusion · Fluid: WebGL</span>
        </footer>
      </div>
    </section>
  );
}
