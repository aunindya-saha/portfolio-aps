import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "professional",
    label: "Professional Experience",
    icon: "💻",
    accent: "from-blue-500 to-cyan-500",
    entries: [
      {
        id: "exp-1",
        title: "Research Assistant",
        company: "Dept. of CSE, MIST, Dhaka, Bangladesh",
        year: "Oct 2026 – Present",
        desc: "Working as a Research Assistant under Associate Professor Dr. Nusrat Sharmin at the Department of Computer Science and Engineering, MIST.",
        details: [
          "Vision-based pipeline for Atmospheric Visibility & AQI Estimation: developing an end-to-end computer vision pipeline that estimates Air Quality Index (AQI) and PM2.5 concentrations from real-world outdoor imagery, surpassing baseline VGG-16 transfer learning benchmarks.",
        ],
        links: [{ label: "MIST", href: "https://mist.ac.bd/" }],
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "exp-2",
        title: "Industrial Trainee (AI Development)",
        company: "JB Connect Ltd., Dhaka, Bangladesh",
        year: "May 2024 – Jun 2024",
        desc: "Industrial training in AI development, working in an agile software engineering team.",
        details: [
          "Collaborated in an agile software engineering workflow to build a full-stack conversational AI app (React, Flask).",
          "Configured automated AWS CI/CD deployment and testing pipelines via Docker.",
        ],
        links: [
          { label: "Code", href: "https://github.com/aunindya-saha/JBC-Agentica" },
          { label: "Live", href: "https://jbc-agentica.vercel.app/" },
          { label: "JB Connect Ltd.", href: "https://www.jbc-ltd.com/" },
        ],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
      },
    ],
  },
  {
    id: "leadership",
    label: "Leadership & Co-curricular",
    icon: "🏛️",
    accent: "from-purple-500 to-pink-500",
    entries: [
      {
        id: "lead-1",
        title: "President & Debate Captain",
        company: "MIST Debating Society",
        year: "Apr 2024 – Jun 2025",
        desc: "Led the MIST Debating Society as President and Debate Captain.",
        details: [
          "Directed MIST's first Inter-University Debate Tournament.",
        ],
        links: [{ label: "Certificate", href: "https://drive.google.com/file/d/1hgSMSmsSbOsz4AmXbBStnT80z9LJIwan/view?usp=sharing" }],
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "lead-2",
        title: "Vice President (Event Management) & Core Organizer",
        company: "MIST Computer Club & LeetCon National Hackathon",
        year: "Mar 2024 – Jun 2025",
        desc: "Managed events and cross-team operations for the MIST Computer Club and its flagship competitions.",
        details: [
          "Led technical community management and cross-team collaboration for the LeetCon National Hackathon and the MIST Programming Contest.",
        ],
        links: [{ label: "Certificate", href: "https://drive.google.com/file/d/1GbbKu9dVrX2vCLNqUc7sgF6C3dzvdmz_/view?usp=sharing" }],
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      },
    ],
  },
];

// ─── Entry Card ────────────────────────────────────────────────────────────────

const EntryCard = ({ entry, index }) => (
  <motion.div
    id={entry.id}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: index * 0.08 }}
    className="flex flex-col md:flex-row gap-6 scroll-mt-32 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur hover:border-blue-500/30 transition-all duration-300"
  >
    {/* Image – left */}
    <div className="w-full md:w-48 lg:w-56 shrink-0 h-40 md:h-auto rounded-xl overflow-hidden bg-slate-100 dark:bg-zinc-800 relative group">
      {entry.image ? (
        <img
          src={entry.image}
          alt={entry.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-400 font-mono text-xs">
          No Image
        </div>
      )}
    </div>

    {/* Text – right */}
    <div className="flex flex-col justify-center flex-1 min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">{entry.title}</h3>
          <p className="text-blue-500 font-medium text-sm">{entry.company}</p>
        </div>
        <span className="inline-flex shrink-0 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 font-mono text-xs text-slate-500 dark:text-zinc-400">
          {entry.year}
        </span>
      </div>

      <p className="text-slate-600 dark:text-zinc-300 text-sm mb-4 leading-relaxed">{entry.desc}</p>

      <ul className="space-y-1.5">
        {entry.details.map((d, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-500 dark:text-zinc-400">
            <span className="text-blue-500 mt-0.5 shrink-0">▹</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>

      {entry.links?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {entry.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-slate-200 dark:border-zinc-700 text-xs font-mono text-blue-500 hover:border-blue-500/50 transition-colors"
            >
              {l.label} <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

// ─── Accordion Category ────────────────────────────────────────────────────────

const AccordionCategory = ({ cat, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
      {/* Header – always visible */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 bg-white/50 dark:bg-zinc-900/50 backdrop-blur hover:bg-slate-50 dark:hover:bg-zinc-800/60 transition-colors group"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.accent} flex items-center justify-center text-xl shadow-sm`}>
            {cat.icon}
          </div>
          <div className="text-left">
            <p className="text-lg font-bold text-slate-800 dark:text-zinc-100">{cat.label}</p>
            <p className="text-xs text-slate-500 dark:text-zinc-500 font-mono">
              {cat.entries.length} {cat.entries.length === 1 ? "entry" : "entries"}
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-slate-400 dark:text-zinc-500 group-hover:text-blue-500 transition-colors"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4 border-t border-slate-100 dark:border-zinc-800">
              {cat.entries.map((entry, i) => (
                <EntryCard key={entry.id} entry={entry} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export const ExperiencePage = () => {
  const { hash } = useLocation();

  // If navigated with a hash (from ExperiencePreview), open the right category and scroll
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return; }
    const id = hash.replace("#", "");
    setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 500); // Allow accordion animation to run first
  }, [hash]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-4xl mx-auto pt-28 pb-24 px-4"
    >
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-5">
          Mission{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Log
          </span>
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6" />
        <p className="text-slate-500 dark:text-zinc-400 text-lg max-w-xl mx-auto">
          A full breakdown of my professional journey — click a category to expand.
        </p>
      </div>

      {/* Accordion list */}
      <div className="space-y-4">
        {CATEGORIES.map((cat, i) => (
          <AccordionCategory
            key={cat.id}
            cat={cat}
            defaultOpen={i === 0} // Software Development open by default
          />
        ))}
      </div>
    </motion.div>
  );
};
