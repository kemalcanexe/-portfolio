import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion";
import { SectionFrame } from "@/components/section-frame";
import { profile } from "@/data/site-content";
import { LuxeButton } from "@/components/ui/luxe-button";
import { SpotlightPanel } from "@/components/ui/spotlight-panel";

export function ContactAtelier() {
  return (
    <SectionFrame id="contact" className="pt-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[8px] border border-white/10 px-6 py-8 shadow-luxe sm:px-8 lg:px-12 lg:py-12">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,23,57,0.38),rgba(10,6,16,0.94)_48%,rgba(18,9,22,0.88))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(243,228,214,0.14),transparent_18%),radial-gradient(circle_at_82%_16%,rgba(216,206,231,0.12),transparent_18%),radial-gradient(circle_at_64%_82%,rgba(208,162,181,0.12),transparent_24%)]" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-rose-300/82">
                Contact
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight text-white sm:text-5xl">
                For teams building work with depth, ambition, and real consequence.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-stone-200/84 sm:text-lg">
                I am interested in AI, data science, software engineering, research,
                and intelligent systems where technical sophistication is matched by
                clarity of purpose.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <LuxeButton href={`mailto:${profile.email}`} variant="primary">
                  Email Me <Mail className="h-4 w-4" aria-hidden="true" />
                </LuxeButton>
                <LuxeButton href={profile.linkedin} external>
                  LinkedIn <Linkedin className="h-4 w-4" aria-hidden="true" />
                </LuxeButton>
                <LuxeButton href={profile.github} variant="ghost" external>
                  GitHub <Github className="h-4 w-4" aria-hidden="true" />
                </LuxeButton>
              </div>
            </div>

            <SpotlightPanel tone="champagne" className="p-6 sm:p-7">
              <div className="flex items-center gap-3 text-stone-300/82">
                <MapPin className="h-4 w-4 text-champagne-200" aria-hidden="true" />
                <span>{profile.location}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="group rounded-[8px] border border-white/10 bg-white/[0.05] px-4 py-4 transition hover:border-rose-300/26 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-rose-300/72">
                    Email
                  </p>
                  <p className="mt-3 inline-flex items-center gap-2 break-words text-white">
                    {profile.email}
                    <ArrowUpRight className="h-4 w-4 text-stone-400 transition group-hover:text-white" />
                  </p>
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[8px] border border-white/10 bg-white/[0.05] px-4 py-4 transition hover:border-rose-300/26 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-rose-300/72">
                    LinkedIn
                  </p>
                  <p className="mt-3 inline-flex items-center gap-2 text-white">
                    Replace with your profile
                    <ArrowUpRight className="h-4 w-4 text-stone-400 transition group-hover:text-white" />
                  </p>
                </a>

                <a
                  href={profile.cvPath}
                  className="group rounded-[8px] border border-white/10 bg-white/[0.05] px-4 py-4 transition hover:border-rose-300/26 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-rose-300/72">
                    CV
                  </p>
                  <p className="mt-3 inline-flex items-center gap-2 text-white">
                    Update the PDF in /public/cv
                    <ArrowUpRight className="h-4 w-4 text-stone-400 transition group-hover:text-white" />
                  </p>
                </a>
              </div>
            </SpotlightPanel>
          </div>
        </div>
      </Reveal>
    </SectionFrame>
  );
}
