import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from local storage
const userAuth = JSON.parse(localStorage.getItem("user"));

const initialState = {
  userAuth: userAuth ? userAuth : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// register a new user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.error(message);

      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Login a user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    console.error(message);

    return thunkAPI.rejectWithValue(message);
  }
});

// Log out user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});
// export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
//   const currentUser = thunkAPI.getState.userAuth;
//   try {
//     return await authService.logout(currentUser);
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();

//     console.log(message);

//     return thunkAPI.rejectWithValue(message);
//   }
// });

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.userAuth = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userAuth = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userAuth = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userAuth = null;
      })

      // .addCase(logout.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(logout.fulfilled, (state) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      // })
      // .addCase(logout.rejected, (state) => {
      //   state.isLoading = false;
      //   state.isError = true;
      // });
      .addCase(logout.fulfilled, (state) => {
        state.userAuth = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
