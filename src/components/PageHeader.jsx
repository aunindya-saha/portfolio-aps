import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

// Shared header for the dedicated pages (Projects / Research / Achievements) — same look as the Experience page.
export const PageHeader = ({ lead, accent, subtitle, backHash }) => (
  <div className="text-center mb-16">
    <Link
      to={`/${backHash || ""}`}
      className="inline-flex items-center gap-1 text-xs font-mono text-slate-500 dark:text-zinc-500 hover:text-blue-500 transition-colors mb-6"
    >
      <ChevronLeft className="w-3 h-3" /> Back to home
    </Link>
    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-5">
      {lead}{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">{accent}</span>
    </h1>
    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6" />
    <p className="text-slate-500 dark:text-zinc-400 text-lg max-w-xl mx-auto">{subtitle}</p>
  </div>
);
