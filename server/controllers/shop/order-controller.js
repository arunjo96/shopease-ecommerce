

import stripe from "../../helpers/stripe.js"; 
import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

export const createStripeCheckoutSession = async (req, res) => {
  try {
    const { userId, cartItems, addressInfo, totalAmount, cartId } = req.body;

    const order = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: "pending",
      paymentMethod: "stripe",
      paymentStatus: "pending",
      totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    });

    await order.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.image],
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.CLIENT_BASE_URL}/shop/payment-success?session_id={CHECKOUT_SESSION_ID}&orderId=${order._id}`,
      cancel_url: `${process.env.CLIENT_BASE_URL}/shop/payment-cancel`,
    });

    order.stripeSessionId = session.id;
    await order.save();

    res.status(200).json({
      success: true,
      checkoutURL: session.url,
      orderId: order._id,
    });
  } catch (err) {
    console.error("❌ Create Checkout Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const stripePaymentSuccess = async (req, res) => {
  try {
    const { session_id, orderId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ success: false });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    
    if (order.paymentStatus === "paid") {
      return res.status(200).json({ success: true });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.orderUpdateDate = new Date();

    
    for (const item of order.cartItems) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.totalStock -= item.quantity;
        await product.save();
      }
    }

 
    await Cart.findOneAndUpdate(
      { userId: order.userId },
      { items: [] }
    );

    await order.save();

    res.status(200).json({ success: true });
  } catch (err) {
    console.error( err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const stripePaymentCancel = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (order) {
      order.paymentStatus = "cancelled";
      order.orderStatus = "cancelled";
      order.orderUpdateDate = new Date();
      await order.save();
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error( err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAllOrdersByUserId = async (req, res) => {
  try {
    // const { userId } = req.params;
    const userId = req.params.userId || req.user.id;

    

    const orders = await Order.find({ userId }).sort({ orderDate: -1 });

  

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    console.error( err);
    res.status(500).json({ success: false, error: err.message });
  }
};


export const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;



    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }



    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    console.error( err);
    res.status(500).json({ success: false, error: err.message });
  }
};

