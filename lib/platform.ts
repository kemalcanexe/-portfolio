"use client";

import { useEffect, useState } from "react";

// "apple": Mac or iPad (⌘K). "other": Windows, Linux, ChromeOS (Ctrl K).
// "mobile": phones and Android devices, where no keyboard shortcut is shown.
export type Platform = "apple" | "other" | "mobile";

export function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  // iPadOS reports itself as a Mac; touch support gives it away.
  const iPad = /iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  if (iPad) return "apple";
  if (/iPhone|iPod|Android|Mobile/i.test(ua)) return "mobile";
  if (/Macintosh|Mac OS X/.test(ua)) return "apple";
  return "other";
}

// Null until mounted, so server and first client render agree.
export function usePlatform(): Platform | null {
  const [platform, setPlatform] = useState<Platform | null>(null);
  useEffect(() => setPlatform(detectPlatform()), []);
  return platform;
}

export function useShortcutLabel(): string | null {
  const platform = usePlatform();
  if (platform === "apple") return "⌘K";
  if (platform === "other") return "Ctrl K";
  return null;
}
