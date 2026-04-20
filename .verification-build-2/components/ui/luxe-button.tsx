"use client";

import type React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type LuxeButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  download?: boolean;
  external?: boolean;
  ariaLabel?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-champagne-300/40 bg-[linear-gradient(135deg,rgba(243,228,214,0.96),rgba(224,191,208,0.92))] text-noir-980 shadow-halo hover:border-champagne-200/50",
  secondary:
    "border-white/12 bg-white/[0.06] text-white hover:border-rose-300/30 hover:bg-white/[0.09]",
  ghost:
    "border-transparent bg-transparent text-rose-300/85 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
};

export function LuxeButton({
  href,
  children,
  variant = "secondary",
  className,
  download,
  external,
  ariaLabel
}: LuxeButtonProps) {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 220, damping: 18, mass: 0.35 });
  const y = useSpring(pointerY, { stiffness: 220, damping: 18, mass: 0.35 });

  const handleMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (reducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);

    pointerX.set(offsetX * 0.12);
    pointerY.set(offsetY * 0.12);
  };

  const reset = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      download={download}
      target={external && !href.startsWith("mailto:") ? "_blank" : undefined}
      rel={external && !href.startsWith("mailto:") ? "noreferrer" : undefined}
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      className={cn(
        "group relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-[8px] border px-5 py-2.5 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300",
        variants[variant],
        className
      )}
    >
      <span className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.22),transparent)] opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />
      <motion.span
        className="relative z-10 inline-flex items-center gap-2"
        style={reducedMotion ? undefined : { x, y }}
      >
        {children}
      </motion.span>
    </motion.a>
  );
}
