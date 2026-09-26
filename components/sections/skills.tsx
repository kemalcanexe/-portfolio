"use client";

import { service, skills, webNote } from "@/content/cv";
import { Heading } from "@/components/motion/engine";
import { Marquee } from "@/components/sections/marquee";

const [code, ml, web, opt, langs] = skills;

function Pill({ children, accent = false }: { children: string; accent?: boolean }) {
  return (
    <span
      className={`mx-2 whitespace-nowrap rounded-full border px-6 py-3 font-display text-xl font-semibold sm:text-3xl ${
        accent ? "border-violet/40 bg-violet/15 text-violet-soft" : "border-white/10 bg-white/[0.03]"
      }`}
    >
      {children}
    </span>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-h" className="relative py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
        <Heading kicker="Skills">Tools I work with</Heading>
      </div>
      <div className="mt-14 space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <Marquee speed={38}>
          {[...code.items, ...opt.items].map((s) => (
            <Pill key={s}>{s}</Pill>
          ))}
        </Marquee>
        <Marquee speed={44} reverse>
          {[...ml.items, ...web.items].map((s, i) => (
            <Pill key={s} accent={i % 3 === 0}>
              {s}
            </Pill>
          ))}
        </Marquee>
      </div>
      <div className="mx-auto mt-12 grid max-w-[1400px] gap-4 px-5 sm:px-10 md:grid-cols-3">
        {skills.map((g) => (
          <div key={g.label} className="text-sm">
            <p className="font-mono text-xs text-violet-soft">{g.label}</p>
            <p className="mt-1.5 text-fog-dim">{g.items.join(", ")}</p>
          </div>
        ))}
        <p className="text-sm text-fog-dim md:col-span-2">{webNote}</p>
      </div>
      <p className="sr-only">Languages: {langs.items.join(", ")}</p>

      <div id="service" className="mx-auto mt-16 max-w-[1400px] px-5 sm:px-10">
        <div className="glass rounded-[2rem] p-7 sm:p-9">
          <p className="font-mono text-xs text-violet-soft">Service and volunteering</p>
          <p className="mt-3 max-w-4xl text-lg leading-relaxed text-fog-dim">{service}</p>
        </div>
      </div>
    </section>
  );
}
