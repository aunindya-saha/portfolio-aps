import { motion } from "framer-motion";
import { ExternalLink, BookOpen, FileText } from "lucide-react";

const RESEARCH_DATA = [
  {
    id: 1,
    title: "EfficientNetB3 for Medical Imaging Anomalies",
    status: "Accepted — ICCIT 2025",
    type: "Conference Paper",
    description: "An optimized implementation of EfficientNetB3 tailored for identifying anomalies in high-resolution MRI scans, achieving a 12% improvement in inference speed with minimal accuracy tradeoff.",
    link: "#",
    tags: ["Computer Vision", "Healthcare AI", "PyTorch"]
  },
  {
    id: 2,
    title: "Graph Neural Networks for Job Recommendation",
    status: "Accepted — ICCIT 2025",
    type: "Conference Paper",
    description: "How we leveraged heterogeneous graphs to improve applicant-to-job matching pipelines, offering a 15% increase in recommendation relevance over traditional collaborative filtering.",
    link: "#",
    tags: ["GNNs", "Recommendation Systems", "Graph Theory"]
  },
  {
    id: 3,
    title: "Multi-Modal AI for Context-Aware Systems",
    status: "Ongoing",
    type: "Undergraduate Thesis",
    description: "Ongoing research under the supervision of Dr. Nusrat Sharmin. This thesis explores the intersection of vision and language models to build systems that can understand complex context in real-time edge environments.",
    link: null,
    tags: ["Multi-Modal", "LLMs", "Edge AI"]
  }
];

export const ResearchPage = () => {
  return (
    <div className="space-y-16 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-8"
      >
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-stone-900 dark:text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Research</span> <br />& Publications
        </h1>
        <p className="text-lg text-stone-600 dark:text-zinc-400 max-w-2xl mt-6 leading-relaxed">
          Exploring the boundaries of what machines can learn and how quickly they can infer it. 
          Focusing on highly-optimized architectures and context-aware multi-modal models.
        </p>
      </motion.div>

      <div className="space-y-12">
        {RESEARCH_DATA.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="data-flow-border p-8 md:p-10 flex flex-col md:flex-row gap-8 group"
          >
            <div className="md:w-1/4 shrink-0 border-b md:border-b-0 md:border-r border-stone-200/50 dark:border-zinc-800/50 pb-6 md:pb-0 md:pr-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-blue-500 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> {item.type}
                </div>
                <h4 className="font-bold text-stone-800 dark:text-zinc-200 mb-2">
                  {item.status}
                </h4>
              </div>
              <div className="hidden md:block">
                <BookOpen className="w-12 h-12 text-stone-200 dark:text-zinc-800 group-hover:text-blue-500/20 transition-colors" />
              </div>
            </div>

            <div className="md:w-3/4 flex flex-col">
              <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-4 group-hover:text-blue-500 transition-colors">
                {item.title}
              </h3>
              <p className="text-stone-600 dark:text-zinc-400 leading-relaxed mb-8 flex-grow">
                {item.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                <ul className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <li key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-stone-100 dark:bg-zinc-900 text-stone-600 dark:text-zinc-400 border border-stone-200 dark:border-zinc-800">
                      {tag}
                    </li>
                  ))}
                </ul>
                
                {item.link && (
                  <a href={item.link} className="flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">
                    Read Paper <ExternalLink className="w-4 h-4" />
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
