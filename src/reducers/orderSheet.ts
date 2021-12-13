import { createSlice } from '@reduxjs/toolkit';
import { InitialState_Data } from '../types/reducers';

const tableLength = Array.from(Array(102), () => new Array(0));

const initialState: InitialState_Data = {
  data: [...tableLength],
  isLoading: false,
  isDone: false,
  error: null,
};

const orderSheet = createSlice({
  name: 'orderSheet',
  initialState,
  reducers: {
    // getOrder
    getOrder_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    getOrder_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table] = [...action.payload.data];
    },
    getOrder_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // addOrder
    addOrder_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    addOrder_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table] = [...action.payload.data];
    },
    addOrder_failure: (state, action) => {
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
      state.data[action.payload.table] = [...action.payload.data];
    },
    quanIncr_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // resetOrder
    resetOrder_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    resetOrder_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table] = [...action.payload.data];
    },
    resetOrder_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const orderSheetActions = { ...orderSheet.actions };

export default orderSheet.reducer;
