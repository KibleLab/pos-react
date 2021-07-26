import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  sales: [],
  getSalesLoading: false,
  getSalesDone: false,
  getSalesError: null,
  addSalesLoading: false,
  addSalesDone: false,
  addSalesError: null,
  quanIncrLoading: false,
  quanIncrDone: false,
  quanIncrError: null,
  resetSalesLoading: false,
  resetSalesDone: false,
  resetSalesError: null,
};

const dailySalesSlice = createSlice({
  name: 'dailySales',
  initialState,
  reducers: {
    GET_SALES_DAILY_SALES_REQUEST: (state) => {
      state.getSalesLoading = true;
      state.getSalesDone = false;
      state.getSalesError = null;
    },
    GET_SALES_DAILY_SALES_SUCCESS: (state, action) => {
      state.getSalesLoading = false;
      state.getSalesDone = true;
      state.sales = [...action.data];
    },
    GET_SALES_DAILY_SALES_FAILURE: (state, action) => {
      state.getSalesLoading = false;
      state.getSalesError = action.error;
    },
    ADD_SALES_DAILY_SALES_REQUEST: (state) => {
      state.addSalesLoading = true;
      state.addSalesDone = false;
      state.addSalesError = null;
    },
    ADD_SALES_DAILY_SALES_SUCCESS: (state, action) => {
      state.addSalesLoading = false;
      state.addSalesDone = true;
      state.sales = [...action.data];
    },
    ADD_SALES_DAILY_SALES_FAILURE: (state, action) => {
      state.addSalesLoading = false;
      state.addSalesError = action.error;
    },
    QUAN_INCR_DAILY_SALES_REQUEST: (state) => {
      state.quanIncrLoading = true;
      state.quanIncrDone = false;
      state.quanIncrError = null;
    },
    QUAN_INCR_DAILY_SALES_SUCCESS: (state, action) => {
      state.quanIncrLoading = false;
      state.quanIncrDone = true;
      state.sales = [...action.data];
    },
    QUAN_INCR_DAILY_SALES_FAILURE: (state, action) => {
      state.quanIncrLoading = false;
      state.quanIncrError = action.error;
    },
    RESET_SALES_DAILY_SALES_REQUEST: (state) => {
      state.resetSalesLoading = true;
      state.resetSalesDone = false;
      state.resetSalesError = null;
    },
    RESET_SALES_DAILY_SALES_SUCCESS: (state, action) => {
      state.resetSalesLoading = false;
      state.resetSalesDone = true;
      state.sales = [...action.data];
    },
    RESET_SALES_DAILY_SALES_FAILURE: (state, action) => {
      state.resetSalesLoading = false;
      state.resetSalesError = action.error;
    },
  },
});

export const {
  GET_SALES_DAILY_SALES_REQUEST,
  GET_SALES_DAILY_SALES_SUCCESS,
  GET_SALES_DAILY_SALES_FAILURE,
  ADD_SALES_DAILY_SALES_REQUEST,
  ADD_SALES_DAILY_SALES_SUCCESS,
  ADD_SALES_DAILY_SALES_FAILURE,
  QUAN_INCR_DAILY_SALES_REQUEST,
  QUAN_INCR_DAILY_SALES_SUCCESS,
  QUAN_INCR_DAILY_SALES_FAILURE,
  RESET_SALES_DAILY_SALES_REQUEST,
  RESET_SALES_DAILY_SALES_SUCCESS,
  RESET_SALES_DAILY_SALES_FAILURE,
} = dailySalesSlice.actions;

export default dailySalesSlice.reducer;
