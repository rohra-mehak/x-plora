import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import counterSlice from '../counter/counterSlice';
import axios from 'axios';


export const homePageSlice = createSlice({
    name:"testStateName",
    initialState:{
        prefix: 'none'
    },
    reducers: {
        malePrefix: (state) => {
            state.prefix = 'Mr.';
        },

        femalePrefix: (state) => {
            state.prefix = 'Ms.'
        },

        customPrefix: (state, action) => {
       
            state.prefix = action.payload;
            // state.prefix = action.payload;
        }
    }
});

export const { malePrefix, femalePrefix, customPrefix } = homePageSlice.actions;

export default homePageSlice.reducer;