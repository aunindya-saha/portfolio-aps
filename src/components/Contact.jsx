import { motion } from "framer-motion";
import { Send, MapPin, Mail } from "lucide-react";
import { useState, useRef } from "react";

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aunindyasaha/",
    icon: "https://cdn.simpleicons.org/linkedin/0A66C2",
    hoverColor: "hover:border-[#0A66C2]/50 hover:shadow-[#0A66C2]/10"
  },
  {
    label: "Instagram",
    href: "https://instagram.com/anindosaha16",
    icon: "https://cdn.simpleicons.org/instagram/E4405F",
    hoverColor: "hover:border-[#E4405F]/50 hover:shadow-[#E4405F]/10"
  },
  {
    label: "Facebook",
    href: "https://facebook.com/anindosaha16",
    icon: "https://cdn.simpleicons.org/facebook/1877F2",
    hoverColor: "hover:border-[#1877F2]/50 hover:shadow-[#1877F2]/10"
  }
];

export const Contact = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error | ratelimit
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    };
    setStatus("success");
    setErrorMsg("");

    // Clear fields imperatively — zero re-renders
    nameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";

    // Fire and forget fetch
    fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    }).catch(err => console.error("Email send failed in background:", err));
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-24 pb-24"
    >
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Let's <span className="text-blue-500">Connect</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        <p className="mt-4 text-slate-600 dark:text-zinc-400 max-w-lg">
          Have a project in mind or want to discuss AI research? Drop me a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* Left: Form (wider) */}
        <div className="lg:col-span-3">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Name</label>
                <input
                  ref={nameRef}
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full bg-slate-100/50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-800 dark:text-zinc-200"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Email</label>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full bg-slate-100/50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-800 dark:text-zinc-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Message</label>
              <textarea
                ref={messageRef}
                name="message"
                required
                rows="5"
                placeholder="How can we collaborate?"
                className="w-full bg-slate-100/50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-800 dark:text-zinc-200 resize-none"
              />
            </div>

            {/* Status messages */}
            {status === "success" && (
              <p className="text-sm text-emerald-500 font-medium">✅ Message sent! I'll get back to you soon.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400 font-medium">❌ {errorMsg}</p>
            )}
            {status === "ratelimit" && (
              <p className="text-sm text-amber-400 font-medium italic">⏳ {errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="group flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium transition-all shadow-lg shadow-blue-500/20"
            >
              <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Right: Compact glassmorphic card */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Contact Info card */}
          <div className="glass rounded-2xl p-6 space-y-5 flex-1">
            <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200">Direct Contact</h3>

            <a
              href="mailto:anindosaha16@gmail.com"
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                <Mail className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-zinc-500">Email</p>
                <p className="text-sm font-medium text-slate-700 dark:text-zinc-300 group-hover:text-blue-500 transition-colors">
                  anindosaha16@gmail.com
                </p>
              </div>
            </a>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-zinc-500">Location</p>
                <p className="text-sm font-medium text-slate-700 dark:text-zinc-300">Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/50 dark:border-zinc-800/50">
              <p className="text-xs font-medium text-slate-500 dark:text-zinc-500 mb-3 uppercase tracking-wider">Find me on</p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ label, href, icon, hoverColor }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={`w-10 h-10 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center justify-center bg-white/50 dark:bg-zinc-900/50 transition-all duration-200 shadow-sm hover:shadow-md ${hoverColor}`}
                  >
                    <img src={icon} alt={label} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Resume card */}
          <a
            href="https://drive.google.com/file/d/1S9AcQtpT1uJGqT-jHKRawLyfb54CFZnP/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="group glass rounded-2xl p-5 flex items-center justify-between hover:border-blue-500/50 transition-all duration-300"
          >
            <div>
              <p className="text-xs text-slate-500 dark:text-zinc-500 mb-0.5">Curriculum Vitae</p>
              <p className="font-bold text-slate-800 dark:text-zinc-100">View / Download Resume</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/30">
              <Send className="w-4 h-4 text-white rotate-[-45deg]" />
            </div>
          </a>
        </div>

      </div>
    </motion.section>
  );
};
