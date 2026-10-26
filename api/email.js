import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";

const escapeHtml = (v) =>
  String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Limit: 2 emails per IP per 5 minutes (only when Upstash is configured)
let limiter = null;
function getLimiter() {
  if (limiter || !process.env.UPSTASH_REDIS_REST_URL) return limiter;
  limiter = new Ratelimit({
    redis: new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(2, "5 m"),
  });
  return limiter;
}

// Every failure is logged as "[EMAIL_Exxx] message {details}" so you can search Vercel logs for "EMAIL_E".
//   EMAIL_E001 RESEND_API_KEY missing              EMAIL_E002 form data invalid (details show which field)
//   EMAIL_E003 rate limiter (Upstash) unreachable - request allowed anyway
//   EMAIL_E004 Resend rejected the email (details hold Resend's reason)
//   EMAIL_E005 unexpected crash
const logError = (code, msg, details = {}) => console.error(`[${code}] ${msg} ${JSON.stringify(details)}`);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    logError("EMAIL_E001", "RESEND_API_KEY is not set in Vercel environment variables");
    return res.status(500).json({ error: "Email service is not configured." });
  }

  try {
    const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "anonymous";
    const rl = getLimiter();
    if (rl) {
      try {
        const { success } = await rl.limit(`email_${ip}`);
        if (!success) {
          return res.status(429).json({
            error: "When doing something innovative why be in such a rush? Let's just wait, rethink, and send another mail in 5 minutes.",
          });
        }
      } catch (err) {
        // A dead rate limiter must never stop real messages.
        logError("EMAIL_E003", "rate limiter unreachable, allowing request", { error: err.message });
      }
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const name = String(body.name || "").trim().slice(0, 100);
    const email = String(body.email || "").trim().slice(0, 200);
    const message = String(body.message || "").trim().slice(0, 5000);

    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      logError("EMAIL_E002", "invalid form data", { hasName: !!name, hasMessage: !!message, hasEmail: !!email });
      return res.status(400).json({ error: "Please provide a name, a valid email and a message." });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.EMAIL_USER || "anindosaha16@gmail.com",
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
    });

    if (error) {
      logError("EMAIL_E004", "Resend rejected the email", { name: error.name, message: error.message, statusCode: error.statusCode });
      return res.status(502).json({ error: "Could not send the email right now. Please try again later." });
    }
    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    logError("EMAIL_E005", "unexpected error", { error: err.message });
    return res.status(500).json({ error: "Something went wrong while sending your message." });
  }
}
