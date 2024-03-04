import express from "express";
const router = express.Router();
import { isAuthenticatedUser } from "../middlewares/authRoutes.js";

import {
  stripeCheckoutSession,
  stripeWebhook,
} from "../controllers/paymentController.js";

router.post(
  "/payment/checkout_session",
  isAuthenticatedUser,
  stripeCheckoutSession,
);
router.post("/payment/webhook", stripeWebhook);

export default router;
