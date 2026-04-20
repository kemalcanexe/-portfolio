import { Orbit, Shield, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion";
import { SectionFrame } from "@/components/section-frame";
import { SpotlightPanel } from "@/components/ui/spotlight-panel";

const missionSignals = [
  {
    icon: Orbit,
    title: "Coordination",
    body: "How complex systems help people, institutions, and data move with more clarity."
  },
  {
    icon: Shield,
    title: "Resilience",
    body: "How technical work behaves when conditions are constrained, urgent, or difficult."
  },
  {
    icon: Sparkles,
    title: "Meaning",
    body: "How intelligent systems can be elegant without becoming disconnected from what they are for."
  }
];

export function MissionEditorial() {
  return (
    <SectionFrame id="mission">
      <Reveal>
        <div className="relative overflow-hidden rounded-[8px] border border-white/10 px-6 py-8 shadow-luxe sm:px-8 lg:px-12 lg:py-12">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(99,38,73,0.34),rgba(18,9,22,0.78)_42%,rgba(10,6,16,0.88)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(243,228,214,0.12),transparent_20%),radial-gradient(circle_at_76%_20%,rgba(216,206,231,0.12),transparent_24%),radial-gradient(circle_at_50%_78%,rgba(208,162,181,0.1),transparent_28%)]" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-rose-300/80">
                Mission / Impact
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight text-white sm:text-5xl">
                Technology feels most meaningful when it can still think clearly under pressure.
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-stone-200/84 sm:text-lg">
                The 2023 earthquake in Turkey shaped how I think about technical
                ambition. Not as something separate from life, but as a way to improve
                coordination, readiness, and intelligent decision-making when
                complexity becomes immediate.
              </p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-stone-300/82">
                That thread runs through my interest in disaster logistics,
                industrial edge AI, ranking systems, and the software I choose to
                build. I am drawn to work that is rigorous, useful, and calm under
                real constraints.
              </p>
            </div>

            <div className="grid gap-4">
              {missionSignals.map((signal, index) => {
                const Icon = signal.icon;

                return (
                  <Reveal key={signal.title} delay={index * 0.06}>
                    <SpotlightPanel tone={index === 1 ? "champagne" : "lilac"} className="p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.06] text-champagne-200">
                          <Icon size={18} aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-serif text-2xl text-white">{signal.title}</h3>
                          <p className="mt-2 text-sm leading-7 text-stone-300/84">{signal.body}</p>
                        </div>
                      </div>
                    </SpotlightPanel>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </SectionFrame>
  );
}
