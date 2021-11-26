import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import homePageReducer from "../features/homepage/homePageSlicer";
import loginReducer from "../features/Login/LoginSlicer";
// import {reducer as formReducer} from 'red...ux-form';

export const store = configureStore({
  reducer: {
    user: loginReducer,
  },
});
