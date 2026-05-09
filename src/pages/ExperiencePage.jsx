import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ChevronDown } from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "software",
    label: "Software Development",
    icon: "💻",
    accent: "from-blue-500 to-cyan-500",
    entries: [
      {
        id: "exp-1",
        title: "Senior AI Researcher",
        company: "Neural Dynamics Lab",
        year: "2024 – Present",
        desc: "Leading research on large language models and computer vision pipelines.",
        details: [
          "Architected and deployed a multi-modal neural network serving 10M+ daily inferences.",
          "Published 2 peer-reviewed papers on parameter-efficient fine-tuning (PEFT) methods.",
          "Mentored a team of 4 junior data scientists and ML engineers.",
        ],
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "exp-2",
        title: "Full-Stack Engineer",
        company: "TechNova Solutions",
        year: "2022 – 2024",
        desc: "Built high-performance, scalable web applications and data dashboards.",
        details: [
          "Led migration from monolith to React/Next.js microservices stack.",
          "Optimised database queries — average load times reduced by 40%.",
          "Integrated real-time WebSocket features for collaborative tools.",
        ],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
      },
    ],
  },
  {
    id: "volunteer",
    label: "Volunteer & Mentorship",
    icon: "🤝",
    accent: "from-emerald-500 to-teal-500",
    entries: [
      {
        id: "vol-1",
        title: "Tech Mentor",
        company: "Code for Tomorrow",
        year: "2021 – Present",
        desc: "Mentoring underprivileged students in web development and basic programming.",
        details: [
          "Conducted weekly workshops for 50+ students on modern JavaScript.",
          "Organised community hackathons with 200+ participants.",
        ],
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      },
    ],
  },
  {
    id: "club",
    label: "Club Activities",
    icon: "🏛️",
    accent: "from-purple-500 to-pink-500",
    entries: [
      {
        id: "club-1",
        title: "President",
        company: "University AI Society",
        year: "2022 – 2023",
        desc: "Led the largest technical club on campus, focusing on AI and Machine Learning.",
        details: [
          "Hosted the university's first AI summit featuring industry leaders.",
          "Grew club membership by 150% in one academic year.",
        ],
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800",
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
