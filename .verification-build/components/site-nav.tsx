"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/data/site-content";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-5">
      <nav
        aria-label="Primary navigation"
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-[8px] border px-4 py-3 backdrop-blur-2xl transition duration-300 sm:px-5",
          scrolled
            ? "border-white/12 bg-noir-980/78 shadow-luxe"
            : "border-white/8 bg-noir-980/54"
        )}
      >
        <a href="#hero" className="inline-flex items-center gap-3 rounded-[8px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-300">
          <span className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-white/12 bg-[linear-gradient(135deg,rgba(224,191,208,0.18),rgba(255,255,255,0.04))] font-serif text-lg text-champagne-200 shadow-halo">
            N
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white">{profile.name}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-rose-300/70">
              Istanbul
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-[8px] px-3 py-2 text-sm font-medium text-stone-300/88 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-[8px] border border-rose-300/22 bg-[linear-gradient(135deg,rgba(208,162,181,0.16),rgba(255,255,255,0.04))] px-4 py-2 text-sm font-semibold text-rose-200 transition hover:border-rose-300/36 hover:bg-[linear-gradient(135deg,rgba(208,162,181,0.2),rgba(255,255,255,0.06))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300 lg:inline-flex"
        >
          Connect
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="rounded-[8px] border border-white/10 bg-white/[0.05] p-2 text-stone-100 transition hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300 lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(12px)" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-3 max-w-7xl rounded-[8px] border border-white/10 bg-noir-980/92 p-3 shadow-luxe backdrop-blur-2xl lg:hidden"
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-[8px] px-3 py-3 text-sm font-medium text-stone-200 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
