import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { MotionDiv } from "@/components/motion";
import { SectionShell } from "@/components/section-shell";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { profile } from "@/data/portfolio";

export function Contact() {
  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title="Open to technical work where intelligence meets real-world purpose."
      description="Interested in AI, data science, software engineering, research, intelligent systems, and product-minded technical opportunities."
    >
      <MotionDiv>
        <GlassCard className="relative overflow-hidden p-7 sm:p-10">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-signal/12 blur-3xl" />
          <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-magenta-pulse/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="max-w-3xl text-2xl leading-10 text-white sm:text-3xl">
                Let’s talk about systems that need more than a model: judgment,
                engineering, evaluation, and a clear reason to exist.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={`mailto:${profile.email}`} variant="primary" external>
                  Email Me <Mail className="ml-2 h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href={profile.linkedin} external>
                  LinkedIn <Linkedin className="ml-2 h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href={profile.github} variant="ghost" external>
                  GitHub <Github className="ml-2 h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
            <div className="rounded-[8px] border border-white/10 bg-ink-950/55 p-5">
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="h-5 w-5 text-cyan-signal" aria-hidden="true" />
                <span>{profile.location}</span>
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="mt-5 block break-words rounded-[8px] border border-white/10 bg-white/[0.045] p-4 font-mono text-sm text-cyan-100 transition hover:border-cyan-signal/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-signal"
              >
                {profile.email}
              </a>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Replace placeholder email, LinkedIn, GitHub, CV, and project URLs
                in <span className="font-mono text-slate-300">data/portfolio.ts</span>.
              </p>
            </div>
          </div>
        </GlassCard>
      </MotionDiv>
    </SectionShell>
  );
}
