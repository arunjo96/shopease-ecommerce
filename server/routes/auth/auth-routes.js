
import { Router } from "express";
import { registerUser, loginUser, logoutUser, checkAuthController } from "../../controllers/auth/auth-controller.js";
import { protect } from "../../middleware/authMiddleware.js";

const authrouter = Router();


authrouter.post("/register", registerUser);
authrouter.post("/login", loginUser);


authrouter.post("/logout", protect, logoutUser);
authrouter.get("/check-auth", protect, checkAuthController);

export default authrouter;
