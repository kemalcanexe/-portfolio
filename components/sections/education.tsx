"use client";

import { useRef } from "react";
import { entries } from "@/content/cv";
import { LAND } from "@/lib/land-dots";
import { gsap, Heading, prefersReducedMotion, Rise, useGSAP, useGlow } from "@/components/motion/engine";

const schools = entries.filter((e) => e.section === "education");

// Places from the CV, in the order they happened.
const STOPS = [
  { city: "Istanbul", lon: 28.98, lat: 41.01, when: "2022", what: "Sabancı University", side: "right", dy: 26 },
  { city: "Bologna", lon: 11.34, lat: 44.49, when: "Feb 2025", what: "Erasmus+ exchange", side: "right", dy: -22 },
  { city: "Shanghai", lon: 121.47, lat: 31.23, when: "Aug 2025", what: "Bekaert R&D", side: "left", dy: 26 },
  { city: "Enschede", lon: 6.89, lat: 52.22, when: "Jun 2026", what: "University of Twente", side: "right", dy: -10 },
  { city: "Seoul", lon: 126.98, lat: 37.57, when: "Aug 2026", what: "Sungkyunkwan University", side: "left", dy: -16 }
];

const W = 1000;
const H = 420;
const px = (lon: number) => ((lon + 12) / 152) * W;
const py = (lat: number) => ((62 - lat) / 50) * H;

function arc(a: (typeof STOPS)[number], b: (typeof STOPS)[number]) {
  const [x1, y1, x2, y2] = [px(a.lon), py(a.lat), px(b.lon), py(b.lat)];
  const mx = (x1 + x2) / 2;
  // Arc upward, but never above the top edge of the map.
  const my = Math.max(14, Math.min(y1, y2) - Math.abs(x2 - x1) * 0.28 - 20);
  return `M${x1},${y1} Q${mx},${my} ${x2},${y2}`;
}

const DOTS = LAND.map(([lon, lat]) => {
  const d = Math.min(...STOPS.map((s) => Math.hypot(s.lon - lon, s.lat - lat)));
  return { x: px(lon), y: py(lat), hot: d < 5 };
});

export function Education() {
  const root = useRef<HTMLElement>(null);
  const glow = useGlow<HTMLDivElement>();

  useGSAP(
    () => {
      const paths = gsap.utils.toArray<SVGPathElement>(".route-arc");
      const pins = gsap.utils.toArray<SVGGElement>(".route-pin");
      if (prefersReducedMotion()) return;
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(pins.slice(1), { opacity: 0, scale: 0.4, transformOrigin: "center" });
      // Plays once when the map comes into view, stop by stop.
      const tl = gsap.timeline({ scrollTrigger: { trigger: ".route-map", start: "top 70%", once: true } });
      paths.forEach((p, i) => {
        tl.to(p, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }).to(
          pins[i + 1],
          { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" },
          "-=0.1"
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="education" className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-10">
      <Heading kicker="Education">Sabancı, Bologna, Sungkyunkwan</Heading>

      <div className="route-map glass relative mt-14 overflow-hidden rounded-[2rem] p-3 sm:p-6">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Map of study and work locations">
          <defs>
            <linearGradient id="routeGrad" x1="0" x2="1">
              <stop offset="0" stopColor="#C6B5FF" />
              <stop offset="1" stopColor="#FF6FD8" />
            </linearGradient>
          </defs>
          {DOTS.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.hot ? 2.4 : 1.7} fill={d.hot ? "#7C5CFF" : "rgba(238,234,247,0.16)"} />
          ))}
          {STOPS.slice(1).map((s, i) => (
            <path key={s.city} className="route-arc" d={arc(STOPS[i], s)} fill="none" stroke="url(#routeGrad)" strokeWidth="2" strokeLinecap="round" />
          ))}
          {STOPS.map((s, i) => {
            const x = px(s.lon);
            const y = py(s.lat);
            const right = s.side === "right";
            const ty = y + s.dy;
            return (
              <g key={s.city} className="route-pin">
                <circle cx={x} cy={y} r="14" fill="#7C5CFF" opacity="0.25" className="pulse-ring" style={{ transformBox: "fill-box", transformOrigin: "center", animationDelay: `${i * 0.3}s` }} />
                <circle cx={x} cy={y} r="5" fill="#fff" />
                <text x={right ? x + 12 : x - 12} y={ty} textAnchor={right ? "start" : "end"} fill="#EEEAF7" fontSize="15" fontWeight="700" fontFamily="var(--font-display)">
                  {s.city}
                </text>
                <text x={right ? x + 12 : x - 12} y={ty + 16} textAnchor={right ? "start" : "end"} fill="#A7A1BC" fontSize="11" fontFamily="var(--font-mono)">
                  {s.when} · {s.what}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div ref={glow}>
        <Rise className="mt-4 grid gap-4 md:grid-cols-2">
          {schools.map((e) => (
            <article key={e.id} id={e.id} className="glow-card glass rounded-[2rem] p-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-violet-soft">{e.period}</span>
                <span className="text-sm text-fog-faint">{e.location}</span>
              </div>
              <h3 className="display mt-4 text-2xl leading-tight sm:text-3xl">{e.org}</h3>
              <p className="mt-1 font-semibold text-fog-dim">{e.title}</p>
              {e.bullets.length > 0 && (
                <div className="mt-4 space-y-2 text-sm leading-relaxed text-fog-dim">
                  {e.bullets.map((b) =>
                    b.startsWith("GPA") ? (
                      <p key={b} className="inline-block rounded-full bg-white/[0.06] px-3 py-1 font-mono text-xs text-fog">
                        {b}
                      </p>
                    ) : (
                      <p key={b}>{b}</p>
                    )
                  )}
                </div>
              )}
            </article>
          ))}
        </Rise>
      </div>
    </section>
  );
}
