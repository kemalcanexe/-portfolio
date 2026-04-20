"use client";

import type React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type PanelTone = "rose" | "lilac" | "champagne";

type SpotlightPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: PanelTone;
  interactive?: boolean;
};

const spotlightMap: Record<PanelTone, string> = {
  rose: "rgba(208,162,181,0.24)",
  lilac: "rgba(216,206,231,0.24)",
  champagne: "rgba(232,211,189,0.22)"
};

export function SpotlightPanel({
  className,
  tone = "rose",
  interactive = true,
  children,
  ...props
}: SpotlightPanelProps) {
  const reducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 20, mass: 0.45 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 20, mass: 0.45 });

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !interactive) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;

    event.currentTarget.style.setProperty("--panel-x", `${relativeX}px`);
    event.currentTarget.style.setProperty("--panel-y", `${relativeY}px`);
    event.currentTarget.style.setProperty("--panel-spotlight", spotlightMap[tone]);

    const rotateAroundY = (relativeX / bounds.width - 0.5) * 7;
    const rotateAroundX = (0.5 - relativeY / bounds.height) * 7;

    rotateX.set(rotateAroundX);
    rotateY.set(rotateAroundY);
  };

  const reset = (event?: React.PointerEvent<HTMLDivElement>) => {
    rotateX.set(0);
    rotateY.set(0);

    if (event?.currentTarget) {
      event.currentTarget.style.setProperty("--panel-x", "50%");
      event.currentTarget.style.setProperty("--panel-y", "50%");
    }
  };

  return (
    <motion.div
      {...props}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      whileHover={reducedMotion || !interactive ? undefined : { y: -4 }}
      style={
        reducedMotion || !interactive
          ? undefined
          : {
              rotateX: springX,
              rotateY: springY,
              transformPerspective: 1400
            }
      }
      className={cn(
        "group relative isolate overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.06] shadow-veil backdrop-blur-xl [transform-style:preserve-3d]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--panel-x, 50%) var(--panel-y, 50%), var(--panel-spotlight, rgba(208,162,181,0.24)), transparent 58%)"
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-px rounded-[7px] bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_28%,transparent)] opacity-70"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
