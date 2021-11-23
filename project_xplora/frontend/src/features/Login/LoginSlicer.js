import { createSlice } from "@reduxjs/toolkit";


export const LoginSlicer = createSlice({
  name: "loginState",
  initialState: {
    username: "",
    token: "",
    isAuthorized: false,
    problem: {
      firstVisit: true,
      problemName: '',
      description: '',
      dataTransferType: '',
    }
  },
  reducers: {
    setUserCredentials: (state, action) => {
      state.isAuthorized = action.payload.isAuthorized;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },

    logOutUser: (state) => {
      console.log("doe")
      state.isAuthorized = false;
      state.username = "";
      state.token = "";
    },

    updateFirstVisit : (state) => {
      state.problem.firstVisit = false
    }
  },
});

export const { setUserCredentials, logOutUser, updateFirstVisit } = LoginSlicer.actions;

export default LoginSlicer.reducer;
