import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Terminal, Send, Loader } from "lucide-react";

const SYSTEM_PROMPT = `You are Aunindya, the official AI assistant representing Aunindya Prosad Saha. You are talking to a VISITOR, not Aunindya. Greet the visitor warmly on Aunindya's behalf, keep answers short, and help them explore the portfolio.`;

export const ChatbotShell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isIdentified, setIsIdentified] = useState(false);
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleIdentitySubmit = (e) => {
    e.preventDefault();
    if (!userName.trim()) return;
    setIsIdentified(true);
    // Exact required greeting
    setMessages([
      {
        role: "assistant",
        content: `Hello ${userName}, Aunindya here on this side. Have you visited the website properly or how was your day, or can ask about me, my work if you have any query.`
      }
    ]);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...newMessages
      ];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages })
      });

      if (response.status === 429) {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "⚠️ Rate limit reached. Please wait a few minutes before sending more messages."
        }]);
        return;
      }

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      const assistantContent = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that. Please try again.";
      setMessages(prev => [...prev, { role: "assistant", content: assistantContent }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `⚠️ Error: ${err.message}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg z-50 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100 glass hover:bg-blue-500/10 hover:border-blue-500/50 group'}`}
        aria-label="Open Chatbot"
      >
        <MessageSquare className="w-6 h-6 text-slate-700 dark:text-zinc-300 group-hover:text-blue-500 transition-colors" />
        <span className="absolute inset-0 rounded-full border border-blue-500/50 animate-ping opacity-20 group-hover:opacity-100" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[420px] h-[560px] z-50 flex flex-col rounded-2xl overflow-hidden glass shadow-2xl border border-slate-200/50 dark:border-zinc-800/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-slate-100/80 dark:bg-zinc-900/80 border-b border-slate-200/50 dark:border-zinc-800/50 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-blue-500" />
                <span className="font-mono text-sm font-semibold tracking-wider text-slate-800 dark:text-zinc-200">
                  terminal_agent
                </span>
                <span className="flex h-2 w-2 relative ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isIdentified ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#fafafa]/50 dark:bg-[#0a0a0a]/50 backdrop-blur-sm">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                  <Terminal className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-center text-slate-800 dark:text-zinc-200">Anonymous Access</h3>
                <p className="text-center text-sm text-slate-500 dark:text-zinc-400 mb-8">
                  Enter a made-up alias to continue. Your privacy is guaranteed.
                </p>
                <form onSubmit={handleIdentitySubmit} className="w-full space-y-4">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter an alias..."
                    className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm text-slate-800 dark:text-zinc-200 text-center"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!userName.trim()}
                    className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium transition-all"
                  >
                    Initialize Chat
                  </button>
                </form>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs sm:text-sm bg-[#fafafa]/50 dark:bg-[#0a0a0a]/50">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-xl ${msg.role === 'user'
                          ? 'bg-blue-500 text-white rounded-tr-none'
                          : 'bg-slate-200 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 rounded-tl-none border border-slate-300 dark:border-zinc-700'
                        }`}>
                        {msg.role === 'assistant' && <span className="text-blue-500 font-bold mr-2">&gt;</span>}
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-200 dark:bg-zinc-800 rounded-xl rounded-tl-none p-3 border border-slate-300 dark:border-zinc-700 flex items-center gap-2">
                        <Loader className="w-3 h-3 animate-spin text-blue-500" />
                        <span className="text-slate-500 dark:text-zinc-400 text-xs">Thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-slate-100/80 dark:bg-zinc-900/80 border-t border-slate-200/50 dark:border-zinc-800/50 backdrop-blur-md shrink-0">
                  <form onSubmit={handleSend} className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400 font-mono text-sm">&gt;</span>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask a question..."
                      className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-lg py-2 pl-8 pr-10 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm text-slate-800 dark:text-zinc-200 placeholder:text-slate-400"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 p-1 text-slate-400 hover:text-blue-500 disabled:opacity-50 disabled:hover:text-slate-400 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
