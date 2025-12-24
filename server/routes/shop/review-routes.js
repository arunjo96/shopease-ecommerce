

import { Router } from "express";
import {
  addProductReview,
  getProductReviews,
} from "../../controllers/shop/product-review-controller.js";
import { protect } from "../../middleware/authMiddleware.js";

const reviewRouter = Router();

reviewRouter.post("/add", protect, addProductReview);
reviewRouter.get("/:productId", protect, getProductReviews);

export default reviewRouter;
