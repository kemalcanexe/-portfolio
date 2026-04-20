import { Reveal } from "@/components/motion";
import { SectionFrame, SectionIntro } from "@/components/section-frame";
import { skillGroups } from "@/data/site-content";
import { SpotlightPanel } from "@/components/ui/spotlight-panel";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

export function Capabilities() {
  return (
    <SectionFrame id="skills">
      <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionIntro
            eyebrow="Capabilities"
            title="A technical wardrobe built for serious systems."
            description="The stack is intentionally broad, but the pattern is consistent: model, evaluate, build, optimize, and communicate."
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-12">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.label}
              delay={index * 0.04}
              className={cn(
                "xl:col-span-6",
                index === 0 || index === 3 ? "xl:col-span-5" : "",
                index === 1 || index === 4 ? "xl:col-span-7" : ""
              )}
            >
              <SpotlightPanel tone={index % 3 === 0 ? "rose" : index % 3 === 1 ? "lilac" : "champagne"} className="h-full p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-rose-300/72">
                  0{index + 1}
                </p>
                <h3 className="mt-4 font-serif text-3xl text-white">{group.label}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Chip key={skill}>{skill}</Chip>
                  ))}
                </div>
              </SpotlightPanel>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
