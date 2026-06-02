import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimiter.js";

dotenv.config({ path: "../.env" });

const app = express();

// ── Middleware ───────────────────────────────────────────
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

// ── DB connect (cached for serverless) ───────────────────
let isConnected = false;
const connectOnce = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};
connectOnce();

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

// ── Local dev only ────────────────────────────────────────
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`✅ Server running on http://localhost:${PORT}`),
  );
}

// ── Export for Vercel serverless ──────────────────────────
export default app;
