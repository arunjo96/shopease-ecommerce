

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   approvalURL: null,
//   isLoading: false,
//   orderId: null,
//   orderList: [],
//   orderDetails: null,
// };


// export const createNewOrder = createAsyncThunk(
//   "/order/createNewOrder",
//   async (orderData) => {
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_URL}/api/shop/order/stripe/create-checkout`,
//       orderData,
//       {
//         withCredentials: true,
//       }
//     );
//     return response.data;
//   }
// );


// export const capturePayment = createAsyncThunk(
//   "/order/capturePayment",
//   async ({ session_id, orderId }) => {
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_URL}/api/shop/order/stripe/success`,
//       { session_id, orderId },
//       { withCredentials: true }
//     );
//     return response.data;
//   }
// );


// export const cancelPayment = createAsyncThunk(
//   "/order/cancelPayment",
//   async (orderId) => {
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_URL}/api/shop/order/stripe/cancel`,
//       { orderId },
//       { withCredentials: true }
//     );
//     return response.data;
//   }
// );


// export const getAllOrdersByUserId = createAsyncThunk(
//   "/order/getAllOrdersByUserId",
//   async (userId) => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`,
//       { withCredentials: true }
//     );
//     return response.data;
//   }
// );

// export const getOrderDetails = createAsyncThunk(
//   "/order/getOrderDetails",
//   async (id) => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/shop/order/details/${id}`,
//       { withCredentials: true }
//     );
//     return response.data;
//   }
// );


// const shoppingOrderSlice = createSlice({
//   name: "shoppingOrderSlice",
//   initialState,
//   reducers: {
//     resetOrderDetails: (state) => {
//       state.orderDetails = null;
//     },
//     resetCheckoutURL: (state) => {
//       state.approvalURL = null;
//       state.orderId = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       /* CREATE ORDER */
//       .addCase(createNewOrder.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(createNewOrder.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.approvalURL = action.payload.checkoutURL;
//         state.orderId = action.payload.orderId;

//         sessionStorage.setItem(
//           "currentOrderId",
//           JSON.stringify(action.payload.orderId)
//         );
//       })
//       .addCase(createNewOrder.rejected, (state) => {
//         state.isLoading = false;
//         state.approvalURL = null;
//         state.orderId = null;
//       })

//       /* PAYMENT SUCCESS */
//       .addCase(capturePayment.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(capturePayment.fulfilled, (state) => {
//         state.isLoading = false;
//         state.approvalURL = null;
//         state.orderId = null;
//       })
//       .addCase(capturePayment.rejected, (state) => {
//         state.isLoading = false;
//       })

//       /* PAYMENT CANCEL */
//       .addCase(cancelPayment.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(cancelPayment.fulfilled, (state) => {
//         state.isLoading = false;
//         state.approvalURL = null;
//         state.orderId = null;
//       })
//       .addCase(cancelPayment.rejected, (state) => {
//         state.isLoading = false;
//       })

//       /* ORDER LIST */
//       .addCase(getAllOrdersByUserId.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.orderList = action.payload.data;
//       })
//       .addCase(getAllOrdersByUserId.rejected, (state) => {
//         state.isLoading = false;
//         state.orderList = [];
//       })

//       /* ORDER DETAILS */
//       .addCase(getOrderDetails.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getOrderDetails.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.orderDetails = action.payload.data;
//       })
//       .addCase(getOrderDetails.rejected, (state) => {
//         state.isLoading = false;
//         state.orderDetails = null;
//       });
//   },
// });

// export const { resetOrderDetails, resetCheckoutURL } =
//   shoppingOrderSlice.actions;

// export default shoppingOrderSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api"; 

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

/* ---------------- CREATE ORDER ---------------- */
export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderData) => {
    const response = await api.post("/api/shop/order/stripe/create-checkout", orderData);
    return response.data;
  }
);

/* ---------------- CAPTURE PAYMENT ---------------- */
export const capturePayment = createAsyncThunk(
  "order/capturePayment",
  async ({ session_id, orderId }) => {
    const response = await api.post("/api/shop/order/stripe/success", { session_id, orderId });
    return response.data;
  }
);

/* ---------------- CANCEL PAYMENT ---------------- */
export const cancelPayment = createAsyncThunk(
  "order/cancelPayment",
  async (orderId) => {
    const response = await api.post("/api/shop/order/stripe/cancel", { orderId });
    return response.data;
  }
);

/* ---------------- GET ALL ORDERS ---------------- */
export const getAllOrdersByUserId = createAsyncThunk(
  "order/getAllOrdersByUserId",
  async (userId) => {
    const response = await api.get(`/api/shop/order/list/${userId}`);
    return response.data;
  }
);

/* ---------------- GET ORDER DETAILS ---------------- */
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id) => {
    const response = await api.get(`/api/shop/order/details/${id}`);
    return response.data;
  }
);

/* ---------------- SLICE ---------------- */
const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
    resetCheckoutURL: (state) => {
      state.approvalURL = null;
      state.orderId = null;
    },
  },
  extraReducers: (builder) => {
    /* CREATE ORDER */
    builder.addCase(createNewOrder.pending, (state) => { state.isLoading = true; });
    builder.addCase(createNewOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.approvalURL = action.payload.checkoutURL;
      state.orderId = action.payload.orderId;
      sessionStorage.setItem("currentOrderId", JSON.stringify(action.payload.orderId));
    });
    builder.addCase(createNewOrder.rejected, (state) => {
      state.isLoading = false;
      state.approvalURL = null;
      state.orderId = null;
    });

    /* CAPTURE PAYMENT */
    builder.addCase(capturePayment.pending, (state) => { state.isLoading = true; });
    builder.addCase(capturePayment.fulfilled, (state) => {
      state.isLoading = false;
      state.approvalURL = null;
      state.orderId = null;
    });
    builder.addCase(capturePayment.rejected, (state) => { state.isLoading = false; });

    /* CANCEL PAYMENT */
    builder.addCase(cancelPayment.pending, (state) => { state.isLoading = true; });
    builder.addCase(cancelPayment.fulfilled, (state) => {
      state.isLoading = false;
      state.approvalURL = null;
      state.orderId = null;
    });
    builder.addCase(cancelPayment.rejected, (state) => { state.isLoading = false; });

    /* ORDER LIST */
    builder.addCase(getAllOrdersByUserId.pending, (state) => { state.isLoading = true; });
    builder.addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderList = action.payload.data;
    });
    builder.addCase(getAllOrdersByUserId.rejected, (state) => {
      state.isLoading = false;
      state.orderList = [];
    });

    /* ORDER DETAILS */
    builder.addCase(getOrderDetails.pending, (state) => { state.isLoading = true; });
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderDetails = action.payload.data;
    });
    builder.addCase(getOrderDetails.rejected, (state) => {
      state.isLoading = false;
      state.orderDetails = null;
    });
  },
});

export const { resetOrderDetails, resetCheckoutURL } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
