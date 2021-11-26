import { createSlice } from "@reduxjs/toolkit";

export const LoginSlicer = createSlice({
  name: "loginState",
  initialState: {
    username: "",
    token: "",
    isAuthorized: false,
    problem: {
      isProblemCreated: false,
      problemId: -1,
      problemName: "",
      description: "",
      dataTransferType: "",
      stageDetails: {
        pk: -1,
        isActivated: false,
        isComplete: false,
        stageNumber: -1,
        state: "YELLOW",
      },
    },
  },
  reducers: {
    setUserCredentials: (state, action) => {
      state.isAuthorized = action.payload.isAuthorized;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },

    logOutUser: (state) => {
      console.log("loggin out");
      state.isAuthorized = false;
      state.username = "";
      state.token = "";
    },

    updateProblem: (state, action) => {
      //STATE LOOKS LIKE :
      // problem: {
      //   isProblemCreated: false,
      //   problemId: -1,
      //   problemName: "",
      //   description: "",
      //   dataTransferType: "",
      //   stageDetails: {
      //     pk: -1,
      //     isActivated: false,
      //     isComplete: false,
      //     stageNumber: -1,
      //     state: "YELLOW",
      //   },
      // },
      state.problem.isProblemCreated = true;
      state.problem.problemId = action.payload["problem.pk"];
      state.problem.problemName = action.payload["problem.title"];
      state.problem.description = action.payload["problem.dataset_description"];
      state.problem.dataTransferType = action.payload.type;
      state.problem.stageDetails.pk =
        action.payload.problem_stage_data["stage.pk"];
      state.problem.stageDetails.isActivated =
        action.payload.problem_stage_data["isActivated"];
      state.problem.stageDetails.isComplete =
        action.payload.problem_stage_data["isComplete"];
      state.problem.stageDetails.stageNumber =
        action.payload.problem_stage_data["s_number"];
      state.problem.stageDetails.state =
        action.payload.problem_stage_data["state"];
    },
  },
});

export const { setUserCredentials, logOutUser, updateProblem } =
  LoginSlicer.actions;

export default LoginSlicer.reducer;
