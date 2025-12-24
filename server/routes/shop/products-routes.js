import { Router } from "express";
import {
  getFilteredProducts,
  getProductDetails,
} from "../../controllers/shop/products-controller.js";
import { protect } from "../../middleware/authMiddleware.js";

const productsRouter = Router();

productsRouter.get("/get", protect, getFilteredProducts);
productsRouter.get("/get/:id", protect, getProductDetails);

export default productsRouter;
