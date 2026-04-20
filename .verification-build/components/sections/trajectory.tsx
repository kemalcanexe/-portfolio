import { MapPin } from "lucide-react";
import { Reveal } from "@/components/motion";
import { SectionFrame, SectionIntro } from "@/components/section-frame";
import { achievements, education } from "@/data/site-content";
import { SpotlightPanel } from "@/components/ui/spotlight-panel";

export function Trajectory() {
  return (
    <SectionFrame id="trajectory">
      <SectionIntro
        eyebrow="Trajectory"
        title="Education, recognition, and the path beneath the work."
        description="The portfolio is built on a dual technical foundation, international exposure, and early signals of strong communication, discipline, and direction."
        className="mb-10"
      />

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SpotlightPanel tone="champagne" className="h-full p-7 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-rose-300/72">
              Education / Global Experience
            </p>

            <div className="relative mt-8 grid gap-8">
              <div className="absolute bottom-0 left-[1.1rem] top-2 w-px bg-gradient-to-b from-white/0 via-white/16 to-white/0" />

              {education.map((item, index) => (
                <div key={item.institution} className="relative pl-10">
                  <span className="absolute left-0 top-2 flex h-9 w-9 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.06] text-champagne-200">
                    <MapPin size={16} aria-hidden="true" />
                  </span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-rose-300/72">
                    0{index + 1} · {item.location}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl text-white">{item.institution}</h3>
                  <p className="mt-2 text-stone-200/82">{item.degree}</p>
                  <p className="mt-4 text-sm leading-7 text-stone-300/84">{item.detail}</p>
                </div>
              ))}
            </div>
          </SpotlightPanel>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {achievements.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <SpotlightPanel tone={index % 2 === 0 ? "rose" : "lilac"} className="h-full p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-rose-300/72">
                  {item.title}
                </p>
                <p className="mt-5 font-serif text-4xl leading-none text-white">{item.detail}</p>
                <p className="mt-4 text-sm leading-7 text-stone-300/84">{item.note}</p>
              </SpotlightPanel>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
