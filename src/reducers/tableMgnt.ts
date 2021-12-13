import { createSlice } from '@reduxjs/toolkit';
import { InitialState_Data } from '../types/reducers';

const initialState: InitialState_Data = {
  data: [],
  isLoading: false,
  isDone: false,
  error: null,
};

const tableMgnt = createSlice({
  name: 'tableMgnt',
  initialState,
  reducers: {
    // getTable
    getTable_request: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    getTable_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    getTable_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // addTable
    addTable_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    addTable_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    addTable_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const tableMgntActions = { ...tableMgnt.actions };

export default tableMgnt.reducer;
