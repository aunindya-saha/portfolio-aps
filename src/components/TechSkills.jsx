import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "../data/portfolioData";

const ROW_1_SKILLS = PORTFOLIO_DATA.skills.row1.map(skill => ({
  ...skill,
  icon: <img src={skill.iconUrl} alt={skill.name} className={`w-7 h-7 ${skill.invertDark ? 'dark:invert' : ''}`} />
}));

const ROW_2_SKILLS = PORTFOLIO_DATA.skills.row2.map(skill => ({
  ...skill,
  icon: <img src={skill.iconUrl} alt={skill.name} className={`w-7 h-7 ${skill.invertDark ? 'dark:invert' : ''}`} />
}));

const ROW_1_DOUBLED = [...ROW_1_SKILLS, ...ROW_1_SKILLS];
const ROW_2_DOUBLED = [...ROW_2_SKILLS, ...ROW_2_SKILLS];

export const TechSkills = () => {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-24"
    >
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Tech <span className="text-blue-500">Stack</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto md:mx-0" />
      </div>

      <div className="relative overflow-hidden py-4 group flex flex-col gap-6">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[var(--color-cream)] dark:from-zinc-950 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[var(--color-cream)] dark:from-zinc-950 to-transparent pointer-events-none" />

        {/* Row 1 - Left to Right */}
        <div className="flex gap-4 animate-marquee-right group-hover:[animation-play-state:paused] w-max">
          {ROW_1_DOUBLED.map((skill, i) => (
            <motion.div
              key={`r1-${skill.name}-${i}`}
              className="data-flow-border px-6 py-3 cursor-default shrink-0 flex items-center gap-3 bg-[var(--color-cream-dark)] dark:bg-zinc-900/80"
            >
              {skill.icon}
              <span className="font-mono text-sm md:text-base font-semibold text-stone-800 dark:text-zinc-200 whitespace-nowrap">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Row 2 - Right to Left */}
        <div className="flex gap-4 animate-marquee-left group-hover:[animation-play-state:paused] w-max">
          {ROW_2_DOUBLED.map((skill, i) => (
            <motion.div
              key={`r2-${skill.name}-${i}`}
              className="data-flow-border px-6 py-3 cursor-default shrink-0 flex items-center gap-3 bg-[var(--color-cream-dark)] dark:bg-zinc-900/80"
            >
              <span className="w-6 flex justify-center items-center">{skill.icon}</span>
              <span className="font-mono text-sm md:text-base font-semibold text-stone-800 dark:text-zinc-200 whitespace-nowrap">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
