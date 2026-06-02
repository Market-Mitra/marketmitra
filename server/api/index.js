import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "../config/db.js";
import contactRoutes from "../routes/contactRoutes.js";
import errorHandler from "../middleware/errorHandler.js";
import { apiLimiter } from "../middleware/rateLimiter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

await connectDB();

const app = express();

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

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "Market Mitra API 🚀",
  });
});

app.get("/api/health", (_, res) => {
  res.json({
    success: true,
    uptime: process.uptime(),
  });
});

app.use("/api/contact", contactRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

app.use(errorHandler);

export default app;
