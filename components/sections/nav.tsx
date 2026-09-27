"use client";

import { useEffect, useState } from "react";
import { openPalette } from "@/components/search/palette-store";
import { useShortcutLabel } from "@/lib/platform";

const LINKS = [
  { href: "#publications", label: "Publications" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#awards", label: "Awards" },
  { href: "#contact", label: "Contact" }
];

// Floating nav: hides while scrolling down, returns on scroll up.
export function Nav() {
  const shortcut = useShortcutLabel();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 400);
      setSolid(y > 60);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
        hidden ? "-translate-y-24" : ""
      }`}
    >
      <nav
        aria-label="Main"
        className={`flex items-center gap-1 rounded-full border px-2 py-2 backdrop-blur-xl transition-colors duration-500 ${
          solid ? "border-white/10 bg-night-900/70" : "border-white/[0.06] bg-white/[0.03]"
        }`}
      >
        <a
          href="#top"
          className="mr-1 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet to-orchid font-display text-sm font-bold text-white"
        >
          NY
        </a>
        <ul className="hidden items-center md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm text-fog-dim transition-colors hover:bg-white/[0.06] hover:text-fog"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={openPalette}
          className="ml-1 flex items-center gap-2 rounded-full bg-white/[0.07] px-3.5 py-2 text-sm transition-colors hover:bg-white/[0.12]"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span>Search</span>
          {shortcut && <kbd className="hidden font-mono text-[11px] text-fog-faint sm:inline">{shortcut}</kbd>}
        </button>
      </nav>
    </header>
  );
}
