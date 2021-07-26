import {createSlice} from '@reduxjs/toolkit';

const tableLength = Array.from(Array(100), () => new Array(0));

const initialState = {
  order: [...tableLength],
  getOrderLoading: false,
  getOrderDone: false,
  getOrderError: null,
  addOrderLoading: false,
  addOrderDone: false,
  addOrderError: null,
  quanIncrLoading: false,
  quanIncrDone: false,
  quanIncrError: null,
  resetOrderLoading: false,
  resetOrderDone: false,
  resetOrderError: null,
};

const orderSheetSlice = createSlice({
  name: 'orderSheet',
  initialState,
  reducers: {
    GET_ORDER_ORDER_SHEET_REQUEST: (state) => {
      state.getOrderLoading = true;
      state.getOrderDone = false;
      state.getOrderError = null;
    },
    GET_ORDER_ORDER_SHEET_SUCCESS: (state, action) => {
      state.getOrderLoading = false;
      state.getOrderDone = true;
      state.order[action.table - 1] = [...action.data];
    },
    GET_ORDER_ORDER_SHEET_FAILURE: (state, action) => {
      state.getOrderLoading = false;
      state.getOrderError = action.error;
    },
    ADD_ORDER_ORDER_SHEET_REQUEST: (state) => {
      state.addOrderLoading = true;
      state.addOrderDone = false;
      state.addOrderError = null;
    },
    ADD_ORDER_ORDER_SHEET_SUCCESS: (state, action) => {
      state.addOrderLoading = false;
      state.addOrderDone = true;
      state.order[action.table - 1] = [...action.data];
    },
    ADD_ORDER_ORDER_SHEET_FAILURE: (state, action) => {
      state.addOrderLoading = false;
      state.addOrderError = action.error;
    },
    QUAN_INCR_ORDER_SHEET_REQUEST: (state) => {
      state.quanIncrLoading = true;
      state.quanIncrDone = false;
      state.quanIncrError = null;
    },
    QUAN_INCR_ORDER_SHEET_SUCCESS: (state, action) => {
      state.quanIncrLoading = false;
      state.quanIncrDone = true;
      state.order[action.table - 1] = [...action.data];
    },
    QUAN_INCR_ORDER_SHEET_FAILURE: (state, action) => {
      state.quanIncrLoading = false;
      state.quanIncrError = action.error;
    },
    RESET_ORDER_ORDER_SHEET_REQUEST: (state) => {
      state.resetOrderLoading = true;
      state.resetOrderDone = false;
      state.resetOrderError = null;
    },
    RESET_ORDER_ORDER_SHEET_SUCCESS: (state, action) => {
      state.resetOrderLoading = false;
      state.resetOrderDone = true;
      state.order[action.table - 1] = [...action.data];
    },
    RESET_ORDER_ORDER_SHEET_FAILURE: (state, action) => {
      state.resetOrderLoading = false;
      state.resetOrderError = action.error;
    },
  },
});

export const {
  GET_ORDER_ORDER_SHEET_REQUEST,
  GET_ORDER_ORDER_SHEET_SUCCESS,
  GET_ORDER_ORDER_SHEET_FAILURE,
  ADD_ORDER_ORDER_SHEET_REQUEST,
  ADD_ORDER_ORDER_SHEET_SUCCESS,
  ADD_ORDER_ORDER_SHEET_FAILURE,
  QUAN_INCR_ORDER_SHEET_REQUEST,
  QUAN_INCR_ORDER_SHEET_SUCCESS,
  QUAN_INCR_ORDER_SHEET_FAILURE,
  RESET_ORDER_ORDER_SHEET_REQUEST,
  RESET_ORDER_ORDER_SHEET_SUCCESS,
  RESET_ORDER_ORDER_SHEET_FAILURE,
} = orderSheetSlice.actions;

export default orderSheetSlice.reducer;
