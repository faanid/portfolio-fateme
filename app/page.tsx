import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { CollaborationsSection } from "@/components/collaborations-section";
import { ContactSection } from "@/components/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <CollaborationsSection />
      <ContactSection />
    </>
  );
}
