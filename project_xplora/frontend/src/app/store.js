import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import homePageReducer from '../features/homepage/homePageSlicer';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    homePage: homePageReducer,
  },
});
