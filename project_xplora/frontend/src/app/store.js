import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import homePageReducer from '../features/homepage/homePageSlicer';
// import {reducer as formReducer} from 'red...ux-form';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    homePage: homePageReducer,
    // form: formReducer,
  },
});
