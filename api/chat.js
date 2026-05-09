import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 m"),
  analytics: true,
});

// Clean, text-based portfolio summary to avoid Vercel JSX/Import crashes
const portfolioSummary = `
Name: Aunindya Prosad Saha
Education: Undergraduate Level 4 student, Dept of CSE at MIST (Military Institute of Science and Technology), Dhaka. Graduating in June 2026.
Expertise: Full-Stack Web Dev (React, Next.js, Supabase), AI & Machine Learning (LLMs, CNNs, Hyperparameter Optimization), and C++ Competitive Programming.
Key Projects:
1. Automated Landslide Detection System (YOLOv8)
2. AI-Powered Job Recommendation Engine (GNN, FastAPI)
3. Medical Imaging Anomaly Detector (EfficientNetB3)
Achievements: 2 research papers accepted at ICCIT 2025. Participated in Hult Prize 2024 and HSIL Hackathon 2026.
Goals: Applying for higher studies in Germany and New Zealand for 2026-2027.
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'anonymous';

    if (process.env.UPSTASH_REDIS_REST_URL) {
      const { success } = await ratelimit.limit(`chat_${ip}`);
      if (!success) {
        return res.status(429).json({ error: "Rate limit exceeded. Please try again later." });
      }
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    let { messages } = body;

    const systemPrompt = `You are Anindita, the official AI assistant representing Aunindya Prosad Saha. You are talking to a VISITOR, not Aunindya. Greet the visitor warmly on Aunindya's behalf, keep answers short (2-3 sentences max), and help them explore the portfolio. Base your knowledge ONLY on this data: ${portfolioSummary}`;

    messages = messages.filter(m => m.role !== 'system');
    messages.unshift({ role: "system", content: systemPrompt });

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: messages,
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || JSON.stringify(data) || "Groq API Error");
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error("Chat API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}