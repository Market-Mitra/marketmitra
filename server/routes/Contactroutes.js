import express from "express";
import {
  submitContact,
  getAllContacts,
  updateStatus,
} from "../controllers/contactController.js";
import { contactLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();
router.post("/", contactLimiter, submitContact);
router.get("/", getAllContacts);
router.patch("/:id/status", updateStatus);
export default router;
