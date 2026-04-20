import { SiteBackground } from "@/components/site-background";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { AboutEditorial } from "@/components/sections/about-editorial";
import { Capabilities } from "@/components/sections/capabilities";
import { ContactAtelier } from "@/components/sections/contact-atelier";
import { ExperienceEditorial } from "@/components/sections/experience-editorial";
import { HeroWorld } from "@/components/sections/hero-world";
import { MissionEditorial } from "@/components/sections/mission-editorial";
import { ProjectGallery } from "@/components/sections/project-gallery";
import { Trajectory } from "@/components/sections/trajectory";

export default function Home() {
  return (
    <>
      <SiteBackground />
      <SiteNav />
      <main className="relative overflow-hidden">
        <HeroWorld />
        <AboutEditorial />
        <ExperienceEditorial />
        <ProjectGallery />
        <MissionEditorial />
        <Capabilities />
        <Trajectory />
        <ContactAtelier />
      </main>
      <SiteFooter />
    </>
  );
}
