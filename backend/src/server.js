import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ES modules safe __dirname
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// 1️⃣ Rate limiter (async-safe)
//app.use(rateLimiter);

// 2️⃣ API routes
app.use("/api/notes", notesRoutes);

// 3️⃣ Serve static files from Vite build
const distPath = path.join(__dirname, "..", "frontend", "vite-project", "dist");
app.use(express.static(distPath));

// 4️⃣ SPA fallback for React Router
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Start server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("🚀 Server started on PORT:", PORT);
  });
});
