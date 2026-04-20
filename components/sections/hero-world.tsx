import { ArrowDownRight, Download, Mail, Sparkles } from "lucide-react";
import { Reveal, Stagger } from "@/components/motion";
import { LuxeButton } from "@/components/ui/luxe-button";
import { Chip } from "@/components/ui/chip";
import { heroHighlights, profile } from "@/data/site-content";

const heroTags = ["AI & Data Science", "Software Systems", "Research Thinking", "Industrial Intelligence"];

export function HeroWorld() {
  return (
    <section id="hero" className="relative pt-28 sm:pt-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[8px] border border-white/10 px-6 pb-10 pt-8 shadow-luxe sm:px-8 lg:px-12 lg:pb-12">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(99,38,73,0.26),rgba(18,9,22,0.92)_38%,rgba(10,6,16,0.92)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(232,211,189,0.16),transparent_18%),radial-gradient(circle_at_82%_18%,rgba(216,206,231,0.14),transparent_20%),radial-gradient(circle_at_50%_80%,rgba(208,162,181,0.1),transparent_32%)]" />
            <div className="absolute -right-16 top-10 h-64 w-64 rounded-full border border-white/10 bg-white/[0.03] blur-3xl" />
            <div className="absolute left-[-4rem] top-[35%] h-40 w-40 rounded-full border border-rose-300/10 bg-rose-300/[0.04] blur-2xl" />

            <svg
              aria-hidden="true"
              viewBox="0 0 1400 860"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="hero-line" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(243,228,214,0.85)" />
                  <stop offset="55%" stopColor="rgba(216,206,231,0.42)" />
                  <stop offset="100%" stopColor="rgba(208,162,181,0)" />
                </linearGradient>
              </defs>
              <path
                d="M140,660 C320,520 420,590 640,450 C860,310 980,360 1180,180"
                fill="none"
                stroke="url(#hero-line)"
                strokeWidth="1.2"
              />
              <path
                d="M0,760 C260,620 420,700 690,560 C910,450 1120,510 1400,310"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
            </svg>

            <div className="relative z-10 flex min-h-[74svh] flex-col justify-between gap-14">
              <div className="flex flex-wrap items-center gap-3 text-sm text-stone-300/80">
                <span className="inline-flex items-center gap-2 rounded-[8px] border border-white/12 bg-white/[0.05] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-rose-200/85">
                  <Sparkles className="h-3.5 w-3.5" />
                  Signature Portfolio
                </span>
                <span className="rounded-[8px] border border-white/10 px-3 py-2 text-sm text-stone-300/72">
                  {profile.location}
                </span>
              </div>

              <div className="max-w-5xl">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-champagne-200/80">
                  {profile.heroEyebrow}
                </p>
                <h1 className="mt-6 max-w-5xl font-serif text-5xl leading-[1.02] text-white sm:text-6xl lg:text-7xl">
                  {profile.headline}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-stone-200/84 sm:text-lg">
                  {profile.intro}
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-end">
                <div>
                  <Stagger className="flex flex-wrap gap-3">
                    {heroTags.map((tag) => (
                      <Reveal key={tag}>
                        <Chip>{tag}</Chip>
                      </Reveal>
                    ))}
                  </Stagger>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <LuxeButton href="#projects" variant="primary">
                      Explore Selected Work <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                    </LuxeButton>
                    <LuxeButton href={profile.cvPath} download>
                      Download CV <Download className="h-4 w-4" aria-hidden="true" />
                    </LuxeButton>
                    <LuxeButton href={`mailto:${profile.email}`} variant="ghost">
                      Write to Me <Mail className="h-4 w-4" aria-hidden="true" />
                    </LuxeButton>
                  </div>
                </div>

                <div className="max-w-sm">
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-rose-300/75">
                    Mood / Method
                  </p>
                  <p className="mt-3 text-sm leading-7 text-stone-300/82 sm:text-[15px]">
                    {profile.signature}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Stagger className="mt-6 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
          {heroHighlights.map((item) => (
            <Reveal key={item.label}>
              <div className="max-w-sm">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-rose-300/72">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-stone-300/84">{item.value}</p>
              </div>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
