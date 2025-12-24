
import {Router} from "express";
import {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} from "../../controllers/shop/address-controller.js";
import { protect } from "../../middleware/authMiddleware.js";

const addressRouter = Router();

addressRouter.post("/add", protect, addAddress);
addressRouter.get("/get/:userId", protect, fetchAllAddress);
addressRouter.delete("/delete/:userId/:addressId", protect, deleteAddress);
addressRouter.put("/update/:userId/:addressId", protect, editAddress);

export default addressRouter;
