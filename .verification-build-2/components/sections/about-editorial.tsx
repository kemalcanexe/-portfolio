import { Reveal } from "@/components/motion";
import { SectionFrame, SectionIntro } from "@/components/section-frame";
import { aboutSignals } from "@/data/site-content";
import { SpotlightPanel } from "@/components/ui/spotlight-panel";

export function AboutEditorial() {
  return (
    <SectionFrame id="about">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionIntro
            eyebrow="About"
            title="Technical depth, but never only technical."
            description="I am interested in the kind of work that asks for rigor and taste at once: systems that need strong thinking, careful evaluation, and a sense of why they matter."
          />
        </div>

        <div className="grid gap-5">
          <Reveal>
            <SpotlightPanel tone="champagne" className="p-7 sm:p-8">
              <p className="max-w-4xl font-serif text-3xl leading-[1.28] text-white sm:text-4xl">
                I like work with structure and gravity:
                intelligent systems, search and ranking, software that needs to
                behave cleanly, and research problems where data has to meet reality.
              </p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-stone-300/84">
                Computer Science gave me depth in building and modeling. Industrial
                Engineering taught me how systems perform under pressure, tradeoffs,
                and operational complexity. Together, they shaped a way of working
                that is analytical, interdisciplinary, and quietly exacting.
              </p>
            </SpotlightPanel>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {aboutSignals.map((signal, index) => (
              <Reveal key={signal.title} delay={index * 0.06}>
                <SpotlightPanel tone={index === 1 ? "lilac" : "rose"} className="h-full p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-rose-300/72">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl text-white">{signal.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-stone-300/84">{signal.body}</p>
                </SpotlightPanel>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
