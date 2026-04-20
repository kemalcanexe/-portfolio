import { MotionDiv } from "@/components/motion";
import { SectionShell } from "@/components/section-shell";
import { GlassCard } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { skillGroups } from "@/data/portfolio";

export function Skills() {
  return (
    <SectionShell
      id="skills"
      eyebrow="Skills"
      title="Capability clusters, not a keyword drawer."
      description="The stack reflects a profile that can analyze data, build software, reason about systems, and communicate technical work clearly."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <MotionDiv key={group.label} delay={index * 0.04}>
            <GlassCard className="h-full p-6 hover:border-cyan-signal/25 hover:bg-white/[0.05]">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-signal/75">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-white">{group.label}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </GlassCard>
          </MotionDiv>
        ))}
      </div>
    </SectionShell>
  );
}
