import { Reveal } from "@/components/motion";
import { SectionFrame, SectionIntro } from "@/components/section-frame";
import { experiences } from "@/data/site-content";
import { SpotlightPanel } from "@/components/ui/spotlight-panel";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

export function ExperienceEditorial() {
  return (
    <SectionFrame id="experience">
      <div className="grid gap-10 lg:grid-cols-[0.5fr_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionIntro
            eyebrow="Experience"
            title="An operating history shaped by research, industry, and teaching."
            description="Each role added a different texture: ranking systems, industrial edge intelligence, financial automation, analytics, and the communication side of technical work."
          />
        </div>

        <div className="grid gap-5">
          {experiences.map((item, index) => (
            <Reveal key={`${item.organization}-${item.role}`} delay={index * 0.05}>
              <SpotlightPanel
                tone={index % 3 === 0 ? "rose" : index % 3 === 1 ? "lilac" : "champagne"}
                className={cn("p-6 sm:p-7", index % 2 === 0 ? "md:mr-10" : "md:ml-10")}
              >
                <div className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-rose-300/70">
                      {item.period} · {item.location}
                    </p>
                    <h3 className="mt-4 font-serif text-3xl text-white">{item.role}</h3>
                    <p className="mt-2 text-stone-300/84">{item.organization}</p>
                    <p className="mt-5 text-sm leading-7 text-champagne-200/84">{item.impact}</p>
                  </div>

                  <div>
                    <ul className="space-y-3 text-sm leading-7 text-stone-300/84">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne-200" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Chip key={tag}>{tag}</Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightPanel>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
