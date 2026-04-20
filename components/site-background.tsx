"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function SiteBackground() {
  const reducedMotion = useReducedMotion();
  const [showPointerLayers, setShowPointerLayers] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const haloX = useSpring(pointerX, { stiffness: 90, damping: 18, mass: 0.5 });
  const haloY = useSpring(pointerY, { stiffness: 90, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (reducedMotion) return;

    const mediaQuery = window.matchMedia("(pointer: fine)");

    const updatePointerCapability = () => {
      if (!mediaQuery.matches) {
        setShowPointerLayers(false);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!mediaQuery.matches || event.pointerType !== "mouse") return;

      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setShowPointerLayers(true);
    };

    const handlePointerLeave = () => setShowPointerLayers(false);

    updatePointerCapability();

    mediaQuery.addEventListener("change", updatePointerCapability);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      mediaQuery.removeEventListener("change", updatePointerCapability);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [haloX, haloY, pointerX, pointerY, reducedMotion]);

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(123,49,88,0.24),transparent_24%),linear-gradient(180deg,#050308_0%,#0a0610_42%,#120916_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(216,206,231,0.12),transparent_20%),radial-gradient(circle_at_82%_12%,rgba(232,211,189,0.1),transparent_18%),radial-gradient(circle_at_70%_72%,rgba(208,162,181,0.12),transparent_22%)]" />

        <motion.div
          className="absolute left-[-10%] top-[8%] h-[26rem] w-[26rem] rounded-full bg-spotlight-plum blur-3xl"
          animate={
            reducedMotion
              ? undefined
              : { x: [-20, 35, -10], y: [0, 28, -16], scale: [1, 1.06, 0.98, 1] }
          }
          transition={{ duration: 24, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="absolute right-[-12%] top-[12%] h-[30rem] w-[30rem] rounded-full bg-spotlight-lilac opacity-80 blur-3xl"
          animate={
            reducedMotion
              ? undefined
              : { x: [20, -26, 18], y: [-18, 20, -12], scale: [0.98, 1.08, 1] }
          }
          transition={{ duration: 28, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[-18%] left-[18%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,38,73,0.34),transparent_64%)] blur-3xl"
          animate={
            reducedMotion
              ? undefined
              : { x: [-16, 12, -10], y: [12, -20, 6], scale: [1, 1.04, 0.96, 1] }
          }
          transition={{ duration: 30, ease: "easeInOut", repeat: Infinity }}
        />

        <div className="texture-noise absolute inset-0 opacity-25" />
        <div className="dust-layer absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_22%,transparent_78%,rgba(255,255,255,0.02))]" />

        {!reducedMotion && showPointerLayers ? (
          <motion.div
            style={{ x: haloX, y: haloY }}
            className="pointer-fine absolute left-0 top-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(243,228,214,0.12),rgba(216,206,231,0.08)_32%,transparent_68%)] blur-3xl"
          />
        ) : null}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,3,8,0.28)_62%,#050308_100%)]" />
      </div>

      {!reducedMotion && showPointerLayers ? (
        <>
          <motion.div
            aria-hidden="true"
            style={{ x: haloX, y: haloY }}
            className="pointer-fine fixed left-0 top-0 z-[70] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne-200/45 bg-white/[0.04] backdrop-blur-sm"
          />
          <motion.div
            aria-hidden="true"
            style={{ x: haloX, y: haloY }}
            className="pointer-fine fixed left-0 top-0 z-[71] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne-200 shadow-[0_0_24px_rgba(243,228,214,0.6)]"
          />
        </>
      ) : null}
    </>
  );
}
