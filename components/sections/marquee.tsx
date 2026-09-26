"use client";

import { useRef } from "react";
import type React from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/components/motion/engine";

// Endless strip whose speed and direction follow scroll velocity.
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className = ""
}: {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const track = root.current!.querySelector<HTMLElement>(".mq-track")!;
      const tween = gsap.to(track, { xPercent: -50, duration: speed, ease: "none", repeat: -1 });
      if (reverse) tween.progress(1).timeScale(-1);
      const base = reverse ? -1 : 1;
      let boost = 0;
      let dir = 1;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          boost = gsap.utils.clamp(0, 5, Math.abs(self.getVelocity()) / 400);
          dir = self.direction || 1;
        }
      });
      // Ease toward the target speed every frame; the scroll boost decays on its own.
      const tick = () => {
        const target = base * dir * (1 + boost);
        tween.timeScale(tween.timeScale() + (target - tween.timeScale()) * 0.08);
        boost *= 0.94;
      };
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        st.kill();
      };
    },
    { scope: root }
  );

  return (
    <div ref={root} className={`overflow-hidden ${className}`}>
      <div className="mq-track flex w-max">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
