import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

// 1. Ensure dotenv is called before variables are accessed
dotenv.config(); 

// 2. Pass the environment variables directly to the Redis constructor
// This ensures the client uses the variables you defined.
const upstashRedisClient = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const rateLimit = new Ratelimit({
  // Use the directly configured client
  redis: upstashRedisClient, 
  // 10 requests per 20s
  limiter: Ratelimit.slidingWindow(100, "60 s"), 
});

export default rateLimit;