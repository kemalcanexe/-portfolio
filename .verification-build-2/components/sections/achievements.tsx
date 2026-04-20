import { Award } from "lucide-react";
import { MotionDiv } from "@/components/motion";
import { SectionShell } from "@/components/section-shell";
import { GlassCard } from "@/components/ui/card";
import { achievements } from "@/data/portfolio";

export function Achievements() {
  return (
    <SectionShell
      id="achievements"
      eyebrow="Achievements"
      title="Signals of direction, communication, and international readiness."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {achievements.map((achievement, index) => (
          <MotionDiv key={achievement.title} delay={index * 0.05}>
            <GlassCard className="h-full p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-cyan-signal/25 bg-cyan-signal/[0.08] text-cyan-signal">
                <Award size={20} aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{achievement.title}</h3>
              <p className="mt-2 text-2xl font-semibold text-cyan-100">
                {achievement.detail}
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-300">{achievement.note}</p>
            </GlassCard>
          </MotionDiv>
        ))}
      </div>
    </SectionShell>
  );
}
