
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";


export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.json({ success: false, message: "User already exists!" });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ userName, email, password: hashPassword });
    await newUser.save();

    res.status(200).json({ success: true, message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "User does not exist!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Incorrect password!" });

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email, userName: user.userName },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

   
    const isProd = process.env.NODE_ENV === "production";

res.cookie("token", token, {
  httpOnly: true,
  secure: isProd,                       
  sameSite: isProd ? "none" : "lax",    
  path: "/",
  maxAge: 60 * 60 * 1000,
});


    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: { email: user.email, role: user.role, id: user._id, userName: user.userName },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const logoutUser = (req, res) => {
 const isProd = process.env.NODE_ENV === "production";

res.clearCookie("token", {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  path: "/",
}).json({ success: true, message: "Logged out successfully!" });

};


export const checkAuthController = (req, res) => {
  const user = req.user;
  res.status(200).json({ success: true, message: "Authenticated", user });
};

