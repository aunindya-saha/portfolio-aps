import { motion } from "framer-motion";
import { ExternalLink, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";

const TAG_LIMIT = 3;

const TagList = ({ tags }) => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? tags : tags.slice(0, TAG_LIMIT);
  const overflow = tags.length - TAG_LIMIT;
  return (
    <ul className="flex flex-wrap gap-1.5 mb-4">
      {visible.map(tag => (
        <li key={tag} className="text-[10px] px-2 py-0.5 rounded-md font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
          {tag}
        </li>
      ))}
      {!expanded && overflow > 0 && (
        <li>
          <button
            onClick={() => setExpanded(true)}
            className="text-[10px] px-2 py-0.5 rounded-md font-medium bg-zinc-700/60 text-zinc-300 border border-white/10 hover:bg-blue-500/20 hover:text-blue-400 transition-colors cursor-pointer"
          >
            +{overflow}
          </button>
        </li>
      )}
    </ul>
  );
};

export const Projects = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -400 : 400, behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-24"
    >
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-800 dark:text-zinc-100">
            Featured <span className="text-blue-500">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-zinc-300" />
          </button>
          <button onClick={() => scroll('right')} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <ChevronRight className="w-4 h-4 text-slate-600 dark:text-zinc-300" />
          </button>
        </div>
      </div>

      {/* Star motivation */}
      <div className="mb-10 flex items-center gap-2 text-sm text-amber-500 dark:text-amber-400 font-mono">
        <Star className="w-4 h-4 fill-current" />
        <span>If you find the project helpful, don't forget to give it a star on GitHub!</span>
      </div>

      <div ref={scrollRef} className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4">
        {PORTFOLIO_DATA.projects.map((project, index) => (
          <div
            key={project.id}
            className="flex-shrink-0 min-w-[340px] max-w-[380px] flex flex-col rounded-xl border border-white/10 bg-zinc-900/50 overflow-hidden hover:border-blue-500/50 transition-colors snap-center"
          >
            <div className="w-full relative">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
            </div>

            <div className="flex flex-col flex-1 p-5">
              <div className="text-blue-500 font-mono text-xs mb-2 tracking-wider">
                0{index + 1}
              </div>

              <h3 className="text-base font-semibold mb-2 text-slate-800 dark:text-zinc-100 leading-snug">
                {project.title}
              </h3>

              <p className="text-xs text-zinc-400 line-clamp-3 mb-4 flex-1 leading-relaxed">
                {project.description}
              </p>

              <TagList tags={project.tags} />

              <div className="flex gap-2 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center flex-1 gap-2 px-3 py-2 rounded-lg border border-white/10 hover:border-blue-500/50 text-slate-600 dark:text-zinc-300 hover:text-blue-500 transition-all text-xs font-medium bg-white/5"
                  aria-label="GitHub Repository"
                >
                  <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" loading="lazy" className="w-3 h-3 dark:block hidden" />
                  <img src="https://cdn.simpleicons.org/github/1c1c1c" alt="GitHub" loading="lazy" className="w-3 h-3 dark:hidden" />
                  Source
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center flex-1 gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all text-xs font-medium"
                  aria-label="Live Demo"
                >
                  <ExternalLink className="w-3 h-3" />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};
