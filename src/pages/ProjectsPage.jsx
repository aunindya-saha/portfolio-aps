import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";

const ALL_PROJECTS = [
  {
    id: 1,
    title: "Automated Landslide Detection System",
    description: "A real-time computer vision pipeline utilizing YOLOv8 and Via Sicura frameworks to detect and classify early indicators of landslides from drone footage. Engineered for low-latency edge deployment.",
    tags: ["YOLOv8", "Python", "OpenCV", "Via Sicura"],
    github: "#",
    live: "#"
  },
  {
    id: 2,
    title: "AI Surveillance Hackathon Proposal",
    description: "A comprehensive prototype for an AI-driven surveillance system utilizing deep learning to identify security threats in real-time. Developed for a national hackathon, focusing on privacy-preserving edge inference.",
    tags: ["Computer Vision", "Edge AI", "PyTorch", "Python"],
    github: "#",
    live: null
  },
  {
    id: 3,
    title: "Full-Stack AI Chatbot Web App",
    description: "An intelligent conversational interface integrated with a custom RAG (Retrieval-Augmented Generation) pipeline. Built with a scalable Node.js backend and a responsive, glassmorphic React frontend.",
    tags: ["React", "Node.js", "Supabase", "LLM APIs"],
    github: "#",
    live: "#"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A premium, editorial-tech portfolio built with Vite + React + Tailwind CSS v4. Features glassmorphism, framer-motion animations, an interactive particle background, and a terminal-style chatbot shell.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    github: "#",
    live: "#"
  },
  {
    id: 5,
    title: "Competitive Programming Toolkit (C++)",
    description: "A comprehensive library of optimized C++ templates and algorithms for competitive programming, including graph traversals, dynamic programming patterns, and segment trees.",
    tags: ["C++", "Algorithms", "Data Structures", "CP"],
    github: "#",
    live: null
  },
  {
    id: 6,
    title: "EfficientNetB3 Medical Imaging Pipeline",
    description: "An optimized implementation of EfficientNetB3 tailored for identifying anomalies in high-resolution MRI scans, achieving a 12% improvement in inference speed with minimal accuracy tradeoff.",
    tags: ["PyTorch", "EfficientNet", "Medical AI", "Python"],
    github: "#",
    live: null
  }
];

export const ProjectsPage = () => {
  return (
    <div className="space-y-16 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-8"
      >
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
          All <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Projects</span>
        </h1>
        <p className="text-lg text-stone-600 dark:text-zinc-400 max-w-2xl">
          A comprehensive showcase of my work spanning AI research, full-stack web applications, and competitive programming.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ALL_PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="data-flow-border flex flex-col group h-full overflow-hidden bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm"
          >
            {/* Image Placeholder */}
            <div className="aspect-video w-full bg-stone-200/50 dark:bg-zinc-800/50 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="text-stone-400 dark:text-zinc-500 font-mono text-sm tracking-widest z-10">
                [ Image Placeholder ]
              </span>
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <div className="text-blue-500 font-mono text-xs mb-4 tracking-wider uppercase">
                Project 0{project.id}
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-blue-500 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-stone-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>
              
              <ul className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <li key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {tag}
                  </li>
                ))}
              </ul>
              
              <div className="flex gap-4 pt-4 border-t border-stone-200/50 dark:border-zinc-800/50 mt-auto">
                <a href={project.github} className="text-stone-500 hover:text-blue-500 transition-colors p-1" aria-label="GitHub Repository">
                  <Code className="w-5 h-5" />
                </a>
                {project.live && (
                  <a href={project.live} className="text-stone-500 hover:text-blue-500 transition-colors p-1" aria-label="Live Demo">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
