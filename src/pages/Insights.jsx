import { motion } from "framer-motion";

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
    )
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
    )
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
    )
  },
  {
    id: 4,
    title: "What Drives Me Now",
    content: (
      <>
        I am most drawn to deep learning and trustworthy AI: models that are not only accurate, but explainable, fair,
        and honest about what they do not know. I want to build systems people can rely on, in places like healthcare,
        agriculture and education where mistakes carry real cost. From January I will also be teaching, and I am looking
        forward to helping the next batch of students learn AI the way I wish I had: by building things that work.
      </>
    )
  }
];

export const Insights = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto pt-32 pb-24 px-4 grid gap-10 lg:gap-16 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-start"
    >
      <figure className="md:sticky md:top-32 mx-auto w-full max-w-sm md:max-w-none">
        <div className="aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-stone-200 dark:ring-zinc-800">
          <img
            src="/farewell.jpeg"
            alt="Aunindya Prosad Saha in a black panjabi with a white scarf, standing in the MIST campus courtyard on graduation day"
            className="w-full h-full object-cover object-[50%_30%]"
          />
        </div>
        <figcaption className="mt-3 text-sm text-slate-500 dark:text-zinc-500">
          Farewell day at MIST, 2026.
        </figcaption>
      </figure>

      <div className="space-y-14">
        <header>
          <h1 className="sr-only">My Story</h1>
          <p className="text-slate-600 dark:text-zinc-400 text-lg font-light leading-relaxed max-w-prose">
            Beyond the code and the commits, here is where I am, where I am headed next, and how I got here.
          </p>
        </header>

        <div className="space-y-10">
          {STORY_PAGES.map((story) => (
            <section key={story.id} className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-zinc-100">
                <span className="text-blue-500 mr-3 tabular-nums">{story.id}</span>
                {story.title}
              </h2>
              <p className="text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-light max-w-prose">
                {story.content}
              </p>
            </section>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
