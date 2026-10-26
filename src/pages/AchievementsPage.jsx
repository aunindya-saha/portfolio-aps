import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { PageHeader } from "../components/PageHeader";

export const AchievementsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-6xl mx-auto pt-28 pb-24 px-4"
    >
      <PageHeader
        lead="Prizes &"
        accent="Achievements"
        subtitle="Competitions, finals and recognitions — with certificates where available."
        backHash="#achievements"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PORTFOLIO_DATA.achievements.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className={`relative flex flex-col rounded-xl border border-white/10 bg-zinc-900/50 overflow-hidden hover:border-blue-500/50 transition-colors ${item.glow}`}
          >
            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${item.accent} z-10`} />
            <div className="w-full relative">
              <img src={item.image} alt={item.title} loading="lazy" className="w-full h-40 object-cover" />
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
              <p className="text-xs text-zinc-400 leading-relaxed flex-1">{item.description}</p>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-blue-500 hover:underline">
                  {item.linkLabel || "View Credential"} <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
