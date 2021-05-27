import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  open: [],
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modalOpen: (state, action) => {
      state.open[action.payload.index] = action.payload.open;
      state.open = [...state.open];
    },
  },
});

export const {modalOpen} = modalSlice.actions;

export default modalSlice.reducer;
