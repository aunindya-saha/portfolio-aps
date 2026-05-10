import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ─── Edge Runtime Declaration ─────────────────────────────────────────────────
// Opts into Vercel Edge Functions: faster cold starts, global PoP distribution,
// and no 10s serverless timeout on Hobby plan.
export const runtime = "edge";

// ─── Upstash Redis (Edge-native, uses REST API under the hood) ────────────────
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 m"),
  analytics: true,
});

// ─── Portfolio Context ────────────────────────────────────────────────────────
const portfolioSummary = `
Name: Aunindya Prosad Saha
Education: Undergraduate Level 4 student, Dept of CSE at MIST (Military Institute of Science and Technology), Dhaka. Graduating in June 2026.
Expertise: Full-Stack Web Dev (React, Next.js, Supabase), AI & Machine Learning (LLMs, CNNs, Hyperparameter Optimization), and C++ Competitive Programming.
Key Projects:
1. Med-Llama-RAG (Llama 3 + FAISS RAG pipeline for clinical Q&A)
2. CampusNet (Full-stack university social network, Next.js + Supabase)
3. Haat-Bazar (E-commerce marketplace for Bangladeshi artisans)
4. MIST KickOff (Event-management app for inter-university football tournament)
5. House of Alchemists (Generative-art portfolio & blog platform)
Research: 2 papers accepted at ICCIT 2025 — EfficientNetB3 for medical imaging & GNN-based job recommendation.
Achievements: Champion at Procon 2023, 2nd Runner-Up at Casecraft AutoRealm 2024, Top-10 Finalist at TechnoXian Bangladesh 2024.
Goals: Applying for higher studies in Germany and New Zealand for 2026-2027.
`;

// ─── Edge Handler (Web API: Request → Response) ───────────────────────────────
export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── Graceful fallback helper ──────────────────────────────────────────────
  const fallback = () =>
    new Response(
      JSON.stringify({
        choices: [{
          message: {
            role: "assistant",
            content:
              "I'm currently stepping away from my desk to assist Aunindya. Please feel free to explore the website, or you can email him directly at **anindosaha16@gmail.com** if you need an immediate response!",
          },
        }],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  try {
    // ── Rate limiting ───────────────────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous";

    if (process.env.UPSTASH_REDIS_REST_URL) {
      const { success } = await ratelimit.limit(`chat_${ip}`);
      if (!success) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // ── Parse body ──────────────────────────────────────────────────────────
    const body = await req.json();
    let { messages } = body;

    const systemPrompt = `You are Anindita, the official AI assistant representing Aunindya Prosad Saha. You are talking to a VISITOR, not Aunindya. Greet the visitor warmly on Aunindya's behalf, keep answers short (2-3 sentences max), and help them explore the portfolio. Base your knowledge ONLY on this data: ${portfolioSummary}`;

    messages = messages.filter((m) => m.role !== "system");
    messages.unshift({ role: "system", content: systemPrompt });

    // ── Groq API call ───────────────────────────────────────────────────────
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages,
        max_tokens: 150,   // Keeps responses fast & within Edge time budget
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      return fallback();
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch {
    return fallback();
  }
}