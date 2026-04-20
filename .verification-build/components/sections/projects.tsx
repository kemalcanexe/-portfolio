import { ExternalLink } from "lucide-react";
import { MotionDiv } from "@/components/motion";
import { SectionShell } from "@/components/section-shell";
import { GlassCard } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <SectionShell
      id="projects"
      eyebrow="Featured Projects"
      title="Selected work with technical depth and real-world texture."
      description="These projects are intentionally varied: retrieval, industrial AI, disaster logistics, full-stack systems, realtime interaction, and operations simulation."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <MotionDiv
            key={project.title}
            delay={index * 0.05}
            className={cn(index === 0 ? "lg:col-span-2 lg:row-span-2" : "")}
          >
            <GlassCard
              className={cn(
                "group relative h-full overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-signal/35 hover:bg-cyan-signal/[0.045]",
                index === 0 ? "min-h-[28rem] p-7 sm:p-8" : "min-h-[22rem]"
              )}
            >
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-signal/10 blur-3xl" />
                <div className="absolute -bottom-24 left-8 h-56 w-56 rounded-full bg-magenta-pulse/10 blur-3xl" />
              </div>
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-signal/75">
                    {project.theme}
                  </p>
                  <a
                    href={project.link}
                    aria-label={`Open project link for ${project.title}`}
                    className="rounded-[8px] border border-white/10 bg-white/[0.05] p-2 text-slate-300 transition hover:border-cyan-signal/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-signal"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-4 leading-7 text-slate-300">{project.summary}</p>
                <p className="mt-5 text-sm leading-7 text-slate-400">{project.contribution}</p>
                <div className="mt-6 rounded-[8px] border border-white/10 bg-ink-950/55 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                    Why it matters
                  </p>
                  <p className="mt-2 text-sm leading-6 text-cyan-50/85">{project.matters}</p>
                </div>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </GlassCard>
          </MotionDiv>
        ))}
      </div>
    </SectionShell>
  );
}
