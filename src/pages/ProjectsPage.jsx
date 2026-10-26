import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";
import { useEffect } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { PageHeader } from "../components/PageHeader";

export const ProjectsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-6xl mx-auto pt-28 pb-24 px-4"
    >
      <PageHeader
        lead="All"
        accent="Projects"
        subtitle="Everything I have built — AI systems, full-stack apps and tools."
        backHash="#projects"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PORTFOLIO_DATA.projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="flex flex-col group h-full overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur hover:border-blue-500/30 transition-all duration-300"
          >
            <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
              <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-zinc-100 group-hover:text-blue-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed mb-5 flex-grow">
                {project.description}
              </p>
              <ul className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <li key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4 pt-4 border-t border-slate-200/60 dark:border-zinc-800/60 mt-auto">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-500 transition-colors p-1" aria-label="GitHub Repository">
                  <Code className="w-5 h-5" />
                </a>
                {project.live && project.live !== "#" && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-500 transition-colors p-1" aria-label="Live Demo">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
