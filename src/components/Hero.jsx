import { useState, useRef, useEffect } from "react";
import { Code, X, Send, Image } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { createClient } from "@supabase/supabase-js";
import { Typewriter } from "react-simple-typewriter";

export const supabase = import.meta.env.VITE_SUPABASE_URL
  ? createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
  : null;

const MOCK_CODE = `import torch
from ai_models import Aunindya

# Initialize AI Researcher & Developer Instance
profile = Aunindya(
    roles=["AI Researcher", "Full-Stack Developer"],
    focus=["Computer Vision", "LLMs", "Full-Stack Web"],
    architectures=["CNNs", "Transfer Learning"],
    dev_skills=["Node.js", "React.js"],
    passion="Building intuitive, dynamic AI systems."
)

status = profile.train_and_deploy(epochs=1000)
print(f"Status: {status} | Ready to innovate.")`;



const INITIAL_MESSAGES = [
  { id: 1, user: "SYS_ADMIN", color: "text-blue-500", message: "Agentic network initialized. Awaiting queries...", isText: true },
  { id: 2, user: "Guest_492", color: "text-purple-400", message: "This UI is crazy! 🔥", isText: true },
  { id: 3, user: "AI_NODE", color: "text-emerald-400", message: "Processing real-time telemetry...", isText: true },
];

export const Hero = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    if (!supabase) return;
    const presenceChannel = supabase.channel('online-users', {
      config: { presence: { key: 'visitor' } },
    });

    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState();
        const count = Object.keys(state).length;
        setActiveUsers(count);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await presenceChannel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      supabase.removeChannel(presenceChannel);
    };
  }, []);

  return (
    <section className="min-h-[80vh] grid grid-cols-1 lg:grid-cols-2 gap-12 relative mt-16 md:mt-24">
      {/* Left Column - Text Block */}
      <div className="flex flex-col justify-center items-start z-10 order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight mb-4 text-slate-800 dark:text-zinc-100">
            Aunindya <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Prosad Saha
            </span>
          </h1>

          <div className="text-xl md:text-3xl font-bold text-slate-800 dark:text-zinc-200 mb-6 h-10">
            <span className="text-blue-500 mr-2">&gt;</span>
            <Typewriter
              words={['AI Researcher', 'Full-Stack Engineer', 'Innovator', 'Designer']}
              loop={true}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </div>

          <p className="text-lg md:text-xl font-light text-slate-600 dark:text-zinc-400 mb-8 max-w-lg leading-relaxed">
            Dedicated to building high-performance AI models and user-centric web applications. Bridging the gap between cutting-edge research and seamless engineering.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-lg shadow-blue-500/30"
            >
              Let's Collaborate
            </a>
            <a
              href="https://drive.google.com/file/d/1S9AcQtpT1uJGqT-jHKRawLyfb54CFZnP/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-slate-300 dark:border-zinc-700 hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Get Resume
            </a>
          </div>

          <div className="mb-10">
            <motion.button
              onClick={() => setIsChatOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md cursor-pointer group transition-all"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-mono text-zinc-600 dark:text-zinc-300 group-hover:hidden block">
                Live: {activeUsers} visitors online
              </span>
              <span className="text-sm font-mono text-emerald-500 hidden group-hover:block">
                Open Neural Uplink ↑
              </span>
            </motion.button>
          </div>

          <div className="flex items-center gap-6">
            <SocialLink
              href="https://github.com/aunindya-saha/portfolio-aps.git"
              label="GitHub"
              icon={
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              }
            />
            <SocialLink
              href="https://linkedin.com/in/aunindya"
              label="LinkedIn"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 fill-current">
                  <path d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z" />
                </svg>
              }
            />
            <SocialLink
              href="mailto:anindosaha16@gmail.com"
              label="Email"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 193" className="w-5 h-5">
                  <path fill="#4285F4" d="M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455z" />
                  <path fill="#34A853" d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798z" />
                  <path fill="#EA4335" d="m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z" />
                  <path fill="#FBBC04" d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945z" />
                  <path fill="#C5221F" d="m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23z" />
                </svg>
              }
            />
          </div>
        </motion.div>
      </div>

      {/* Right Column - AI Inference Card */}
      <div className="flex items-center justify-center order-1 lg:order-2 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-xl perspective-1000"
        >
          <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            perspective={1000}
            transitionSpeed={2500}
            scale={1.02}
            gyroscope={true}
            className="w-full"
          >
            <TerminalCard />
          </Tilt>
        </motion.div>
      </div>

      <LiveChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} activeUsers={activeUsers} />
    </section>
  );
};

const TerminalCard = () => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden rounded-xl border border-slate-700/50 dark:border-slate-700/50 bg-[#0d1117]/80 backdrop-blur-xl shadow-2xl transition-all duration-300"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
          opacity: 1
        }}
      />
      <div className="flex items-center px-4 py-3 border-b border-slate-700/50 bg-[#161b22]/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto flex items-center text-xs text-slate-400 font-mono tracking-wider opacity-60">
          <Code className="w-3 h-3 mr-2" />
          inference_engine.py
        </div>
      </div>
      <div className="p-1 md:p-4 overflow-x-auto custom-scrollbar relative z-10 text-[10px] sm:text-xs md:text-sm">
        <SyntaxHighlighter
          language="python"
          style={vscDarkPlus}
          customStyle={{ background: "transparent", padding: "0", margin: "0" }}
          wrapLongLines={true}
        >
          {MOCK_CODE}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="relative group p-3 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 transition-all duration-300 hover:border-transparent"
  >
    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-md -z-10" />
    <span className="text-slate-700 dark:text-zinc-300 group-hover:text-blue-500 transition-colors">
      {icon}
    </span>
  </a>
);

const LiveChatModal = ({ isOpen, onClose, activeUsers }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const [gifs, setGifs] = useState([]);
  const [guestName, setGuestName] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    let name = localStorage.getItem('guestName');
    if (!name) {
      name = "Guest_" + Math.floor(Math.random() * 1000);
      localStorage.setItem('guestName', name);
    }
    setGuestName(name);

    if (supabase) {
      supabase.from('live_messages').select('*').order('created_at', { ascending: true }).limit(50)
        .then(({ data, error }) => {
          if (data && !error) {
            setMessages(prev => {
              const ids = new Set(prev.map(m => m.id));
              const newMsgs = data.filter(d => !ids.has(d.id));
              return [...prev, ...newMsgs];
            });
          }
        });
    }
  }, []);

  const fetchGifs = async (query) => {
    if (!query.trim()) {
      setGifs([]);
      return;
    }
    try {
      const res = await fetch(`https://g.tenor.com/v1/search?q=${query}&key=LIVDSRZULELA&limit=8`);
      const data = await res.json();
      setGifs(data.results || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!supabase) return;
    // Subscribe to new messages
    const messageSub = supabase
      .channel('public:live_messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'live_messages' }, payload => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(messageSub);
    };
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    const currentInput = inputRef.current?.value?.trim();
    if (!currentInput) return;

    if (!supabase) {
      alert("Database connection missing. Please restart Vercel dev.");
      return;
    }

    const optimisticMsg = {
      id: Date.now(),
      anonymous_name: guestName,
      message: currentInput,
      is_gif: false
    };

    setMessages(prev => [...prev, optimisticMsg]);
    // Clear imperatively — zero re-renders from the input
    if (inputRef.current) inputRef.current.value = "";
    setShowGifPicker(false);

    try {
      const { error } = await supabase.from('live_messages').insert([{
        anonymous_name: optimisticMsg.anonymous_name,
        message: currentInput,
        is_gif: false
      }]);
      if (error) console.error("Error sending message:", error);
    } catch (err) {
      console.error("Crash during send:", err);
    }
  };

  const handleGifSend = async (gif) => {
    if (!supabase) return;

    const optimisticMsg = {
      id: Date.now(),
      anonymous_name: guestName,
      message: gif.media[0].gif.url,
      is_gif: true
    };

    setMessages(prev => [...prev, optimisticMsg]);
    setShowGifPicker(false);

    try {
      const { error } = await supabase.from('live_messages').insert([
        {
          anonymous_name: optimisticMsg.anonymous_name,
          message: gif.media[0].gif.url,
          is_gif: true
        }
      ]);
      if (error) console.error("Error sending GIF:", error);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMessageClick = (msgId) => {
    setTooltip(tooltip === msgId ? null : msgId);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Backdrop — click to close */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onPointerDown={onClose}
      />

      {/* Modal */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.93, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="w-full max-w-xl bg-zinc-950 border border-emerald-500/30 rounded-2xl shadow-2xl shadow-emerald-500/10 overflow-hidden flex flex-col pointer-events-auto"
          style={{ height: "min(620px, 90vh)" }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-emerald-500/20 bg-zinc-900/70 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-mono text-sm font-semibold">Neural Uplink Active</span>
              <span className="text-zinc-500 font-mono text-xs">· {activeUsers} online</span>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1 rounded hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="relative group"
                onClick={() => handleMessageClick(msg.id)}
              >
                <div className="flex gap-2 items-start cursor-pointer">
                  <span className="text-emerald-400 font-bold shrink-0">{msg.anonymous_name || msg.user}:</span>
                  {msg.is_gif ? (
                    <img src={msg.message} className="w-48 rounded-md" alt="gif" />
                  ) : (
                    <p className="text-zinc-300 break-words">{msg.message}</p>
                  )}
                </div>
                {/* Tooltip on click */}
                <AnimatePresence>
                  {tooltip === msg.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute left-0 top-full mt-1 z-10 bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl pointer-events-none"
                    >
                      Drop a message about your experience on this page — if you have something to say, drop it here!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <div className="text-zinc-600 italic text-[10px]">New visitor has joined the uplink...</div>
            <div ref={messagesEndRef} />
          </div>

          {/* GIF Picker */}
          <AnimatePresence>
            {showGifPicker && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-zinc-800 bg-zinc-900/80 overflow-hidden"
              >
                <div className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">GIF Library</p>
                    <input
                      type="text"
                      placeholder="Search GIFs..."
                      onChange={(e) => fetchGifs(e.target.value)}
                      className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-[10px] text-zinc-200 focus:outline-none focus:border-emerald-500/50 font-mono w-32"
                    />
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-40 overflow-y-auto custom-scrollbar">
                    {gifs.length === 0 ? (
                      <p className="text-zinc-500 text-[10px] font-mono col-span-full">Type to search Tenor GIFs...</p>
                    ) : (
                      gifs.map((gif) => (
                        <button
                          key={gif.id}
                          onClick={() => handleGifSend(gif)}
                          className="relative group rounded-lg overflow-hidden border border-zinc-700 hover:border-emerald-500/50 transition-colors h-16 w-full bg-zinc-800"
                        >
                          <img src={gif.media[0].gif.url} alt="gif" className="w-full h-full object-cover" />
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-zinc-900/80 border-t border-emerald-500/20 flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowGifPicker(v => !v)}
              title="GIF Picker"
              className={`text-zinc-400 hover:text-emerald-400 p-2 rounded-lg transition-colors ${showGifPicker ? 'bg-emerald-500/10 text-emerald-400' : ''}`}
            >
              <Image className="w-4 h-4" />
            </button>
            <input
              ref={inputRef}
              type="text"
              placeholder="Transmit payload..."
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-full px-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/50 font-mono"
            />
            <button
              type="submit"
              className="text-zinc-950 bg-emerald-500 hover:bg-emerald-400 p-2.5 rounded-full transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
