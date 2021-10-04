import { createSlice } from '@reduxjs/toolkit';
import { InitialState_Data } from '../types/reducers';

const initialState: InitialState_Data = {
  data: [],
  isLoading: false,
  isDone: false,
  error: null,
};

const dailySalesSlice = createSlice({
  name: 'dailySales',
  initialState,
  reducers: {
    // GET_SALES_DAILY_SALES
    GET_SALES_DAILY_SALES_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    GET_SALES_DAILY_SALES_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    GET_SALES_DAILY_SALES_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // ADD_SALES_DAILY_SALES
    ADD_SALES_DAILY_SALES_REQUEST: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    ADD_SALES_DAILY_SALES_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    ADD_SALES_DAILY_SALES_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // QUAN_INCR_DAILY_SALES
    QUAN_INCR_DAILY_SALES_REQUEST: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    QUAN_INCR_DAILY_SALES_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    QUAN_INCR_DAILY_SALES_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // RESET_SALES_DAILY_SALES
    RESET_SALES_DAILY_SALES_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    RESET_SALES_DAILY_SALES_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    RESET_SALES_DAILY_SALES_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  GET_SALES_DAILY_SALES_REQUEST,
  GET_SALES_DAILY_SALES_SUCCESS,
  GET_SALES_DAILY_SALES_FAILURE,
  ADD_SALES_DAILY_SALES_REQUEST,
  ADD_SALES_DAILY_SALES_SUCCESS,
  ADD_SALES_DAILY_SALES_FAILURE,
  QUAN_INCR_DAILY_SALES_REQUEST,
  QUAN_INCR_DAILY_SALES_SUCCESS,
  QUAN_INCR_DAILY_SALES_FAILURE,
  RESET_SALES_DAILY_SALES_REQUEST,
  RESET_SALES_DAILY_SALES_SUCCESS,
  RESET_SALES_DAILY_SALES_FAILURE,
} = dailySalesSlice.actions;

export default dailySalesSlice.reducer;
