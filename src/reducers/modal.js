import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  open: [],
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    MODAL_OPEN: (state, action) => {
      state.open[action.payload.index] = action.payload.open;
      state.open = [...state.open];
    },
  },
});

export const {MODAL_OPEN} = modalSlice.actions;

export default modalSlice.reducer;
