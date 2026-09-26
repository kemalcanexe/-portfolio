import { CommandPalette } from "@/components/search/command-palette";
import { SmoothScroll } from "@/components/motion/engine";
import { Awards } from "@/components/sections/awards";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Nav } from "@/components/sections/nav";
import { Projects } from "@/components/sections/projects";
import { Publications } from "@/components/sections/publications";
import { Skills } from "@/components/sections/skills";
import { Stats } from "@/components/sections/stats";

const FIELDS = ["Information retrieval", "Rank fusion", "Edge AI", "Small language models", "Humanitarian logistics", "Simulation"];

export default function Home() {
  return (
    <div className="grain">
      <SmoothScroll />
      <Nav />
      <CommandPalette />
      <main>
        <Hero />
        <Marquee speed={50} className="border-y border-white/[0.06] py-6">
          {FIELDS.map((f) => (
            <span key={f} className="flex items-center">
              <span className="display px-8 text-5xl text-transparent [-webkit-text-stroke:1px_rgba(238,234,247,0.35)] sm:text-7xl">
                {f}
              </span>
              <span className="text-3xl text-violet">✦</span>
            </span>
          ))}
        </Marquee>
        <Stats />
        <Publications />
        <Experience />
        <Projects />
        <Education />
        <Skills />
        <Awards />
      </main>
      <Contact />
    </div>
  );
}
