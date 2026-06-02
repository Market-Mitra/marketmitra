import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import connectDB from "./config/db.js";

// Load env — Vercel injects env vars automatically in production
dotenv.config();

const app = express();

// ── Middleware ────────────────────────────────────────────
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      process.env.CLIENT_URL,
    ].filter(Boolean),
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use("/api", apiLimiter);

// ── DB — cached connection for serverless ─────────────────
let dbConnected = false;
const ensureDB = async () => {
  if (!dbConnected && process.env.MONGO_URI) {
    await connectDB();
    dbConnected = true;
  }
};
ensureDB().catch(console.error);

// ── Routes ────────────────────────────────────────────────
app.get("/", (_, res) =>
  res.json({ success: true, message: "Market Mitra API 🚀" }),
);
app.get("/api/health", (_, res) =>
  res.json({ success: true, uptime: process.uptime() }),
);
app.use("/api/contact", contactRoutes);

// ── 404 ──────────────────────────────────────────────────
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Error handler ─────────────────────────────────────────
app.use(errorHandler);

// ── Local dev ────────────────────────────────────────────
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`✅ Server running on http://localhost:${PORT}`),
  );
}

export default app;
