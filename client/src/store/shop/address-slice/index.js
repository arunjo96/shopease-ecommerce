// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   isLoading: false,
//   addressList: [],
// };

// export const addNewAddress = createAsyncThunk(
//   "/addresses/addNewAddress",
//   async (formData) => {
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_URL}/api/shop/address/add`,
//       formData
//     );

//     return response.data;
//   }
// );

// export const fetchAllAddresses = createAsyncThunk(
//   "/addresses/fetchAllAddresses",
//   async (userId) => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_URL}0/api/shop/address/get/${userId}`
//     );

//     return response.data;
//   }
// );

// export const editaAddress = createAsyncThunk(
//   "/addresses/editaAddress",
//   async ({ userId, addressId, formData }) => {
//     const response = await axios.put(
//       `${import.meta.env.VITE_API_URL}/api/shop/address/update/${userId}/${addressId}`,
//       formData
//     );

//     return response.data;
//   }
// );

// export const deleteAddress = createAsyncThunk(
//   "/addresses/deleteAddress",
//   async ({ userId, addressId }) => {
//     const response = await axios.delete(
//       `${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`
//     );

//     return response.data;
//   }
// );

// const addressSlice = createSlice({
//   name: "address",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(addNewAddress.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(addNewAddress.fulfilled, (state, action) => {
//         state.isLoading = false;
//       })
//       .addCase(addNewAddress.rejected, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(fetchAllAddresses.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchAllAddresses.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.addressList = action.payload.data;
//       })
//       .addCase(fetchAllAddresses.rejected, (state) => {
//         state.isLoading = false;
//         state.addressList = [];
//       });
//   },
// });

// export default addressSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

const initialState = {
  isLoading: false,
  addressList: [],
};

/* ---------------- ADD ADDRESS ---------------- */
export const addNewAddress = createAsyncThunk(
  "address/addNewAddress",
  async (formData) => {
    const response = await api.post(
      "/api/shop/address/add",
      formData
    );
    return response.data;
  }
);

/* ---------------- FETCH ALL ADDRESSES ---------------- */
export const fetchAllAddresses = createAsyncThunk(
  "address/fetchAllAddresses",
  async (userId) => {
    const response = await api.get(
      `/api/shop/address/get/${userId}`
    );
    return response.data;
  }
);

/* ---------------- EDIT ADDRESS ---------------- */
export const editAddress = createAsyncThunk(
  "address/editAddress",
  async ({ userId, addressId, formData }) => {
    const response = await api.put(
      `/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return response.data;
  }
);

/* ---------------- DELETE ADDRESS ---------------- */
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await api.delete(
      `/api/shop/address/delete/${userId}/${addressId}`
    );
    return response.data;
  }
);

/* ---------------- SLICE ---------------- */
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ADD */
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })

      /* FETCH */
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;

