import { motion } from "framer-motion";
import { BookOpen, Calendar, ExternalLink, Hourglass } from "lucide-react";
import { useEffect } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { PageHeader } from "../components/PageHeader";

const ResearchCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    className="flex flex-col md:flex-row gap-6 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur hover:border-blue-500/30 transition-all duration-300"
  >
    <div className="w-full md:w-56 shrink-0 h-40 md:h-auto rounded-xl overflow-hidden bg-slate-100 dark:bg-zinc-800">
      <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover" />
    </div>
    <div className="flex flex-col flex-1 min-w-0">
      <div className="flex items-center gap-2 text-[11px] font-semibold text-blue-500 mb-2 tracking-wider uppercase">
        {item.link ? <BookOpen className="w-3 h-3" /> : <Hourglass className="w-3 h-3" />}
        <span>{item.type}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-100 mb-2 leading-snug">{item.title}</h3>
      <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-4 flex-1">{item.description}</p>
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-zinc-500">
        <span className="flex items-center gap-2">
          <Calendar className="w-3 h-3" />
          {item.conference ? `${item.conference} (${item.year})` : item.status}
        </span>
        {item.link && (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-mono text-blue-500 hover:underline">
            Read Paper <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

export const ResearchPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-4xl mx-auto pt-28 pb-24 px-4"
    >
      <PageHeader
        lead="Research &"
        accent="Publications"
        subtitle="Peer-reviewed papers and the work currently in progress."
        backHash="#research"
      />

      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-zinc-100">
        Peer-Reviewed <span className="text-blue-500">Papers</span>
      </h2>
      <div className="space-y-4 mb-16">
        {PORTFOLIO_DATA.research.map((item, i) => <ResearchCard key={item.id} item={item} index={i} />)}
      </div>

      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-zinc-100">
        Ongoing <span className="text-blue-500">Research</span>
      </h2>
      <div className="space-y-4">
        {PORTFOLIO_DATA.ongoingResearch.map((item, i) => <ResearchCard key={item.id} item={item} index={i} />)}
      </div>
    </motion.div>
  );
};
