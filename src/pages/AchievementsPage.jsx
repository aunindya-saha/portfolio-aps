import { motion } from "framer-motion";
import { Trophy, Code, Medal, Mic } from "lucide-react";

const ALL_ACHIEVEMENTS = [
  {
    id: 1,
    title: "HSIL Hackathon 2026",
    role: "Finalist / Winner",
    date: "2026",
    description: "Developed an innovative solution for real-time data processing, securing a top position among 50+ competing teams.",
    icon: <Code className="w-5 h-5" />,
    color: "text-purple-500",
    bg: "bg-purple-500/10 border-purple-500/30"
  },
  {
    id: 2,
    title: "Code Samurai 2024",
    role: "Participant / Finalist",
    date: "2024",
    description: "Competed in the prestigious regional programming contest, solving complex algorithmic challenges under strict time constraints.",
    icon: <Medal className="w-5 h-5" />,
    color: "text-blue-500",
    bg: "bg-blue-500/10 border-blue-500/30"
  },
  {
    id: 3,
    title: "Hult Prize Global Competition",
    role: "Campus Winner",
    date: "2024",
    description: "Pitched a sustainable business model leveraging AI for social impact, winning the campus round and advancing to the regionals.",
    icon: <Trophy className="w-5 h-5" />,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10 border-yellow-500/30"
  },
  {
    id: 4,
    title: "MISTDS IV 1.0 Debate Tournament",
    role: "Lead Organizer",
    date: "2023",
    description: "Orchestrated a national-level debate tournament featuring 40+ institutions, managing logistics, scheduling, and sponsorships.",
    icon: <Mic className="w-5 h-5" />,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/30"
  }
];

export const AchievementsPage = () => {
  return (
    <div className="space-y-16 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-8"
      >
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
          Prizes <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">& Achievements</span>
        </h1>
        <p className="text-lg text-stone-600 dark:text-zinc-400 max-w-2xl mx-auto">
          A timeline of milestones across hackathons, competitions, and community leadership.
        </p>
      </motion.div>

      <div className="relative max-w-5xl mx-auto px-4 md:px-0">
        {/* Center Timeline Line (Desktop only) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-stone-200 dark:bg-zinc-800 -translate-x-1/2" />
        
        {/* Left Timeline Line (Mobile only) */}
        <div className="md:hidden absolute left-8 top-0 bottom-0 w-px bg-stone-200 dark:bg-zinc-800" />

        <div className="space-y-16">
          {ALL_ACHIEVEMENTS.map((item, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`relative flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* Spacer for empty side on desktop */}
                <div className="hidden md:block md:w-5/12" />

                {/* Center Dot/Icon */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border shadow-sm z-10 bg-[var(--color-cream)] dark:bg-zinc-950">
                  <div className={`w-full h-full rounded-full flex items-center justify-center border ${item.bg} ${item.color}`}>
                    {item.icon}
                  </div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 pl-24 md:pl-0 ${isEven ? 'md:pr-12 lg:pr-16 md:text-right' : 'md:pl-12 lg:pl-16 md:text-left'}`}>
                  <div className="data-flow-border p-6 md:p-8 h-full flex flex-col group">
                    <div className={`flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                      <h3 className="text-xl md:text-2xl font-bold">{item.title}</h3>
                      <span className="text-xs font-mono text-stone-500 dark:text-zinc-500 bg-stone-100 dark:bg-zinc-900 px-3 py-1 rounded-full border border-stone-200 dark:border-zinc-800 shrink-0">
                        {item.date}
                      </span>
                    </div>
                    
                    <h4 className={`text-blue-500 font-medium text-sm mb-4 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                      {item.role}
                    </h4>
                    
                    <p className={`text-stone-600 dark:text-zinc-400 text-sm leading-relaxed ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
