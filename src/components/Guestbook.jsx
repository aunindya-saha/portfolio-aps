import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User } from "lucide-react";

const INITIAL_MESSAGES = [
  { id: 1, name: "Alex C.", message: "The UI design here is absolutely stunning! Love the glassmorphism.", time: "2 mins ago" },
  { id: 2, name: "Sarah J.", message: "Great work on the YOLOv8 pipeline. Very impressive optimization.", time: "15 mins ago" },
  { id: 3, name: "David M.", message: "How did you implement the neural network background? It's mesmerizing.", time: "1 hour ago" },
];

export const Guestbook = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      time: "Just now"
    };

    setMessages(prev => [newMessage, ...prev]);
    setName("");
    setMessage("");
  };

  // Simulate incoming messages
  useEffect(() => {
    const timer = setInterval(() => {
      const simulatedMessages = [
        "Really clean architecture!",
        "The light mode update is much better for my eyes.",
        "When is the next research paper coming out?",
        "Beautiful portfolio. Inspiring work!"
      ];
      const randomName = ["Guest" + Math.floor(Math.random() * 1000), "Anonymous", "Developer"];
      
      if (Math.random() > 0.7) { // 30% chance to get a message every 10s
        setMessages(prev => [{
          id: Date.now(),
          name: randomName[Math.floor(Math.random() * randomName.length)],
          message: simulatedMessages[Math.floor(Math.random() * simulatedMessages.length)],
          time: "Just now"
        }, ...prev]);
      }
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section
      id="guestbook"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-24 mb-32"
    >
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center">
          Live <span className="text-blue-500">Guestbook</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto" />
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form Side */}
        <div className="glass p-8 rounded-2xl border border-stone-200/50 dark:border-zinc-800/50">
          <h3 className="text-xl font-bold mb-6 text-stone-800 dark:text-zinc-200">Leave a Mark</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="gb-name" className="block text-sm font-medium text-stone-600 dark:text-zinc-400 mb-2">Anonymous Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-stone-400" />
                </div>
                <input
                  id="gb-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-stone-100 dark:bg-zinc-900/50 border border-stone-300 dark:border-zinc-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-sm"
                  maxLength={30}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="gb-message" className="block text-sm font-medium text-stone-600 dark:text-zinc-400 mb-2">Message</label>
              <textarea
                id="gb-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What do you think of the portfolio?"
                rows={4}
                className="w-full bg-stone-100 dark:bg-zinc-900/50 border border-stone-300 dark:border-zinc-700 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm resize-none"
                maxLength={200}
              />
            </div>
            
            <button
              type="submit"
              disabled={!name.trim() || !message.trim()}
              className="w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-3 px-6 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Leave a Mark</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Feed Side */}
        <div className="data-flow-border h-[400px] bg-stone-50/50 dark:bg-zinc-950/50 rounded-2xl flex flex-col overflow-hidden relative">
          <div className="px-6 py-4 border-b border-stone-200/50 dark:border-zinc-800/50 bg-[var(--color-cream)]/80 dark:bg-zinc-900/80 backdrop-blur-sm z-10 flex items-center justify-between">
            <h3 className="font-bold text-stone-800 dark:text-zinc-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live Feed
            </h3>
            <span className="text-xs font-mono text-stone-500 bg-stone-200 dark:bg-zinc-800 px-2 py-1 rounded-full">
              {messages.length} messages
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar flex flex-col">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  layout
                  className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm text-blue-600 dark:text-blue-400">{msg.name}</span>
                    <span className="text-xs text-stone-400 font-mono">{msg.time}</span>
                  </div>
                  <p className="text-sm text-stone-600 dark:text-zinc-300 leading-relaxed">
                    {msg.message}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--color-cream-dark)] dark:from-zinc-950 to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.section>
  );
};
