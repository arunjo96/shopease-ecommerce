
//   import Cart from "../../models/Cart.js";
//   import Product from "../../models/Product.js";

//   export const addToCart = async (req, res) => {
//     try {
//       const { userId, productId, quantity } = req.body;

//       if (!userId || !productId || quantity <= 0) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid data provided!",
//         });
//       }

//       const product = await Product.findById(productId);

//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: "Product not found",
//         });
//       }

//       let cart = await Cart.findOne({ userId });

//       if (!cart) {
//         cart = new Cart({ userId, items: [] });
//       }

//       const findCurrentProductIndex = cart.items.findIndex(
//         (item) => item.productId.toString() === productId
//       );

//       if (findCurrentProductIndex === -1) {
//         cart.items.push({ productId, quantity });
//       } else {
//         cart.items[findCurrentProductIndex].quantity += quantity;
//       }

//       await cart.save();

//       res.status(200).json({
//         success: true,
//         data: cart,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         success: false,
//         message: "Error",
//       });
//     }
//   };

//   export const fetchCartItems = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     if (!userId) return res.status(400).json({ success: false, message: "User id is mandatory!" });

//     const cart = await Cart.findOne({ userId }).populate({
//       path: "items.productId",
//       select: "image title price SalePrice",
//     });

//     if (!cart) return res.status(200).json({ success: true, data: { _id: null, items: [] } });

 
//     cart.items = cart.items.filter((i) => i.productId);
//     await cart.save();

//     const populatedItems = cart.items.map((item) => ({
//       productId: item.productId._id,
//       image: item.productId.image,
//       title: item.productId.title,
//       price: item.productId.price,
//       SalePrice: item.productId.SalePrice,
//       quantity: item.quantity,
//     }));

//     res.status(200).json({ success: true, data: { ...cart._doc, items: populatedItems } });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Error fetching cart" });
//   }
// };

//   export const updateCartItemQty = async (req, res) => {
//     try {
//       const { userId, productId, quantity } = req.body;

//       if (!userId || !productId || quantity <= 0) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid data provided!",
//         });
//       }

//       const cart = await Cart.findOne({ userId });

//       if (!cart) {
//         return res.status(404).json({
//           success: false,
//           message: "Cart not found!",
//         });
//       }

//       const findCurrentProductIndex = cart.items.findIndex(
//         (item) => item.productId.toString() === productId
//       );

//       if (findCurrentProductIndex === -1) {
//         return res.status(404).json({
//           success: false,
//           message: "Cart item not present !",
//         });
//       }

//       cart.items[findCurrentProductIndex].quantity = quantity;
//       await cart.save();

//       await cart.populate({
//         path: "items.productId",
//         select: "image title price SalePrice",
//       });

//       const populateCartItems = cart.items.map((item) => ({
//         productId: item.productId ? item.productId._id : null,
//         image: item.productId ? item.productId.image : null,
//         title: item.productId ? item.productId.title : "Product not found",
//         price: item.productId ? item.productId.price : null,
//         SalePrice: item.productId ? item.productId.SalePrice : null,
//         quantity: item.quantity,
//       }));

//       res.status(200).json({
//         success: true,
//         data: {
//           ...cart._doc,
//           items: populateCartItems,
//         },
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         success: false,
//         message: "Error",
//       });
//     }
//   };

//   export const deleteCartItem = async (req, res) => {
//     try {
//       const { userId, productId } = req.params;

//       if (!userId || !productId) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid data provided!",
//         });
//       }

//       const cart = await Cart.findOne({ userId }).populate({
//         path: "items.productId",
//         select: "image title price SalePrice",
//       });

//       if (!cart) {
//         return res.status(404).json({
//           success: false,
//           message: "Cart not found!",
//         });
//       }

//       cart.items = cart.items.filter(
//         (item) => item.productId._id.toString() !== productId
//       );

//       await cart.save();

//       await cart.populate({
//         path: "items.productId",
//         select: "image title price SalePrice",
//       });

//       const populateCartItems = cart.items.map((item) => ({
//         productId: item.productId ? item.productId._id : null,
//         image: item.productId ? item.productId.image : null,
//         title: item.productId ? item.productId.title : "Product not found",
//         price: item.productId ? item.productId.price : null,
//         SalePrice: item.productId ? item.productId.SalePrice : null,
//         quantity: item.quantity,
//       }));

//       res.status(200).json({
//         success: true,
//         data: {
//           ...cart._doc,
//           items: populateCartItems,
//         },
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         success: false,
//         message: "Error",
//       });
//     }
//   };


import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

/* ---------------- ADD TO CART ---------------- */
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || quantity <= 0) {
      return res.status(400).json({ success: false, message: "Invalid data!" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const index = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[index].quantity += quantity;
    }

    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error" });
  }
};

/* ---------------- FETCH CART ---------------- */
export const fetchCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price SalePrice",
    });

    if (!cart) {
      return res.status(200).json({
        success: true,
        data: { _id: null, items: [] },
      });
    }

    const items = cart.items
      .filter((i) => i.productId)
      .map((item) => ({
        productId: item.productId._id,
        image: item.productId.image,
        title: item.productId.title,
        price: item.productId.price,
        SalePrice: item.productId.SalePrice,
        quantity: item.quantity,
      }));

    res.status(200).json({
      success: true,
      data: { ...cart._doc, items },
    });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error fetching cart" });
  }
};

/* ---------------- UPDATE QTY ---------------- */
export const updateCartItemQty = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error" });
  }
};

/* ---------------- DELETE ITEM ---------------- */
export const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => i.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error" });
  }
};
