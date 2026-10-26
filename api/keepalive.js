import { createClient } from "@supabase/supabase-js";
import { Redis } from "@upstash/redis";

// Called on a schedule by Vercel Cron (see vercel.json) so that free-tier backends
// (Supabase pauses after ~7 idle days, Upstash after long inactivity) never go to sleep.
export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const result = { at: new Date().toISOString() };

  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (url && key) {
    try {
      const supabase = createClient(url, key);
      // Any request to the REST API counts as activity; a missing table still reaches the database layer.
      const { error } = await supabase.from("live_messages").select("id", { head: true, count: "exact" }).limit(1);
      result.supabase = error ? `reached (query error: ${error.message})` : "ok";
    } catch (err) {
      result.supabase = `failed: ${err.message}`;
    }
  } else {
    result.supabase = "skipped (env missing)";
  }

  if (process.env.UPSTASH_REDIS_REST_URL) {
    try {
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      result.redis = await redis.ping();
    } catch (err) {
      result.redis = `failed: ${err.message}`;
    }
  } else {
    result.redis = "skipped (env missing)";
  }

  return res.status(200).json(result);
}
