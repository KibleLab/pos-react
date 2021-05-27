import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  select: {},
};

const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    setSelect: (state, action) => {
      state.select = action.payload;
    },
    resetSelect: (state) => {
      state.select = [];
    },
  },
});

export const {setSelect, resetSelect} = selectSlice.actions;

export default selectSlice.reducer;
