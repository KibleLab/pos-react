import { createSlice } from '@reduxjs/toolkit';
import { InitialState_Select } from '../types/reducers';

const initialState: InitialState_Select = {
  select: {},
  isLoading: false,
  isDone: false,
  error: null,
};

const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    // SET_SELECT_SELECT
    SET_SELECT_SELECT_REQUEST: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    SET_SELECT_SELECT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.select = action.payload.select;
    },
    SET_SELECT_SELECT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // RESET_SELECT_SELECT
    RESET_SELECT_SELECT_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    RESET_SELECT_SELECT_SUCCESS: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.select = {};
    },
    RESET_SELECT_SELECT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  SET_SELECT_SELECT_REQUEST,
  SET_SELECT_SELECT_SUCCESS,
  SET_SELECT_SELECT_FAILURE,
  RESET_SELECT_SELECT_REQUEST,
  RESET_SELECT_SELECT_SUCCESS,
  RESET_SELECT_SELECT_FAILURE,
} = selectSlice.actions;

export default selectSlice.reducer;
