import { motion } from "framer-motion";

const STORY_PAGES = [
  {
    id: 1,
    title: "The Early Days",
    content: "My fascination with technology began when I dismantled my first computer at age 10. Driven by curiosity, I wanted to understand the invisible logic that powered the digital world. This spark eventually grew into a passion for software development and artificial intelligence.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Academic Pursuits",
    content: "During my university years, I dove deep into computer science principles. It wasn't just about writing code; it was about solving complex problems efficiently. I led several research initiatives focusing on machine learning and computer vision, cementing my desire to operate at the cutting edge of AI.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Building the Future",
    content: "Today, I bridge the gap between academic AI research and practical, scalable engineering. From deploying neural networks to edge devices to leading full-stack engineering teams, my mission is to build intelligent systems that are as robust as they are innovative.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
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
