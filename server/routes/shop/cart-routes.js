
import { Router } from "express";
import {
  addToCart,
  fetchCartItems,
  deleteCartItem,
  updateCartItemQty,
} from "../../controllers/shop/cart-controller.js";
import { protect } from "../../middleware/authMiddleware.js";
const cartRouter = Router();

cartRouter.post("/add", protect, addToCart);
cartRouter.get("/get/:userId", protect, fetchCartItems);
cartRouter.put("/update-cart", protect, updateCartItemQty);
cartRouter.delete("/:userId/:productId", protect, deleteCartItem);

export default cartRouter;
