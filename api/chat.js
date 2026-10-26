import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { buildSystemPrompt } from "./_knowledge.js";

// Node.js serverless function (req, res). The old file used the Edge/Web signature, which
// does not work on a plain Vercel Node function and made every request hang.
export const config = { maxDuration: 30 };

const FALLBACK_TEXT =
  "I'm having trouble reaching my brain right now. Please explore the website, or email Aunindya directly at **anindosaha16@gmail.com**.";

// Every failure is logged as "[CHAT_Exxx] message {details}" so you can search Vercel logs for "CHAT_E".
//   CHAT_E001 no AI provider key configured      CHAT_E002 one provider/model failed (the next one is tried)
//   CHAT_E003 every provider failed              CHAT_E004 rate limiter (Upstash) unreachable - request allowed anyway
//   CHAT_E005 unexpected crash                   CHAT_E006 request had no usable user message
const logError = (code, msg, details = {}) => console.error(`[${code}] ${msg} ${JSON.stringify(details)}`);

const MAX_TURNS = 10;
const MAX_CHARS = 1000;
const PROVIDER_TIMEOUT_MS = 9000;

let limiter = null;
function getLimiter() {
  if (limiter || !process.env.UPSTASH_REDIS_REST_URL) return limiter;
  limiter = new Ratelimit({
    redis: new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(15, "10 m"),
  });
  return limiter;
}

async function postJson(url, headers, body) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), PROVIDER_TIMEOUT_MS);
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    if (!r.ok) throw new Error(`${r.status} ${(await r.text()).slice(0, 200)}`);
    return await r.json();
  } finally {
    clearTimeout(timer);
  }
}

// ── Providers (each is used only if its key exists; first success wins) ────────
async function askGemini(system, turns) {
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const contents = turns.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  const body = {
    systemInstruction: { parts: [{ text: system }] },
    contents,
    generationConfig: { maxOutputTokens: 500, temperature: 0.5 },
  };
  if (model.includes("2.5")) body.generationConfig.thinkingConfig = { thinkingBudget: 0 };
  const data = await postJson(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    { "x-goog-api-key": process.env.GEMINI_API_KEY },
    body
  );
  return data.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
}

async function askOpenAICompatible(url, key, model, system, turns) {
  // "model" may be a comma-separated list; the next one is tried when a model is unavailable.
  let lastErr;
  for (const m of model.split(",").map((x) => x.trim()).filter(Boolean)) {
    try {
      const data = await postJson(
        url,
        { Authorization: `Bearer ${key}` },
        { model: m, messages: [{ role: "system", content: system }, ...turns], max_tokens: 400, temperature: 0.5 }
      );
      const text = data.choices?.[0]?.message?.content;
      if (text) return text;
      lastErr = new Error(`empty reply from ${m}`);
    } catch (err) {
      lastErr = new Error(`${m}: ${err.message}`);
      logError("CHAT_E002", "model failed", { model: m, error: err.message });
    }
  }
  throw lastErr || new Error("no model configured");
}

function providers() {
  const list = [];
  if (process.env.GEMINI_API_KEY) {
    list.push(["gemini", (s, t) => askGemini(s, t)]);
  }
  if (process.env.GROQ_API_KEY) {
    list.push([
      "groq",
      (s, t) =>
        askOpenAICompatible(
          "https://api.groq.com/openai/v1/chat/completions",
          process.env.GROQ_API_KEY,
          process.env.GROQ_MODEL || "llama-3.1-8b-instant",
          s,
          t
        ),
    ]);
  }
  if (process.env.OPENROUTER_API_KEY) {
    list.push([
      "openrouter",
      (s, t) =>
        askOpenAICompatible(
          "https://openrouter.ai/api/v1/chat/completions",
          process.env.OPENROUTER_API_KEY,
          process.env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free,google/gemma-4-26b-a4b-it:free,nvidia/nemotron-3-super-120b-a12b:free",
          s,
          t
        ),
    ]);
  }
  return list;
}

const reply = (res, content, provider = "fallback") =>
  res
    .status(200)
    .setHeader("x-chat-provider", provider)
    .json({ choices: [{ message: { role: "assistant", content } }] });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "anonymous";
    const rl = getLimiter();
    if (rl) {
      try {
        const { success } = await rl.limit(`chat_${ip}`);
        if (!success) return res.status(429).json({ error: "Rate limit exceeded. Please try again later." });
      } catch (err) {
        // A dead rate limiter must never take the chatbot down.
        logError("CHAT_E004", "rate limiter unreachable, allowing request", { error: err.message });
      }
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

    // Only user/assistant turns from the browser are trusted; the system prompt is ours.
    let turns = (Array.isArray(body.messages) ? body.messages : [])
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))
      .slice(-MAX_TURNS);
    while (turns.length && turns[0].role !== "user") turns.shift();
    if (!turns.length) {
      logError("CHAT_E006", "no user message in request", { ip });
      return res.status(400).json({ error: "No user message" });
    }

    const system = buildSystemPrompt();
    const available = providers();
    if (!available.length) {
      logError("CHAT_E001", "no AI provider key configured (set GEMINI_API_KEY, GROQ_API_KEY or OPENROUTER_API_KEY)");
    }

    for (const [name, ask] of available) {
      try {
        const text = (await ask(system, turns)).trim();
        if (text) return reply(res, text, name);
      } catch (err) {
        logError("CHAT_E002", "provider failed", { provider: name, error: err.message });
      }
    }
    if (available.length) logError("CHAT_E003", "all providers failed", { tried: available.map(([n]) => n) });
    return reply(res, FALLBACK_TEXT);
  } catch (err) {
    logError("CHAT_E005", "unexpected error", { error: err.message });
    return reply(res, FALLBACK_TEXT);
  }
}
