// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import api from "../../services/api";

// const initialState = {
//   isAuthenticated: false,
//   isLoading: true,
//   user: null,
// };

// export const registerUser = createAsyncThunk(
//   "/auth/register",
//   async (formData) => {
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_URL}/api/auth/register`,
//       formData,
//       {
//         withCredentials: true,
//       }
//     );
//     return response.data;
//   }
// );

// export const loginUser = createAsyncThunk(
//   "/auth/login",
//   async (formData) => {
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_URL}/api/auth/login`,
//       formData,
//       {
//         withCredentials: true,
//       }
//     );
//     return response.data;
//   }
// );

// export const logoutUser = createAsyncThunk(
//   "/auth/logout",
//   async () => {
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_URL}/api/auth/logout`,
//       {},
//       {
//         withCredentials: true,
//       }
//     );
//     return response.data;
//   }
// );

// // export const checkAuth = createAsyncThunk(
// //   "/auth/checkauth",
// //   async (token) => {
// //     const response = await axios.get(
// //       `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Cache-Control":
// //             "no-store, no-cache, must-revalidate, proxy-revalidate",
// //         },
// //       }
// //     );
// //     return response.data;
// //   }
// // );

// // export const checkAuth = createAsyncThunk(
// //   "/auth/checkauth",
// //   async () => {
// //     const response = await api.get("/api/auth/check-auth");
// //     return response.data;
// //   }
// // );

// export const checkAuth = createAsyncThunk(
//   "/auth/checkauth",
//   async () => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
//       { withCredentials: true }
//     );
//     return response.data;
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//     },
//     resetAuth: (state) => {
//       state.token = null;
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })
//       .addCase(registerUser.rejected, (state) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//       })
   
//       .addCase(loginUser.fulfilled, (state, action) => {
//   state.isLoading = false;
//   state.user = action.payload.success ? action.payload.user : null;
//   state.isAuthenticated = action.payload.success;
// })

//       .addCase(loginUser.rejected, (state) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//         state.token = null;
//       })
//       .addCase(checkAuth.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(checkAuth.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.success ? action.payload.user : null;
//         state.isAuthenticated = action.payload.success;
//       })
//       .addCase(checkAuth.rejected, (state) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })
      
//     .addCase(logoutUser.fulfilled, (state) => {
//    state.user = null;
//   state.isAuthenticated = false;
//   state.token = null;
// });

//   },
// });

// export const { setUser, resetAuth } = authSlice.actions;
// export default authSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/services/api";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

/* ---------------- REGISTER ---------------- */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData) => {
    const response = await api.post("/api/auth/register", formData);
    return response.data;
  }
);

/* ---------------- LOGIN ---------------- */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData) => {
    const response = await api.post("/api/auth/login", formData);
    return response.data;
  }
);

/* ---------------- LOGOUT ---------------- */
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    const response = await api.post("/api/auth/logout");
    return response.data;
  }
);

/* ---------------- CHECK AUTH ---------------- */
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async () => {
    const response = await api.get("/api/auth/check-auth");
    return response.data;
  }
);

/* ---------------- SLICE ---------------- */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* REGISTER */
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })

      /* LOGIN */
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      /* CHECK AUTH */
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      /* LOGOUT */
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
