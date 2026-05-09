import { motion } from "framer-motion";
import { BookOpen, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export const Research = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -400 : 400, behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      id="research"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-24"
    >
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-800 dark:text-zinc-100">
            Featured <span className="text-blue-500">Research</span>
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

      <div ref={scrollRef} className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4">
        {PORTFOLIO_DATA.research.map((item, index) => (
          <motion.a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="flex-shrink-0 min-w-[340px] max-w-[380px] flex flex-col rounded-xl border border-white/10 bg-zinc-900/50 overflow-hidden hover:border-blue-500/50 transition-colors snap-center group cursor-pointer"
          >
            <div className="w-full relative">
              <img src={item.image} alt="cover" loading="lazy" className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
            </div>

            <div className="flex flex-col flex-1 p-5">
              <div className="flex items-center gap-2 text-[10px] font-semibold text-blue-500 mb-2 tracking-wider uppercase">
                <BookOpen className="w-3 h-3" />
                <span>{item.type}</span>
              </div>

              <h3 className="text-base font-semibold mb-2 leading-snug group-hover:text-blue-500 transition-colors text-slate-800 dark:text-zinc-100">
                {item.title}
              </h3>

              <p className="text-xs text-zinc-400 line-clamp-3 mb-4 flex-1 leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-zinc-500">
                  <Calendar className="w-3 h-3" />
                  <span>{item.conference} ({item.year})</span>
                </div>
                <span className="text-[10px] font-mono text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Paper →
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
};
