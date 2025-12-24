// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   isLoading: false,
//   productList: [],
//   productDetails: null,
// };

// export const fetchAllFilteredProducts = createAsyncThunk(
//   "/products/fetchAllProducts",
//   async ({ filterParams, sortParams }) => {

//     const query = new URLSearchParams({
//       ...filterParams,
//       sortBy: sortParams,
//     });

//     const result = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
//     );

//     // console.log(result.data, "API RESULT");

//     return result?.data;
//   }
// );

// export const fetchProductDetails = createAsyncThunk(
//   "/products/fetchProductDetails",
//   async (id) => {
//     const result = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`
//     );

//     return result?.data;
//   }
// );

// const shoppingProductSlice = createSlice({
//   name: "shoppingProducts",
//   initialState,
//   reducers: {
//     setProductDetails: (state) => {
//       state.productDetails = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllFilteredProducts.pending, (state, action) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.productList = action.payload?.data || [];
//       })
//       .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
//         state.isLoading = false;
//         state.productList = [];
//       })
//       .addCase(fetchProductDetails.pending, (state, action) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchProductDetails.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.productDetails = action.payload.data;
//       })
//       .addCase(fetchProductDetails.rejected, (state, action) => {
//         state.isLoading = false;
//         state.productDetails = null;
//       });
//   },
// });

// export const { setProductDetails } = shoppingProductSlice.actions;

// export default shoppingProductSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api"; 

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

/* ---------------- FETCH FILTERED PRODUCTS ---------------- */
export const fetchAllFilteredProducts = createAsyncThunk(
  "products/fetchAllFilteredProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({ ...filterParams, sortBy: sortParams });
    const response = await api.get(`/api/shop/products/get?${query}`);
    return response.data;
  }
);

/* ---------------- FETCH PRODUCT DETAILS ---------------- */
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await api.get(`/api/shop/products/get/${id}`);
    return response.data;
  }
);

/* ---------------- SLICE ---------------- */
const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    /* FETCH FILTERED PRODUCTS */
    builder.addCase(fetchAllFilteredProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload.data || [];
    });
    builder.addCase(fetchAllFilteredProducts.rejected, (state) => {
      state.isLoading = false;
      state.productList = [];
    });

    /* FETCH PRODUCT DETAILS */
    builder.addCase(fetchProductDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productDetails = action.payload.data || null;
    });
    builder.addCase(fetchProductDetails.rejected, (state) => {
      state.isLoading = false;
      state.productDetails = null;
    });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;
