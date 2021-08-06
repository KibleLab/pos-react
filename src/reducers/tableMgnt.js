import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  isLoading: false,
  isDone: false,
  error: null,
};

const tableMgntSlice = createSlice({
  name: 'tableMgnt',
  initialState,
  reducers: {
    GET_TABLE_TABLE_MGNT_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    GET_TABLE_TABLE_MGNT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    GET_TABLE_TABLE_MGNT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    ADD_TABLE_TABLE_MGNT_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    ADD_TABLE_TABLE_MGNT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    ADD_TABLE_TABLE_MGNT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  GET_TABLE_TABLE_MGNT_REQUEST,
  GET_TABLE_TABLE_MGNT_SUCCESS,
  GET_TABLE_TABLE_MGNT_FAILURE,
  ADD_TABLE_TABLE_MGNT_REQUEST,
  ADD_TABLE_TABLE_MGNT_SUCCESS,
  ADD_TABLE_TABLE_MGNT_FAILURE,
} = tableMgntSlice.actions;

export default tableMgntSlice.reducer;
