import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import userReducer from "./features/User/userSlice";
import diagnosisReducer from "./features/Diagnosis/diagnosisSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    diagnosis: diagnosisReducer,
  },
});
