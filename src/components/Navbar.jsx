import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const ANCHOR_LINKS = [
  { label: "Tech Stack", hash: "#skills" },
  { label: "Projects",   hash: "#projects" },
  { label: "Research",   hash: "#research" },
  { label: "Achievements", hash: "#achievements" },
];

const ROUTE_LINKS = [
  { label: "Experience", to: "/experience" },
  { label: "Insights",   to: "/insights" },
];

export const Navbar = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // For anchor links: if already on "/", just scroll.
  // If on another page, navigate home then let ScrollHandler handle the hash.
  const handleAnchorClick = (e, hash) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname === "/") {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/" + hash);
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      {/* Floating pill container */}
      <div className="flex items-center justify-between gap-6 px-5 py-2.5 rounded-full backdrop-blur-md bg-white/70 dark:bg-zinc-900/70 border border-slate-200/60 dark:border-zinc-700/60 shadow-xl shadow-black/10 pointer-events-auto w-full max-w-3xl">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <span className="text-xl font-black tracking-tighter">
            APS<span className="text-blue-500">.</span>
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="rounded-full backdrop-blur-md px-8 py-1.5 flex items-center justify-center gap-6 dark:text-white text-black bg-white/50 dark:bg-zinc-900/50 shadow-lg w-fit">
          {/* Anchor Links for Landing Page */}
          {['skills', 'projects', 'research', 'achievements'].map((id) => (
            <a 
              key={id} 
              href={`/#${id}`} 
              onClick={(e) => handleAnchorClick(e, `#${id}`)}
              className="text-sm font-medium hover:text-blue-500 transition-colors capitalize"
            >
              {id.replace('-', ' ')}
            </a>
          ))}

          {/* Standard Route Links */}
          <Link to="/experience" className="text-sm font-medium hover:text-blue-500 transition-colors">Experience</Link>
          <Link to="/insights" className="text-sm font-medium hover:text-blue-500 transition-colors">Insights</Link>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute top-[calc(100%+8px)] left-4 right-4 rounded-2xl backdrop-blur-md bg-white/90 dark:bg-zinc-900/90 border border-slate-200/60 dark:border-zinc-700/60 shadow-xl overflow-hidden pointer-events-auto"
          >
            <div className="p-3 space-y-1">
              {ANCHOR_LINKS.map(({ label, hash }) => (
                <a
                  key={hash}
                  href={"/" + hash}
                  onClick={(e) => handleAnchorClick(e, hash)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-zinc-300 hover:text-blue-500 hover:bg-blue-500/8 transition-all"
                >
                  {label}
                </a>
              ))}
              <div className="h-px bg-slate-100 dark:bg-zinc-800 my-1" />
              {ROUTE_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === to
                      ? "text-blue-500 bg-blue-500/10"
                      : "text-slate-700 dark:text-zinc-300 hover:text-blue-500 hover:bg-blue-500/8"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
