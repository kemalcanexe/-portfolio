import { ArrowDown, Download, Mail } from "lucide-react";
import { MotionDiv } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { profile } from "@/data/portfolio";

const heroTags = ["AI / Data Science", "Software Engineering", "Research", "Industrial Systems"];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 sm:px-6 lg:px-8"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-signal/10" />
        <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />
        <div className="absolute right-[8%] top-[22%] h-32 w-32 rounded-full border border-magenta-pulse/20 bg-magenta-pulse/[0.035] blur-[0.2px]" />
        <div className="absolute bottom-[18%] left-[8%] h-24 w-24 rounded-full border border-cyan-signal/20 bg-cyan-signal/[0.04]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <MotionDiv>
            <div className="mb-6 inline-flex items-center gap-2 rounded-[8px] border border-cyan-signal/20 bg-cyan-signal/[0.07] px-3 py-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-100">
              <span className="h-2 w-2 rounded-full bg-cyan-signal shadow-[0_0_18px_rgba(77,231,255,0.8)]" />
              Portfolio / 2026
            </div>
          </MotionDiv>

          <MotionDiv delay={0.08}>
            <p className="mb-4 text-lg font-medium text-cyan-100/90">{profile.name}</p>
            <h1 className="max-w-5xl text-5xl font-semibold text-white sm:text-6xl lg:text-7xl">
              {profile.headline}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              {profile.intro}
            </p>
          </MotionDiv>

          <MotionDiv delay={0.16}>
            <div className="mt-8 flex flex-wrap gap-3">
              {heroTags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </MotionDiv>

          <MotionDiv delay={0.24}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#projects" variant="primary">
                View Projects <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={profile.cvPath} download>
                Download CV <Download className="ml-2 h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={`mailto:${profile.email}`} variant="ghost" external>
                Contact Me <Mail className="ml-2 h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>

        <MotionDiv delay={0.18} className="relative">
          <div className="relative mx-auto aspect-square max-w-[34rem] rounded-[8px] border border-white/10 bg-white/[0.035] p-4 shadow-signal backdrop-blur-xl">
            <div className="absolute inset-8 rounded-full border border-cyan-signal/20" />
            <div className="absolute inset-20 rounded-full border border-white/10" />
            <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-signal/30 bg-cyan-signal/[0.08] shadow-signal-sm" />
            <div className="absolute left-[18%] top-[24%] h-3 w-3 rounded-full bg-cyan-signal shadow-[0_0_18px_rgba(77,231,255,0.9)]" />
            <div className="absolute right-[20%] top-[34%] h-2.5 w-2.5 rounded-full bg-magenta-pulse shadow-[0_0_18px_rgba(229,92,255,0.8)]" />
            <div className="absolute bottom-[22%] left-[30%] h-2 w-2 rounded-full bg-cyan-100 shadow-[0_0_18px_rgba(255,255,255,0.7)]" />
            <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-signal/40 to-transparent" />
            <div className="absolute inset-y-8 left-1/2 w-px bg-gradient-to-b from-transparent via-cyan-signal/35 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-[8px] border border-white/10 bg-ink-950/70 p-4 backdrop-blur-xl">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-signal/80">
                Signal Under Constraint
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                A portfolio interface for AI, research, engineering, and resilient systems thinking.
              </p>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
