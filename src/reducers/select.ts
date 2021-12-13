import { createSlice } from '@reduxjs/toolkit';
import { InitialState_Select } from '../types/reducers';

const initialState: InitialState_Select = {
  select: {},
  isLoading: false,
  isDone: false,
  error: null,
};

const select = createSlice({
  name: 'select',
  initialState,
  reducers: {
    // setSelect
    setSelect_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    setSelect_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.select = action.payload.select;
    },
    setSelect_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // resetSelect
    resetSelect_request: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    resetSelect_success: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.select = {};
    },
    resetSelect_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const selectActions = { ...select.actions };

export default select.reducer;
