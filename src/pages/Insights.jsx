import { motion } from "framer-motion";

// Placeholder picture for every chapter — replace with your own photo later.
const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800";

const linkClass = "text-blue-500 hover:underline font-normal";

const STORY_PAGES = [
  {
    id: 1,
    title: "Where It Started",
    content: (
      <>
        I completed my undergraduate degree in Computer Science and Engineering at the{" "}
        <a href="https://mist.ac.bd/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          Military Institute of Science and Technology (MIST)
        </a>
        , Dhaka. My thesis was supervised by Nusrat Sharmin ma&apos;am, who guided me through the hardest, most rewarding
        stretch of my university life. Today I continue to work with her as a Research Assistant under Associate
        Professor Dr. Nusrat Sharmin, turning what began as a thesis into a long-term research journey.
      </>
    ),
    image: PLACEHOLDER_IMAGE
  },
  {
    id: 2,
    title: "The Research Side",
    content: (
      <>
        Research has become the thread that ties my work together. I have worked hands-on with PyTorch, TensorFlow,
        Scikit-learn, OpenCV, Hugging Face, QLoRA, XGBoost, SHAP, Sentence-BERT, ChromaDB and YOLO, and my questions
        have travelled across several domains: medical image classification, computer vision, NLP and job
        recommendation, retrieval-augmented generation, explainable and fair AI, and the effect of generative AI on how
        students learn. My thesis compared LLM-driven and traditional hyperparameter optimization for imbalanced
        medical images, and my first two papers reached IEEE ICCIT 2025.
      </>
    ),
    image: PLACEHOLDER_IMAGE
  },
  {
    id: 3,
    title: "The Development Phase",
    content: (
      <>
        Before research took the lead, I learned by building. I shipped full-stack apps with React, Node.js, Express,
        MongoDB and PostgreSQL, a cross-platform student network in Flutter, and a desktop management tool in JavaFX.
        Later came FastAPI and Flask backends, Docker, and AWS CI/CD pipelines during my industrial traineeship at JB
        Connect Ltd. Those years taught me that a model only matters once real people can use it, and that habit still
        shapes how I build.
      </>
    ),
    image: PLACEHOLDER_IMAGE
  },
  {
    id: 4,
    title: "What Drives Me Now",
    content: (
      <>
        I am most drawn to deep learning and trustworthy AI: models that are not only accurate, but explainable, fair,
        and honest about what they do not know. I want to build systems people can rely on, in places like healthcare,
        agriculture and education where mistakes carry real cost. The story is still being written, and I am excited
        for the chapters ahead.
      </>
    ),
    image: PLACEHOLDER_IMAGE
  }
];

export const Insights = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto py-12 space-y-24"
    >
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
          My <span className="text-blue-500">Story</span>
        </h1>
        <p className="text-slate-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Beyond the code and the commits, here is a glimpse into my journey, the philosophies that drive me, and the milestones that defined my path.
        </p>
      </div>

      <div className="space-y-32">
        {STORY_PAGES.map((story, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col md:flex-row gap-12 lg:gap-20 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}
            >
              <div className="w-full md:w-1/2 aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative group">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
              </div>
              
              <div className="w-full md:w-1/2 space-y-6">
                <div className="text-blue-500 font-mono text-sm tracking-widest font-bold">
                  CHAPTER 0{story.id}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-zinc-100">
                  {story.title}
                </h2>
                <div className="w-12 h-1 bg-blue-500 rounded-full" />
                <p className="text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-light">
                  {story.content}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
