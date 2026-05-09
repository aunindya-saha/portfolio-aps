import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EXPERIENCES = [
  {
    id: "exp-1",
    title: "Senior AI Researcher",
    company: "Neural Dynamics Lab",
    year: "2024 - Present",
    desc: "Leading research on large language models and computer vision pipelines.",
  },
  {
    id: "exp-2",
    title: "Full-Stack Engineer",
    company: "TechNova Solutions",
    year: "2022 - 2024",
    desc: "Built high-performance, scalable web applications and data dashboards.",
  },
  {
    id: "exp-3",
    title: "Machine Learning Intern",
    company: "AI Labs Ltd.",
    year: "2021 - 2022",
    desc: "Implemented YOLO object detection models and automated image processing.",
  }
];

export const ExperiencePreview = () => {
  return (
    <section id="experience" className="py-20 relative scroll-mt-24">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Mission <span className="text-blue-500">Log</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto" />
      </div>

      <div className="relative max-w-4xl mx-auto py-8">
        {/* Wavy snake timeline using SVG */}
        <div className="absolute left-1/2 top-0 bottom-0 w-12 -translate-x-1/2 hidden md:block opacity-30 dark:opacity-100 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 48 800" preserveAspectRatio="none" className="overflow-visible pointer-events-none">
            <motion.path 
              d="M 24 0 C 70 100, -22 200, 24 300 C 70 400, -22 500, 24 600 C 70 700, -22 800, 24 900"
              stroke="url(#snakeGrad)" 
              strokeWidth="4" 
              fill="none"
              strokeDasharray="12 12"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
            <defs>
              <linearGradient id="snakeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="space-y-16 md:space-y-24 relative z-10 px-4">
          {EXPERIENCES.map((exp, i) => (
            <div key={exp.id} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className={`flex-1 w-full flex ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                <Link to={`/experience#${exp.id}`} className="w-full md:w-5/6 block">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-[var(--color-cream-dark)] dark:bg-zinc-900/80 backdrop-blur shadow-lg cursor-pointer transition-all hover:border-blue-500/50 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}
                  >
                    <div className="text-blue-500 font-mono text-sm mb-2">{exp.year}</div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">{exp.title}</h3>
                    <p className="text-slate-500 dark:text-zinc-400 font-medium mb-3">{exp.company}</p>
                    <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">{exp.desc}</p>
                    <div className={`mt-4 text-xs font-mono text-blue-500 flex items-center gap-1 ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                      Access full data <span>→</span>
                    </div>
                  </motion.div>
                </Link>
              </div>
              
              {/* Center Node */}
              <div className="hidden md:flex w-12 h-12 rounded-full bg-blue-500 border-4 border-white dark:border-zinc-950 items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              </div>

              <div className="flex-1 w-full hidden md:block" />
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center relative z-10">
          <Link to="/experience" className="inline-block px-8 py-3 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors">
            View Full Mission Log
          </Link>
        </div>
      </div>
    </section>
  );
};
