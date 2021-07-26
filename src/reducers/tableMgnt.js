import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  table: [],
  getTableLoading: false,
  getTableDone: false,
  getTableError: null,
  addTableLoading: false,
  addTableDone: false,
  addTableError: null,
};

const tableMgntSlice = createSlice({
  name: 'tableMgnt',
  initialState,
  reducers: {
    GET_TABLE_TABLE_MGNT_REQUEST: (state) => {
      state.getTableLoading = true;
      state.getTableDone = false;
      state.getTableError = null;
    },
    GET_TABLE_TABLE_MGNT_SUCCESS: (state, action) => {
      state.getTableLoading = false;
      state.getTableDone = true;
      state.table = [...action.data];
    },
    GET_TABLE_TABLE_MGNT_FAILURE: (state, action) => {
      state.getTableLoading = false;
      state.getTableError = action.error;
    },
    ADD_TABLE_TABLE_MGNT_REQUEST: (state) => {
      state.addTableLoading = true;
      state.addTableDone = false;
      state.addTableError = null;
    },
    ADD_TABLE_TABLE_MGNT_SUCCESS: (state, action) => {
      state.addTableLoading = false;
      state.addTableDone = true;
      state.table = [...action.data];
    },
    ADD_TABLE_TABLE_MGNT_FAILURE: (state, action) => {
      state.addTableLoading = false;
      state.addTableError = action.error;
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
