import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import profileImage from "../assets/profile_image.png";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export const AboutPreview = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Side: Image Placeholder */}
        <div className="md:col-span-5 relative">
          <div className="aspect-[4/5] w-full max-w-sm mx-auto glass rounded-2xl overflow-hidden relative group">
            {/* Profile Image — drop your photo at frontend/public/profile.jpg */}
            <img
              src={profileImage}
              alt="Aunindya Prosad Saha"
              className="absolute inset-0 w-full h-full object-cover object-center z-0"
            />

            {/* Animated decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2 z-10" />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
          </div>

          {/* Decorative accents */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-blue-500/30 rounded-tl-3xl z-[-1]" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-purple-500/30 rounded-br-3xl z-[-1]" />
        </div>

        {/* Right Side: Intro Text */}
        <div className="md:col-span-7 flex flex-col items-start text-left">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Beyond the <span className="text-blue-500">Code</span>
          </h2>

          <div className="space-y-6 text-lg text-slate-600 dark:text-zinc-400 leading-relaxed mb-8">
            {PORTFOLIO_DATA.bio.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <Link
            to="/insights"
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-blue-500 hover:text-blue-500 transition-all shadow-sm"
          >
            <span className="font-medium">Read Full Bio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
};
