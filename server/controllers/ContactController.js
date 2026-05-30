import Contact from "../models/Contact.js";
import { sendContactNotification, sendAutoReply } from "../utils/sendEmail.js";

// POST /api/contact
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message, service } = req.body;

    if (!name || !email || !subject || !message || !service)
      return res
        .status(400)
        .json({
          success: false,
          message: "All required fields must be filled.",
        });

    if (!/^\S+@\S+\.\S+$/.test(email))
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email." });

    // Save to DB
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      service,
      ipAddress: req.ip,
    });

    // Send both emails concurrently
    const [notif, reply] = await Promise.allSettled([
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

    if (notif.status === "rejected")
      console.error("Team email failed:", notif.reason);
    if (reply.status === "rejected")
      console.error("Auto-reply failed:", reply.reason);

    res.status(201).json({
      success: true,
      message: "Message received! We'll get back to you within 24 hours.",
      id: contact._id,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/contact — admin
export const getAllContacts = async (req, res, next) => {
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
    next(err);
  }
};

// PATCH /api/contact/:id/status — admin
export const updateStatus = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true },
    );
    if (!contact)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};
