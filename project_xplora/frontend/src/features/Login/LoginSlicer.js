import { createSlice } from "@reduxjs/toolkit";

export const LoginSlicer = createSlice({
  name: "loginState",
  initialState: {
    username: "",
    token: "",
    isAuthorized: false,
    problemId: -1,
    problem: {
      firstVisit: true,
      problemName: "",
      description: "",
      dataTransferType: "",
      // id: "",
    },
  },
  reducers: {
    setUserCredentials: (state, action) => {
      state.isAuthorized = action.payload.isAuthorized;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.problem.firstVisit = action.payload.isFirstVisit;
      state.problemId = action.payload.problem;
    },

    logOutUser: (state) => {
      console.log("loggin out");
      state.isAuthorized = false;
      state.username = "";
      state.token = "";
    },

    updateProblem: (state, action) => {
      state.problem.problemName = action.payload.title;
      state.problem.description = action.payload.description;
      state.problem.dataTransferType = action.payload.type;
      state.problemId = action.payload.id;
      state.problem.firstVisit = action.payload.firstVisit;
    },
  },
});

export const { setUserCredentials, logOutUser, updateProblem } =
  LoginSlicer.actions;

export default LoginSlicer.reducer;
