
import {Router} from "express";
import {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} from "../../controllers/admin/products-controller.js";
import { upload } from "../../helpers/cloudinary.js";

const adminProductRouter = Router();

adminProductRouter.post("/upload-image", upload.single("my_file"), handleImageUpload);
adminProductRouter.post("/add", addProduct);
adminProductRouter.put("/edit/:id", editProduct);
adminProductRouter.delete("/delete/:id", deleteProduct);
adminProductRouter.get("/get", fetchAllProducts);

export default adminProductRouter;
