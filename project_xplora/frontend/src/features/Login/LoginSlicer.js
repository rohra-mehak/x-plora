import { createSlice } from "@reduxjs/toolkit";

export function setWithExpiry(key, value, ttl) {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

// const initialState = {
//   username: "",
//   token: "",
//   isAuthorized: false,
//   problem: {
//     isProblemCreated: false,
//     problemId: "",
//     problemName: "",
//     description: "",
//     dataTransferType: "",
//     stageDetails: {
//       pk: -1,
//       isActivated: false,
//       isComplete: false,
//       stageNumber: -1,
//       state: "YELLOW",
//     },
//   },
// };

export const LoginSlicer = createSlice({
  name: "loginState",
  initialState: {
    username: getWithExpiry("username"),
    token: getWithExpiry("token"),
    isAuthorized: getWithExpiry("isAuthorized"),
    problem: {
      isProblemCreated: false,
      problemId: getWithExpiry("problemId"),
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

      setWithExpiry("username", action.payload.username, 1000000000000);
      setWithExpiry("isAuthorized", action.payload.isAuthorized, 10000000000);
      setWithExpiry("token", action.payload.token, 100000000000);
      console.log("done according to me");
    },

    logOutUser: (state) => {
      console.log("Logging out");
      // state = { ...initialState };
      console.log(state);
      state.isAuthorized = false;
      state.username = "";
      state.token = "";
      state.problem.isProblemCreated = true;
      state.problem.problemId = "";
      state.problem.problemName = "";
      state.problem.description = "";
      state.problem.dataTransferType = "Email";
      state.problem.stageDetails.pk = "";
      state.problem.stageDetails.isActivated = false;
      state.problem.stageDetails.isComplete = false;
      state.problem.stageDetails.stageNumber = -1;
      state.problem.stageDetails.state = -1;
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
      state.problem.problemId = action.payload.problem_PK;
      state.problem.problemName = action.payload.problem_Title;
      state.problem.description = action.payload.problem_Dataset_description;
      state.problem.dataTransferType = "Email";
      state.problem.stageDetails.pk =
        action.payload.problem_stage_data.stage_Pk;
      state.problem.stageDetails.isActivated =
        action.payload.problem_stage_data.isActivated;
      state.problem.stageDetails.isComplete =
        action.payload.problem_stage_data.isComplete;
      state.problem.stageDetails.stageNumber =
        action.payload.problem_stage_data.s_number;
      state.problem.stageDetails.state =
        action.payload.problem_stage_data.state;

      setWithExpiry("problemId", action.payload.problem_PK, 1000000000000);
    },
  },
});

export const { setUserCredentials, logOutUser, updateProblem } =
  LoginSlicer.actions;

export default LoginSlicer.reducer;
