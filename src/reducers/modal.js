import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: [],
  isLoading: false,
  isDone: false,
  error: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    MODAL_OPEN_MODAL_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    MODAL_OPEN_MODAL_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.open[action.payload.index] = action.payload.open;
      state.open = [...state.open];
    },
    MODAL_OPEN_MODAL_FAILURE: (state, action) => {
      state.isLoading = true;
      state.error = action.payload.error;
    },
  },
});

export const { MODAL_OPEN_MODAL_REQUEST, MODAL_OPEN_MODAL_SUCCESS, MODAL_OPEN_MODAL_FAILURE } =
  modalSlice.actions;

export default modalSlice.reducer;
