import { Hero } from "../components/Hero";
import { AboutPreview } from "../components/AboutPreview";
import { TechSkills } from "../components/TechSkills";
import { Projects } from "../components/Projects";
import { Research } from "../components/Research";
import { Achievements } from "../components/Achievements";
import { Contact } from "../components/Contact";

export const Home = () => {
  return (
    <div className="space-y-32 pt-24">
      <Hero />
      <div id="about" className="scroll-mt-24"><AboutPreview /></div>
      <div id="skills" className="scroll-mt-24"><TechSkills /></div>
      <div id="projects" className="scroll-mt-24"><Projects /></div>
      <div id="research" className="scroll-mt-24"><Research /></div>
      <div id="achievements" className="scroll-mt-24"><Achievements /></div>
      <Contact />
    </div>
  );
};
