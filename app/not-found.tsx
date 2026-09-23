import { ArrowLeft, Compass } from "lucide-react";
import { Reveal } from "@/components/motion";
import { SiteBackground } from "@/components/site-background";
import { SiteFooter } from "@/components/site-footer";
import { LuxeButton } from "@/components/ui/luxe-button";

// Kept out of JSX text so the apostrophes stay plain characters rather than entities.
const notFoundMessage =
  "I'm sorry, I haven't yet encountered what you're looking for in my career journey.";

export default function NotFound() {
  return (
    <>
      <SiteBackground />

      <main className="relative flex min-h-[86svh] items-center pt-24 sm:pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[8px] border border-white/10 px-6 py-14 shadow-luxe sm:px-10 sm:py-16 lg:px-16 lg:py-20">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(99,38,73,0.26),rgba(18,9,22,0.92)_38%,rgba(10,6,16,0.92)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(232,211,189,0.16),transparent_20%),radial-gradient(circle_at_84%_22%,rgba(216,206,231,0.14),transparent_22%),radial-gradient(circle_at_52%_86%,rgba(208,162,181,0.1),transparent_32%)]" />
              <div className="absolute -right-20 top-8 h-64 w-64 rounded-full border border-white/10 bg-white/[0.03] blur-3xl" />
              <div className="absolute left-[-4rem] bottom-[12%] h-40 w-40 rounded-full border border-rose-300/10 bg-rose-300/[0.04] blur-2xl" />

              <svg
                aria-hidden="true"
                viewBox="0 0 1400 620"
                className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="not-found-line" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(243,228,214,0.85)" />
                    <stop offset="55%" stopColor="rgba(216,206,231,0.42)" />
                    <stop offset="100%" stopColor="rgba(208,162,181,0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M120,470 C320,360 430,420 640,300 C860,176 980,228 1240,90"
                  fill="none"
                  stroke="url(#not-found-line)"
                  strokeWidth="1.2"
                />
                <path
                  d="M0,560 C260,450 420,520 690,400 C910,300 1120,352 1400,190"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
              </svg>

              <div className="relative z-10 max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-champagne-200/80">
                  404 · Page not found
                </p>

                <h1 className="mt-6 font-serif text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
                  {notFoundMessage}
                </h1>

                <p className="mt-7 max-w-xl text-base leading-8 text-stone-300/84 sm:text-lg">
                  This page does not exist, or it has moved. The work, the research, and the
                  writing are all still a step away.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <LuxeButton href="/" variant="primary">
                    <ArrowLeft className="h-4 w-4" />
                    Return to the portfolio
                  </LuxeButton>
                  <LuxeButton href="/#projects" variant="secondary">
                    <Compass className="h-4 w-4" />
                    Browse the work
                  </LuxeButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
