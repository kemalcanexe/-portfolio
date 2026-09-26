"use client";

import type React from "react";
import { entries, type Entry } from "@/content/cv";
import { Heading, Rise, useGlow } from "@/components/motion/engine";
import { ChatViz, NeedsViz, QueueViz, SlmViz } from "@/components/viz/project-viz";

const byId = Object.fromEntries(entries.filter((e) => e.section === "projects").map((e) => [e.id, e]));

// Bento layout: [id, grid classes, visual, headline figure]
const LAYOUT: [string, string, React.ReactNode, string?][] = [
  ["slm-orchestration", "lg:col-span-4 lg:row-span-2", <SlmViz key="slm" />, "17.0% → 99.5%"],
  ["pure-news", "lg:col-span-2 lg:row-span-2", <NeedsViz key="needs" />, "11 cities, 2 need lists"],
  ["pure-csr", "lg:col-span-2", null, "60 companies"],
  ["pure-brands", "lg:col-span-2", null],
  ["airport-sim", "lg:col-span-2", <QueueViz key="q" />],
  ["messaging", "lg:col-span-6", <ChatViz key="chat" />]
];

function Card({ e, span, viz, figure }: { e: Entry; span: string; viz: React.ReactNode; figure?: string }) {
  const wide = span.includes("col-span-6");
  return (
    <article
      id={e.id}
      className={`glow-card glass flex flex-col overflow-hidden rounded-[2rem] p-7 transition-transform duration-500 hover:-translate-y-1 ${span}`}
    >
      <div className={wide ? "grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center" : "flex flex-1 flex-col"}>
        <div className="flex flex-1 flex-col">
          {figure && <p className="display text-3xl text-violet-soft sm:text-4xl">{figure}</p>}
          <h3 className={`display leading-[1.05] ${figure ? "mt-3 text-xl sm:text-2xl" : "text-2xl sm:text-3xl"}`}>{e.title}</h3>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-fog-dim">
            {e.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
            {e.tags?.map((t) => (
              <span key={t} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-fog-dim">
                {t}
              </span>
            ))}
            {e.links?.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="ml-auto rounded-full bg-fog px-4 py-1.5 text-xs font-semibold text-night transition-transform hover:scale-105"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
        {viz && <div className={wide ? "" : "mt-6"}>{viz}</div>}
      </div>
    </article>
  );
}

export function Projects() {
  const glow = useGlow<HTMLDivElement>();
  return (
    <section id="projects" className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-10">
      <Heading kicker="Projects">Models, reports, systems</Heading>
      <div ref={glow}>
        <Rise className="mt-14 grid gap-4 lg:grid-cols-6">
          {LAYOUT.map(([id, span, viz, figure]) => (
            <Card key={id} e={byId[id]} span={span} viz={viz} figure={figure} />
          ))}
        </Rise>
      </div>
    </section>
  );
}
