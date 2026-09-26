import type React from "react";
import { Compact, Entry, Publication, Retrievable, Term } from "@/components/entry";
import { FieldLink } from "@/components/field-link";
import { SearchPanel } from "@/components/search-panel";
import { SearchProvider } from "@/components/search-context";
import { SideIndex } from "@/components/side-index";
import { SlmChart } from "@/components/slm-chart";
import { entries, profile, sections, service, skills, webNote, type SectionId } from "@/content/cv";

const bySection = (id: SectionId) => entries.filter((e) => e.section === id);
const label = (id: SectionId) => sections.find((s) => s.id === id)!.label;

function Section({ id, children }: { id: SectionId; children: React.ReactNode }) {
  return (
    <section id={`s-${id}`} aria-labelledby={`h-${id}`} className="border-t border-rule pt-6">
      <h2 id={`h-${id}`} className="text-sm font-semibold text-violet">
        {label(id)}
      </h2>
      <div className="mt-1">{children}</div>
    </section>
  );
}

const external = { target: "_blank", rel: "noreferrer" } as const;
const linkClass = "underline decoration-rule underline-offset-4 transition-colors hover:text-violet hover:decoration-violet";

export default function Home() {
  const [firstField, ...restFields] = profile.fields;
  return (
    <SearchProvider>
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:grid lg:grid-cols-[11rem_1fr] lg:gap-16">
        <aside className="pt-16">
          <SideIndex />
        </aside>

        <main className="min-w-0 pb-24">
          <header className="pt-12 sm:pt-16">
            <h1 className="rise text-5xl font-bold tracking-[-0.035em] sm:text-7xl" style={{ "--i": 0 } as React.CSSProperties}>
              {profile.name}
            </h1>
            <p className="rise mt-5 max-w-2xl text-xl leading-snug sm:text-2xl" style={{ "--i": 1 } as React.CSSProperties}>
              Computer Science &amp; Industrial Engineering, Sabancı University.{" "}
              <FieldLink>{firstField}</FieldLink>,{" "}
              {restFields.map((f, i) => (
                <span key={f}>
                  <FieldLink>{f}</FieldLink>
                  {i < restFields.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
            <p
              className="rise mt-5 flex flex-wrap gap-x-5 gap-y-1 text-muted"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              <span>{profile.location}</span>
              <a href={`mailto:${profile.email}`} className={linkClass}>
                {profile.email}
              </a>
              <a href={profile.cv} className={linkClass} {...external}>
                CV (PDF)
              </a>
              <a href={profile.linkedin} className={linkClass} {...external}>
                LinkedIn
              </a>
              <a href={profile.github} className={linkClass}>
                GitHub
              </a>
            </p>
          </header>

          <SearchPanel />

          <div className="mt-10 space-y-12">
            <Section id="education">
              {bySection("education").map((e) => (
                <Entry key={e.id} entry={e} />
              ))}
            </Section>

            <Section id="publications">
              {bySection("publications").map((e) => (
                <Publication key={e.id} entry={e} year="2026" />
              ))}
            </Section>

            <Section id="research">
              {bySection("research").map((e) => (
                <Entry key={e.id} entry={e} />
              ))}
            </Section>

            <Section id="industry">
              {bySection("industry").map((e) => (
                <Entry key={e.id} entry={e} />
              ))}
            </Section>

            <Section id="teaching">
              {bySection("teaching").map((e) => (
                <Entry key={e.id} entry={e} />
              ))}
            </Section>

            <Section id="projects">
              {bySection("projects").map((e) => (
                <Entry key={e.id} entry={e}>
                  {e.id === "slm-orchestration" && <SlmChart />}
                </Entry>
              ))}
            </Section>

            <Section id="awards">
              {bySection("awards").map((e) => (
                <Compact key={e.id} entry={e} />
              ))}
            </Section>

            <Section id="skills">
              <Retrievable id="skills" className="py-3">
                <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[11rem_1fr]">
                  {skills.map((g) => (
                    <div key={g.label} className="contents">
                      <dt className="text-sm text-muted">{g.label}</dt>
                      <dd className="flex flex-wrap gap-x-3 gap-y-0.5">
                        {g.items.map((s) => (
                          <Term key={s}>{s}</Term>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-sm text-muted">{webNote}</p>
              </Retrievable>
            </Section>

            <Section id="service">
              <Retrievable id="service" className="py-3">
                <p className="max-w-measure leading-relaxed">{service}</p>
              </Retrievable>
            </Section>
          </div>

          <footer className="mt-20 flex flex-wrap justify-between gap-4 border-t border-rule pt-6 text-sm text-muted">
            <span>{profile.name}</span>
            <span>Search runs locally: BM25 and trigram retrieval, confidence-weighted fusion.</span>
          </footer>
        </main>
      </div>
    </SearchProvider>
  );
}
