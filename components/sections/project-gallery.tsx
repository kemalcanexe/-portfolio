import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/motion";
import { SectionFrame, SectionIntro } from "@/components/section-frame";
import { projects } from "@/data/site-content";
import { SpotlightPanel } from "@/components/ui/spotlight-panel";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

const tones = ["champagne", "lilac", "rose"] as const;

export function ProjectGallery() {
  return (
    <SectionFrame id="projects">
      <SectionIntro
        eyebrow="Projects"
        title="A curated body of work, from industrial edge AI to resilient logistics."
        description="This is where the portfolio becomes most tactile: the projects span different domains, but all share a preference for systems that need both precision and purpose."
        className="mb-10"
      />

      <div className="grid gap-5 lg:grid-cols-12">
        {projects.map((project, index) => {
          const tone = tones[index % tones.length];
          const spans =
            index === 0
              ? "lg:col-span-7"
              : index === 1
                ? "lg:col-span-5"
                : "lg:col-span-6";

          return (
            <Reveal key={project.title} delay={index * 0.04} className={spans}>
              <SpotlightPanel tone={tone} className={cn("h-full p-6 sm:p-7", index < 2 ? "min-h-[28rem]" : "min-h-[22rem]")}>
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-rose-300/72">
                        {project.theme}
                      </p>
                      <h3 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-white">
                        {project.title}
                      </h3>
                    </div>
                    <a
                      href={project.link}
                      aria-label={`Open link for ${project.title}`}
                      className="rounded-[8px] border border-white/10 bg-white/[0.05] p-2 text-stone-300 transition hover:border-rose-300/28 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  {index < 2 ? (
                    <div className="relative mt-6 flex-1 overflow-hidden rounded-[8px] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-5">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_28%,rgba(232,211,189,0.14),transparent_22%),radial-gradient(circle_at_76%_28%,rgba(216,206,231,0.16),transparent_24%),radial-gradient(circle_at_56%_74%,rgba(208,162,181,0.16),transparent_28%)]" />
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
                      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12" />
                      <div className="absolute left-[18%] top-[34%] h-3 w-3 rounded-full bg-champagne-200 shadow-[0_0_18px_rgba(243,228,214,0.65)]" />
                      <div className="absolute right-[18%] top-[42%] h-2.5 w-2.5 rounded-full bg-lilac-300 shadow-[0_0_18px_rgba(216,206,231,0.65)]" />
                      <div className="absolute bottom-[24%] left-[28%] h-2.5 w-2.5 rounded-full bg-rose-300 shadow-[0_0_18px_rgba(224,191,208,0.6)]" />
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 600 320"
                        className="absolute inset-0 h-full w-full opacity-70"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M42 212 C 138 136, 198 164, 286 126 C 372 88, 448 92, 558 42"
                          fill="none"
                          stroke="rgba(255,255,255,0.18)"
                          strokeWidth="1.2"
                        />
                        <path
                          d="M12 282 C 124 240, 208 262, 324 214 C 402 182, 482 174, 596 116"
                          fill="none"
                          stroke="rgba(243,228,214,0.26)"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>
                  ) : null}

                  <p className="mt-6 text-sm leading-7 text-stone-300/84">{project.summary}</p>
                  <p className="mt-4 text-sm leading-7 text-stone-400/88">{project.contribution}</p>
                  <p className="mt-5 text-sm leading-7 text-champagne-200/86">{project.matters}</p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {project.tags.map((tag) => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </div>
                </div>
              </SpotlightPanel>
            </Reveal>
          );
        })}
      </div>
    </SectionFrame>
  );
}
