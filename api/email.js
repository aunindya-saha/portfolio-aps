import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Limit: 2 emails per IP per 5 minutes
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(2, "5 m"),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'anonymous';
    
    if (process.env.UPSTASH_REDIS_REST_URL) {
      const { success } = await ratelimit.limit(`email_${ip}`);
      if (!success) {
        return res.status(429).json({ 
          error: "When doing something innovative why be in such a rush? Let's just wait, rethink, and send another mail in 5 minutes." 
        });
      }
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name, email, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.EMAIL_USER || 'anindosaha16@gmail.com',
      subject: 'New Contact',
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`
    });

    if (error) {
      return res.status(400).json({ error: error.message || "Email failed to send" });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Email API Error:", error);
    return res.status(400).json({ error: error.message });
  }
}
