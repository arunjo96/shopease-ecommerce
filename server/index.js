
import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./helpers/Db.js";

import authRouter from "./routes/auth/auth-routes.js";
import adminProductRouter from "./routes/admin/products-routes.js";
import adminOrderRouter from "./routes/admin/order-routes.js";
import productsRouter from "./routes/shop/products-routes.js";
import cartRouter from "./routes/shop/cart-routes.js";
import addressRouter from "./routes/shop/address-routes.js";
import orderRouter from "./routes/shop/order-routes.js";
import reviewRouter from "./routes/shop/review-routes.js";
import featureRouter from "./routes/common/feature-routes.js";
import searchRouter from "./routes/shop/search-routes.js";
import errorHandler from "./middleware/errorHandler.js";

// Connect DB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);



app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", productsRouter);
app.use("/api/shop/cart", cartRouter);
app.use("/api/shop/address", addressRouter);
app.use("/api/shop/order", orderRouter);
app.use("/api/shop/search", searchRouter);
app.use("/api/shop/review", reviewRouter);

app.use("/api/common/feature", featureRouter);

app.use(errorHandler);



// Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
