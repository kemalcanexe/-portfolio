"use client";

import type React from "react";
import { entries } from "@/content/cv";
import { Heading, Rise, useGlow } from "@/components/motion/engine";
import { EdgeViz } from "@/components/viz/edge-viz";
import { FusionPlayground } from "@/components/viz/fusion-playground";

const pubs = entries.filter((e) => e.section === "publications");
const VIZ: Record<string, React.ReactNode> = { "icmla-2026": <FusionPlayground />, "siu-2026": <EdgeViz /> };

function Authors({ authors }: { authors: string }) {
  const own = "N. Yalçın";
  const parts = authors.split(own);
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && <strong className="font-semibold text-fog">{own}</strong>}
        </span>
      ))}
    </>
  );
}

export function Publications() {
  const glow = useGlow<HTMLDivElement>();
  return (
    <section id="publications" className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-10">
      <Heading kicker="Publications">Peer-reviewed, 2026</Heading>
      <div ref={glow}>
        <Rise className="mt-14 grid gap-4 lg:grid-cols-2">
          {pubs.map((p) => (
            <article
              key={p.id}
              id={p.id}
              className="glow-card glass flex flex-col overflow-hidden rounded-[2rem] p-7 sm:p-9"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-violet/20 px-3 py-1 font-mono text-xs text-violet-soft">
                  {p.id.startsWith("icmla") ? "ICMLA 2026 · IEEE · Accepted" : "SIU 2026 · IEEE"}
                </span>
              </div>
              <h3 className="display mt-5 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.02]">{p.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-fog-faint">
                <Authors authors={p.authors ?? ""} />
              </p>
              <p className="mt-1 text-sm text-fog-faint">{p.venue}</p>
              {p.bullets[0] && <p className="mt-4 leading-relaxed text-fog-dim">{p.bullets[0]}</p>}

              <div className="mt-6 rounded-2xl border border-white/[0.06] bg-night/60 p-4">{VIZ[p.id]}</div>

              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {p.links?.map((l, i) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                      i === 0 ? "bg-fog text-night" : "border border-white/15 hover:bg-white/10"
                    }`}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </Rise>
      </div>
    </section>
  );
}
