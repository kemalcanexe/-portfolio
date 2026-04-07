import { MotionDiv } from "@/components/motion";
import { SectionShell } from "@/components/section-shell";
import { GlassCard } from "@/components/ui/card";
import { aboutSignals } from "@/data/portfolio";

export function About() {
  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title="A builder trained to think in systems, not just screens."
      description="Neşenaz works across the spaces where data, software, operations, and human constraints meet. Her profile combines technical depth with the judgment to ask what a system is actually for."
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <MotionDiv>
          <GlassCard className="h-full p-6 sm:p-8">
            <p className="text-xl leading-9 text-white sm:text-2xl">
              I am drawn to problems where intelligence has to become useful under
              pressure: search systems that need to rank better, industrial devices
              that have to act with limited resources, and logistics questions where
              data must support real coordination.
            </p>
            <p className="mt-6 leading-8 text-slate-300">
              That is why my work moves between research, experimentation,
              engineering, and communication. I care about building things that are
              technically serious and grounded in the realities they are meant to serve.
            </p>
          </GlassCard>
        </MotionDiv>

        <div className="grid gap-5">
          {aboutSignals.map((item, index) => (
            <MotionDiv key={item.title} delay={index * 0.06}>
              <GlassCard className="group p-6 hover:border-cyan-signal/30 hover:bg-cyan-signal/[0.045]">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-signal/75">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.body}</p>
              </GlassCard>
            </MotionDiv>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
