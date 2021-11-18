import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import homePageReducer from "../features/homepage/homePageSlicer";
import { LoginSlicer } from "../features/Login/LoginSlicer";
// import {reducer as formReducer} from 'red...ux-form';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    homePage: homePageReducer,
    user: LoginSlicer,
    // form: formReducer,
  },
});
