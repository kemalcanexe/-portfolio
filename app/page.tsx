import { AmbientBackground } from "@/components/ambient-background";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Mission } from "@/components/sections/mission";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Mission />
        <Skills />
        <Achievements />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
