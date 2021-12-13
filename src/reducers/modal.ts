import { createSlice } from '@reduxjs/toolkit';
import { InitialState_Open } from '../types/reducers';

const initialState: InitialState_Open = {
  open: [],
  isLoading: false,
  isDone: false,
  error: null,
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // modalOpen
    modalOpen_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    modalOpen_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.open[action.payload.index] = action.payload.open;
      state.open = [...state.open];
    },
    modalOpen_failure: (state, action) => {
      state.isLoading = true;
      state.error = action.payload.error;
    },
  },
});

export const modalActions = { ...modal.actions };

export default modal.reducer;
