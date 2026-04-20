import { Activity, Network, Shield } from "lucide-react";
import { MotionDiv } from "@/components/motion";
import { SectionShell } from "@/components/section-shell";
import { GlassCard } from "@/components/ui/card";

const missionPoints = [
  {
    icon: Network,
    title: "Coordination",
    body: "Making complex systems legible enough for people, models, and organizations to act together."
  },
  {
    icon: Activity,
    title: "Constraint-aware intelligence",
    body: "Designing around imperfect data, limited resources, latency, and the real cost of unreliable decisions."
  },
  {
    icon: Shield,
    title: "Resilience",
    body: "Using engineering judgment to support systems that need to keep working when conditions are difficult."
  }
];

export function Mission() {
  return (
    <SectionShell
      id="mission"
      eyebrow="Mission / Impact"
      title="Technology feels most meaningful when it helps under real constraints."
      description="The direction behind the work is deliberate: build intelligence that can support coordination, resilience, and better decisions in environments where the stakes are not abstract."
      className="relative"
    >
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <MotionDiv>
          <GlassCard className="relative overflow-hidden p-7 sm:p-9">
            <div className="absolute right-0 top-0 h-64 w-64 translate-x-24 -translate-y-24 rounded-full bg-cyan-signal/10 blur-3xl" />
            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-signal/75">
                Real-world systems
              </p>
              <p className="mt-6 text-2xl leading-10 text-white sm:text-3xl">
                The 2023 earthquake in Turkey shaped how I think about technical work:
                not as something separate from the world, but as a way to improve
                coordination, readiness, and decision-making when complexity becomes immediate.
              </p>
              <p className="mt-6 leading-8 text-slate-300">
                I am interested in AI and data systems that are measured not only by
                elegance, but by how reliably they behave under constraints. That is
                the thread connecting disaster logistics, industrial edge AI,
                ranking evaluation, and the software systems I choose to build.
              </p>
            </div>
          </GlassCard>
        </MotionDiv>

        <div className="grid gap-5">
          {missionPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <MotionDiv key={point.title} delay={index * 0.06}>
                <GlassCard className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-cyan-signal/25 bg-cyan-signal/[0.08] text-cyan-signal">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{point.title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{point.body}</p>
                </GlassCard>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
