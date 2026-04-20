"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { navItems, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between rounded-[8px] border border-white/10 bg-ink-950/72 px-4 py-3 shadow-panel-glow backdrop-blur-2xl"
      >
        <Link
          href="#hero"
          className="group inline-flex items-center gap-3 rounded-[8px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-signal"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-cyan-signal/30 bg-cyan-signal/[0.08] font-mono text-sm font-semibold text-cyan-signal shadow-signal-sm">
            NY
          </span>
          <span className="hidden text-sm font-semibold text-white sm:block">
            {profile.name}
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[8px] px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.055] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-signal"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="#contact"
          className="hidden rounded-[8px] border border-cyan-signal/30 bg-cyan-signal/[0.08] px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-signal/[0.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-signal lg:inline-flex"
        >
          Connect
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="rounded-[8px] border border-white/10 bg-white/[0.05] p-2 text-slate-100 transition hover:bg-white/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-signal lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <div
        className={cn(
          "mx-auto mt-2 grid max-w-7xl overflow-hidden rounded-[8px] border border-white/10 bg-ink-950/90 shadow-panel-glow backdrop-blur-2xl transition-all duration-300 lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0">
          <div className="grid gap-1 p-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-[8px] px-3 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-signal"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
