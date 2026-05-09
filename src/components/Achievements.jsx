import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export const Achievements = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -400 : 400, behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      id="achievements"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-24 pb-20"
    >
      <div className="mb-16 flex items-end justify-between">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Prizes <span className="text-blue-500">&</span> Achievements
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
        {PORTFOLIO_DATA.achievements.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className={`flex-shrink-0 min-w-[340px] max-w-[380px] relative flex flex-col rounded-xl border border-white/10 bg-zinc-900/50 overflow-hidden hover:border-blue-500/50 transition-colors snap-center group ${item.glow}`}
          >
            {/* Accent top bar */}
            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${item.accent} z-10`} />

            <div className="w-full relative">
              <img src={item.image} alt="cover" loading="lazy" className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
            </div>

            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="text-base font-semibold text-slate-800 dark:text-zinc-100 leading-tight">{item.title}</h3>
                  <span className="text-[10px] font-mono text-blue-500">{item.role} — {item.date}</span>
                </div>
              </div>
              <p className="text-xs text-zinc-400 line-clamp-4 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
