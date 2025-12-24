

// import axios from "axios";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = {
//   // cartItems: [],
//   // isLoading: false,
//    cartItems: {
//     _id: null,
//     items: [],
//   },
//   isLoading: false,
// };

// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async ({ userId, productId, quantity }) => {
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_URL}/api/shop/cart/add`,
//       {
//         userId,
//         productId,
//         quantity,
//       }
//     );

//     return response.data;
//   }
// );

// export const fetchCartItems = createAsyncThunk(
//   "cart/fetchCartItems",
//   async (userId) => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`
//     );

//     return response.data;
//   }
// );

// export const deleteCartItem = createAsyncThunk(
//   "cart/deleteCartItem",
//   async ({ userId, productId }) => {
//     const response = await axios.delete(
//       `${import.meta.env.VITE_API_URL}/api/shop/cart/${userId}/${productId}`
//     );

//     return response.data;
//   }
// );

// export const updateCartQuantity = createAsyncThunk(
//   "cart/updateCartQuantity",
//   async ({ userId, productId, quantity }) => {
//     const response = await axios.put(
//       `${import.meta.env.VITE_API_URL}/api/shop/cart/update-cart`,
//       {
//         userId,
//         productId,
//         quantity,
//       }
//     );

//     return response.data;
//   }
// );

// const shoppingCartSlice = createSlice({
//   name: "shoppingCart",
//   initialState,
//   reducers: {
//     clearCart: (state) => { state.cartItems = { _id: null, items: [] }; },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCartItems.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.cartItems = action.payload?.data || { _id: null, items: [] };
//       })
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.cartItems = action.payload?.data || state.cartItems;
//       })
//       .addCase(updateCartQuantity.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.cartItems = action.payload?.data || state.cartItems;
//       })
//       .addCase(deleteCartItem.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.cartItems = action.payload?.data || { _id: null, items: [] };
//       })
//       .addMatcher(
//         (action) => action.type.endsWith("/pending"),
//         (state) => { state.isLoading = true; }
//       )
//       .addMatcher(
//         (action) => action.type.endsWith("/rejected"),
//         (state) => { state.isLoading = false; }
//       );
//   },
// });

// export const { clearCart } = shoppingCartSlice.actions;

// export default shoppingCartSlice.reducer;


// src/store/cart/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api"; 
const initialState = {
  cartItems: {
    _id: null,
    items: [],
  },
  isLoading: false,
};

/* ---------------- ADD TO CART ---------------- */
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }) => {
    const response = await api.post("/api/shop/cart/add", { productId, quantity });
    return response.data; // backend returns { success, data: cart }
  }
);

/* ---------------- FETCH CART ---------------- */
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await api.get("/api/shop/cart/get/${userId}");
    return response.data; // backend returns { success, data: cart }
  }
);

/* ---------------- UPDATE QTY ---------------- */
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ productId, quantity }) => {
    const response = await api.put("/api/shop/cart/update-cart", { productId, quantity });
    return response.data;
  }
);

/* ---------------- DELETE ITEM ---------------- */
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({userId, productId}) => {
    const response = await api.delete(`/api/shop/cart/${userId}/${productId}`);
    return response.data;
  }
);

/* ---------------- SLICE ---------------- */
const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = { _id: null, items: [] };
    },
  },
  extraReducers: (builder) => {
  // FULFILLED CASES FIRST
  builder.addCase(addToCart.fulfilled, (state, action) => {
    state.isLoading = false;
    state.cartItems = action.payload.data || { _id: null, items: [] };
  });
  builder.addCase(fetchCartItems.fulfilled, (state, action) => {
    state.isLoading = false;
    state.cartItems = action.payload.data || { _id: null, items: [] };
  });
  builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
    state.isLoading = false;
    state.cartItems = action.payload.data || state.cartItems;
  });
  builder.addCase(deleteCartItem.fulfilled, (state, action) => {
    state.isLoading = false;
    state.cartItems = action.payload.data || { _id: null, items: [] };
  });

  // MATCHERS LAST
  builder.addMatcher(
    (action) => action.type.endsWith("/pending"),
    (state) => { state.isLoading = true; }
  );
  builder.addMatcher(
    (action) => action.type.endsWith("/rejected"),
    (state) => { state.isLoading = false; }
  );
}

});

export const { clearCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
