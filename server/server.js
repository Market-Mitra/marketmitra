import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import { Resend } from "resend";

dotenv.config();

const app = express();

// ── CORS ──────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL, // e.g. https://marketmitra-kappa.vercel.app
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Handle OPTIONS preflight for all routes
app.options("*", cors());

// ── Middleware ────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ── Rate limiters ─────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many submissions. Please try again later.",
  },
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

// ── MongoDB ───────────────────────────────────────────────
let dbConnected = false;

const connectDB = async () => {
  if (dbConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "market-mitra" });
    dbConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err.message);
  }
};

// ── Contact model ─────────────────────────────────────────
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    service: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "read", "replied", "closed"],
      default: "new",
    },
    ipAddress: { type: String },
  },
  { timestamps: true },
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

// ── Email ─────────────────────────────────────────────────
const getResend = () => new Resend(process.env.RESEND_API_KEY);

const sendContactNotification = async ({
  name,
  email,
  phone,
  subject,
  message,
  service,
}) => {
  const resend = getResend();
  await resend.emails.send({
    from: "Market Mitra <onboarding@resend.dev>",
    to: "contactmarketmitra@gmail.com",
    subject: `📬 New Enquiry [${service}] — ${name}`,
    html: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d1b2e;border-radius:12px;overflow:hidden;color:#F4F3EF;">
      <div style="background:linear-gradient(135deg,#1A2E4A,#0f1f35);padding:28px 32px;border-bottom:1px solid rgba(255,255,255,0.07);">
        <table width="100%"><tr>
          <td><span style="font-size:20px;font-weight:700;color:#F5A623;">Market</span><span style="font-size:20px;font-weight:700;color:#F4F3EF;">मित्र</span></td>
          <td align="right"><span style="background:#1D9E75;color:#fff;font-size:11px;font-weight:600;padding:4px 10px;border-radius:20px;">New Lead</span></td>
        </tr></table>
      </div>
      <div style="padding:32px;">
        ${[
          ["👤 Name", name],
          [
            "📧 Email",
            `<a href="mailto:${email}" style="color:#F5A623;">${email}</a>`,
          ],
          ["📞 Phone", phone || "—"],
          ["🛠 Service", service],
          ["📌 Subject", subject],
        ]
          .map(
            ([l, v]) =>
              `<table width="100%" style="margin-bottom:12px;"><tr><td width="120" style="font-size:11px;color:rgba(244,243,239,0.4);text-transform:uppercase;">${l}</td><td style="font-size:14px;color:#F4F3EF;">${v}</td></tr></table>`,
          )
          .join("")}
        <div style="background:rgba(255,255,255,0.03);border-left:3px solid #1D9E75;padding:16px 20px;margin-top:16px;border-radius:0 8px 8px 0;">
          <p style="margin:0 0 6px;font-size:11px;color:rgba(244,243,239,0.35);text-transform:uppercase;">Message</p>
          <p style="margin:0;font-size:14px;color:rgba(244,243,239,0.8);line-height:1.75;">${message}</p>
        </div>
        <div style="margin-top:24px;text-align:center;">
          <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;background:#F5A623;color:#1A2E4A;font-weight:700;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none;">Reply to ${name.split(" ")[0]} →</a>
        </div>
      </div>
      <div style="padding:12px 32px;background:rgba(0,0,0,0.25);text-align:center;">
        <p style="margin:0;font-size:11px;color:rgba(244,243,239,0.2);">MarketMitra · Nagpur, Maharashtra</p>
      </div>
    </div>`,
  });
};

const sendAutoReply = async ({ name, email, message, service }) => {
  const resend = getResend();
  await resend.emails.send({
    from: "Market Mitra <onboarding@resend.dev>",
    to: email,
    subject: `We got your message, ${name.split(" ")[0]}! 🙌 — Market Mitra`,
    html: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d1b2e;border-radius:12px;overflow:hidden;color:#F4F3EF;">
      <div style="background:linear-gradient(135deg,#1A2E4A,#0f1f35);padding:28px 32px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.07);">
        <p style="margin:0;font-size:22px;font-weight:700;"><span style="color:#F5A623;">Market</span><span style="color:#F4F3EF;">मित्र</span></p>
        <p style="margin:4px 0 0;font-size:12px;color:rgba(244,243,239,0.35);font-style:italic;">Growth feels better with a friend</p>
      </div>
      <div style="padding:36px 32px;">
        <h2 style="margin:0 0 12px;font-size:20px;color:#F4F3EF;">Hey ${name.split(" ")[0]}, thanks for reaching out! 👋</h2>
        <p style="margin:0 0 20px;font-size:14px;color:rgba(244,243,239,0.55);line-height:1.8;">
          We've received your enquiry about <strong style="color:#F5A623;">${service}</strong> and our team will get back to you within <strong style="color:#1D9E75;">24 hours</strong>.
        </p>
        <div style="background:rgba(29,158,117,0.07);border:1px solid rgba(29,158,117,0.18);border-radius:10px;padding:18px 20px;margin-bottom:24px;">
          <p style="margin:0 0 6px;font-size:11px;color:rgba(244,243,239,0.35);text-transform:uppercase;">Your message</p>
          <p style="margin:0;font-size:14px;color:rgba(244,243,239,0.7);line-height:1.75;font-style:italic;">"${message}"</p>
        </div>
        <p style="margin:0 0 14px;font-size:14px;color:rgba(244,243,239,0.45);">Want to talk sooner?</p>
        <a href="https://marketmitra.in/book" style="display:inline-block;background:#F5A623;color:#1A2E4A;font-weight:700;font-size:14px;padding:13px 28px;border-radius:8px;text-decoration:none;">📅 Book a Free 30-Min Call</a>
      </div>
      <div style="padding:12px 32px;background:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.05);">
        <p style="margin:0;font-size:11px;color:rgba(244,243,239,0.25);text-align:center;">contactmarketmitra@gmail.com · Nagpur, Maharashtra</p>
      </div>
    </div>`,
  });
};

// ── Health ────────────────────────────────────────────────
app.get("/", (_, res) =>
  res.json({ success: true, message: "Market Mitra API 🚀" }),
);
app.get("/api/health", (_, res) =>
  res.json({ success: true, uptime: process.uptime() }),
);

// ── POST /api/contact ─────────────────────────────────────
app.post("/api/contact", contactLimiter, async (req, res) => {
  await connectDB();
  const { name, email, phone, subject, message, service } = req.body;

  if (!name || !email || !subject || !message || !service)
    return res
      .status(400)
      .json({ success: false, message: "All required fields must be filled." });

  if (!/^\S+@\S+\.\S+$/.test(email))
    return res
      .status(400)
      .json({ success: false, message: "Please enter a valid email." });

  try {
    await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      service,
      ipAddress: req.ip,
    });

    await Promise.allSettled([
      sendContactNotification({
        name,
        email,
        phone,
        subject,
        message,
        service,
      }),
      sendAutoReply({ name, email, message, service }),
    ]);

    res.status(201).json({
      success: true,
      message: "Message received! We'll get back to you within 24 hours.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again.",
    });
  }
});

// ── GET /api/contact (admin) ──────────────────────────────
app.get("/api/contact", async (req, res) => {
  await connectDB();
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Contact.countDocuments(filter);
    res.json({
      success: true,
      data: contacts,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── PATCH /api/contact/:id/status ────────────────────────
app.patch("/api/contact/:id/status", async (req, res) => {
  await connectDB();
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );
    if (!contact)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── 404 ──────────────────────────────────────────────────
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Local dev ─────────────────────────────────────────────
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server on http://localhost:${PORT}`));
}

export default app;
