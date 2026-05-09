import { createClient } from '@supabase/supabase-js';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
// Only create client if env vars exist
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(15, "1 m"), // 15 live chat msgs per minute
});

export default async function handler(req, res) {
  if (!supabase) {
    return res.status(500).json({ error: "Supabase credentials missing" });
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('live_chat')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
      
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'anonymous';
    
    if (process.env.UPSTASH_REDIS_REST_URL) {
      const { success } = await ratelimit.limit(`livechat_${ip}`);
      if (!success) {
        return res.status(429).json({ error: "Too many messages. Slow down!" });
      }
    }

    const { userAlias, message, type } = req.body;
    
    const { data, error } = await supabase
      .from('live_chat')
      .insert([{ user_alias: userAlias, message, type }])
      .select();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
