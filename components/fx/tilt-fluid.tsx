"use client";

import { useEffect, useRef, useState } from "react";
import type React from "react";
import { prefersReducedMotion } from "@/components/motion/engine";

type IOSOrientation = typeof DeviceOrientationEvent & { requestPermission?: () => Promise<"granted" | "denied"> };
type State = "off" | "ask" | "hint" | "on";

// On touch devices, tilting the phone stirs the hero fluid. The simulation
// only listens to pointer input, so tilt is turned into a moving pointer:
// left/right tilt moves it across, forward/back tilt moves it up and down,
// relative to how the phone was held when tilt started.
export function TiltFluid({ target }: { target: React.RefObject<HTMLElement | null> }) {
  const [state, setState] = useState<State>("off");
  const cleanup = useRef<() => void>(() => {});

  // Starts listening; the returned promise resolves on the first real tilt reading.
  const start = () => {
    let base: number | null = null;
    let first: (() => void) | null = null;
    const arrived = new Promise<void>((res) => (first = res));
    const goal = { x: 0.5, y: 0.5 };
    const pos = { x: 0.5, y: 0.5 };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      if (base === null) {
        base = e.beta;
        first?.();
      }
      goal.x = Math.min(0.95, Math.max(0.05, 0.5 + e.gamma / 50));
      goal.y = Math.min(0.95, Math.max(0.05, 0.5 + (e.beta - base) / 40));
    };
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const el = target.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= window.innerHeight) return;
      const dx = goal.x - pos.x;
      const dy = goal.y - pos.y;
      if (Math.abs(dx) + Math.abs(dy) < 0.0015) return;
      pos.x += dx * 0.12;
      pos.y += dy * 0.12;
      window.dispatchEvent(
        new MouseEvent("mousemove", { clientX: r.left + pos.x * r.width, clientY: r.top + pos.y * r.height })
      );
    };
    window.addEventListener("deviceorientation", onTilt);
    loop();
    cleanup.current = () => {
      window.removeEventListener("deviceorientation", onTilt);
      cancelAnimationFrame(raf);
    };
    return arrived;
  };

  const showHint = () => {
    setState("hint");
    window.setTimeout(() => setState("on"), 3500);
  };

  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (!touch || !("DeviceOrientationEvent" in window) || prefersReducedMotion()) return;
    // Listen straight away. If nothing arrives, either the browser wants a tap
    // to grant motion access (iOS) or the device has no tilt sensor.
    let got = false;
    start().then(() => {
      got = true;
      showHint();
    });
    const timer = window.setTimeout(() => {
      if (!got && typeof (DeviceOrientationEvent as IOSOrientation).requestPermission === "function") setState("ask");
    }, 1200);
    return () => {
      window.clearTimeout(timer);
      cleanup.current();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ask = async () => {
    try {
      const res = await (DeviceOrientationEvent as IOSOrientation).requestPermission!();
      if (res !== "granted") return setState("off");
      cleanup.current();
      setState("off");
      start().then(showHint);
    } catch {
      setState("off");
    }
  };

  if (state === "off" || state === "on") return null;
  return state === "ask" ? (
    <button type="button" onClick={ask} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
      <PhoneIcon />
      Tap to move the fluid by tilting
    </button>
  ) : (
    <span className="glass inline-flex animate-pulse items-center gap-2 rounded-full px-4 py-2 text-sm text-violet-soft">
      <PhoneIcon />
      Tilt to move the fluid
    </span>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 -rotate-12" aria-hidden="true">
      <rect x="6" y="2.5" width="8" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 15h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
