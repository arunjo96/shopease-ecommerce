

import { Router } from "express";
import {
  createStripeCheckoutSession,
  stripePaymentSuccess,
  stripePaymentCancel,
  getAllOrdersByUserId,
  getOrderDetails
} from "../../controllers/shop/order-controller.js";
import { protect } from "../../middleware/authMiddleware.js";


const orderRouter = Router();

orderRouter.post("/stripe/create-checkout", protect, createStripeCheckoutSession);
orderRouter.post("/stripe/success", protect, stripePaymentSuccess);
orderRouter.post("/stripe/cancel", protect, stripePaymentCancel);
orderRouter.get("/list/:userId", protect, getAllOrdersByUserId);
orderRouter.get("/details/:id", protect, getOrderDetails);

export default orderRouter;
