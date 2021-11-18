import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import counterSlice from "../counter/counterSlice";
import axios from "axios";

export const LoginSlicer = createSlice({
  name: "loginState",
  initialState: {
    username: "",
    token: "",
    isAuthorized: false,
  },
  reducers: {
    setUserCredentials: (state, action) => {
      state.isAuthorized = action.payload.isAuthorized;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },

    logOutUser: (state) => {
      state.isAuthorized = false;
      state.username = "";
      state.token = "";
    },
  },
});

export const { setUserCredentials, logOutUser } = LoginSlicer.actions;

export default LoginSlicer.reducer;
