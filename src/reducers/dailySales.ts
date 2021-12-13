import { createSlice } from '@reduxjs/toolkit';
import { InitialState_Data } from '../types/reducers';

const initialState: InitialState_Data = {
  data: [],
  isLoading: false,
  isDone: false,
  error: null,
};

const dailySales = createSlice({
  name: 'dailySales',
  initialState,
  reducers: {
    // getSales
    getSales_request: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    getSales_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    getSales_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // addSales
    addSales_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    addSales_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    addSales_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // quanIncr
    quanIncr_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    quanIncr_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    quanIncr_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // resetSales
    resetSales_request: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    resetSales_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    resetSales_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const dailySalesActions = { ...dailySales.actions };

export default dailySales.reducer;
