import { MotionDiv } from "@/components/motion";
import { SectionShell } from "@/components/section-shell";
import { GlassCard } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { experiences } from "@/data/portfolio";

export function Experience() {
  return (
    <SectionShell
      id="experience"
      eyebrow="Experience"
      title="Industry, research, and teaching across intelligent systems."
      description="A compact view of roles that connect applied data science, industrial AI, automation, logistics research, and technical communication."
    >
      <div className="relative">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-signal/0 via-cyan-signal/35 to-cyan-signal/0 md:block" />
        <div className="grid gap-5">
          {experiences.map((experience, index) => (
            <MotionDiv key={`${experience.organization}-${experience.role}`} delay={index * 0.04}>
              <GlassCard className="relative p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-signal/30 hover:bg-white/[0.055] md:ml-12">
                <div className="absolute -left-[3.25rem] top-8 hidden h-3 w-3 rounded-full border border-cyan-signal/50 bg-ink-950 shadow-[0_0_22px_rgba(77,231,255,0.7)] md:block" />
                <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-signal/75">
                      {experience.period} · {experience.location}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{experience.role}</h3>
                    <p className="mt-1 text-slate-300">{experience.organization}</p>
                    <p className="mt-4 text-sm leading-6 text-cyan-100/85">{experience.impact}</p>
                  </div>
                  <div>
                    <ul className="space-y-3 text-sm leading-7 text-slate-300 sm:text-base">
                      {experience.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-signal" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {experience.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </MotionDiv>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
