import rateLimit from "../config/upstash.js";

// Async wrapper to avoid PathError '*' in Express 5
export default function rateLimiter(req, res, next) {
  (async () => {
    try {
      const ip = req.ip;
      const { success } = await rateLimit.limit(ip);

      if (!success) {
        return res.status(429).json({ message: "Too many requests" });
      }

      next();
    } catch (err) {
      console.error("Rate limiter error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  })();
}
