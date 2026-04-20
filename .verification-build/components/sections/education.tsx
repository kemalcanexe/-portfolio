import { MapPin } from "lucide-react";
import { MotionDiv } from "@/components/motion";
import { SectionShell } from "@/components/section-shell";
import { GlassCard } from "@/components/ui/card";
import { education } from "@/data/portfolio";

export function Education() {
  return (
    <SectionShell
      id="education"
      eyebrow="Education / Global Experience"
      title="A technical foundation shaped across borders."
      description="The academic story combines rigorous interdisciplinary training in Istanbul with European exchange experience in Bologna."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {education.map((item, index) => (
          <MotionDiv key={item.institution} delay={index * 0.08}>
            <GlassCard className="relative h-full overflow-hidden p-7">
              <div className="absolute right-6 top-6 font-mono text-7xl font-semibold text-white/[0.035]">
                0{index + 1}
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-[8px] border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-slate-300">
                  <MapPin size={15} aria-hidden="true" />
                  {item.location}
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">{item.institution}</h3>
                <p className="mt-2 text-cyan-100/90">{item.degree}</p>
                <p className="mt-5 leading-8 text-slate-300">{item.detail}</p>
              </div>
            </GlassCard>
          </MotionDiv>
        ))}
      </div>
    </SectionShell>
  );
}
