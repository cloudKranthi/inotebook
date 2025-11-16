import rateLimit from "../config/upstash.js";

export  default async function RateLimitter(req, res, next) {
  try {
    const ip = req.ip;
    const { success } = await rateLimit.limit(ip);

    if (!success) {
      return res.status(429).json({ message: "Too many requests" });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
