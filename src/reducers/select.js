import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  select: {},
};

const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    SET_SELECT: (state, action) => {
      state.select = action.payload;
    },
    RESET_SELECT: (state) => {
      state.select = [];
    },
  },
});

export const {SET_SELECT, RESET_SELECT} = selectSlice.actions;

export default selectSlice.reducer;
