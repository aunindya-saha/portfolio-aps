import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Why Graph Neural Networks Are the Future of Recommendation Systems",
    excerpt: "Exploring how GNNs model complex relationships between users and items, and why they outperform traditional collaborative filtering approaches in real-world scenarios.",
    date: "Apr 2025",
    readTime: "8 min read",
    tags: ["GNN", "ML", "Research"],
    link: "https://medium.com/@anindosaha16"
  },
  {
    id: 2,
    title: "Building a Production-Ready Computer Vision Pipeline with YOLOv8",
    excerpt: "A step-by-step breakdown of how I deployed an edge-optimized YOLOv8 model for real-time object detection in resource-constrained environments.",
    date: "Mar 2025",
    readTime: "12 min read",
    tags: ["YOLOv8", "CV", "Python"],
    link: "https://medium.com/@anindosaha16"
  },
  {
    id: 3,
    title: "The Art of Parameter-Efficient Fine-Tuning (PEFT) for Large Models",
    excerpt: "Breaking down LoRA, QLoRA, and adapter methods — how to fine-tune billion-parameter models on consumer-grade hardware without losing performance.",
    date: "Feb 2025",
    readTime: "10 min read",
    tags: ["LLMs", "PEFT", "Fine-tuning"],
    link: "https://medium.com/@anindosaha16"
  }
];

export const BlogPreview = () => {
  return (
    <motion.section
      id="blog"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-24"
    >
      <div className="mb-16 flex items-end justify-between">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Latest <span className="text-blue-500">Writings</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>
        <a
          href="https://medium.com/@anindosaha16"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-sm font-medium text-stone-500 dark:text-zinc-400 hover:text-blue-500 transition-colors group"
        >
          <img
            src="https://cdn.simpleicons.org/medium/1c1c1c"
            alt="Medium"
            className="w-4 h-4 dark:invert"
          />
          View on Medium
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post, index) => (
          <motion.a
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/10"
          >
            {/* Top colored gradient strip */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="p-6 flex flex-col flex-1">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-bold leading-snug mb-3 text-slate-800 dark:text-zinc-100 group-hover:text-blue-500 transition-colors line-clamp-3">
                {post.title}
              </h3>

              <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed mb-6 flex-grow line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800 mt-auto">
                <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-zinc-500">
                  <img
                    src="https://cdn.simpleicons.org/medium/1c1c1c"
                    alt="Medium"
                    className="w-3.5 h-3.5 dark:invert opacity-60"
                  />
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <span className="text-xs font-semibold text-blue-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Full <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-10 text-center md:hidden">
        <a
          href="https://medium.com/@anindosaha16"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:underline"
        >
          <img src="https://cdn.simpleicons.org/medium/3b82f6" alt="Medium" className="w-4 h-4" />
          View All on Medium
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </motion.section>
  );
};
