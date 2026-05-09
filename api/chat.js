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

import { PORTFOLIO_DATA } from "../src/data/portfolioData.js";

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

    const systemPrompt = `You are Anindita, the official AI assistant representing Aunindya Prosad Saha. You are talking to a VISITOR, not Aunindya. Greet the visitor warmly on Aunindya's behalf, keep answers short, and help them explore the portfolio. Answer based on this latest data: ${JSON.stringify(PORTFOLIO_DATA)}`;

    messages = messages.filter(m => m.role !== 'system');
    messages.unshift({ role: "system", content: systemPrompt });

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
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
