import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
const userData = JSON.parse(localStorage.getItem("userData"));

const initialState = {
  user: userData || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
};

// create user profile
export const createProfile = createAsyncThunk(
  "user/create",
  async (userData, thunkAPI) => {
    const currentUser = { ...userData };
    const user = thunkAPI.getState().auth.userAuth.user;
    currentUser.user = user;
    const token = thunkAPI.getState().auth.userAuth.tokens.access;

    try {
      return await userService.createProfile(currentUser, token);
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

// get user profile
export const getUserProfile = createAsyncThunk(
  "user/get",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.userAuth.tokens.access;

    try {
      return await userService.getUserProfile(user, token);
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

// edit user profile
export const editUserProfile = createAsyncThunk(
  "user/edit",
  async ({ user, data }, thunkAPI) => {
    const token = thunkAPI.getState().auth.userAuth.tokens.access;

    try {
      return await userService.editUserProfile(user, data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
