import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  menu: [],
  getMenuLoading: false,
  getMenuDone: false,
  getMenuError: null,
  stockIncrLoading: false,
  stockIncrDone: false,
  stockIncrError: null,
  stockDecrLoading: false,
  stockDecrDone: false,
  stockDecrError: null,
  stockRestLoading: false,
  stockRestDone: false,
  stockRestError: null,
};

const menuSlctSlice = createSlice({
  name: 'menuSlct',
  initialState,
  reducers: {
    GET_MENU_MENU_SLCT_REQUEST: (state) => {
      state.getMenuLoading = true;
      state.getMenuDone = false;
      state.getMenuError = null;
    },
    GET_MENU_MENU_SLCT_SUCCESS: (state, action) => {
      state.getMenuLoading = false;
      state.getMenuDone = true;
      state.menu = [...action.data];
    },
    GET_MENU_MENU_SLCT_FAILURE: (state, action) => {
      state.getMenuLoading = false;
      state.getMenuError = action.error;
    },
    STOCK_INCR_MENU_SLCT_REQUEST: (state) => {
      state.stockIncrLoading = true;
      state.stockIncrDone = false;
      state.stockIncrError = null;
    },
    STOCK_INCR_MENU_SLCT_SUCCESS: (state, action) => {
      state.stockIncrLoading = false;
      state.stockIncrDone = true;
      state.menu = [...action.data];
    },
    STOCK_INCR_MENU_SLCT_FAILURE: (state, action) => {
      state.stockIncrLoading = false;
      state.stockIncrError = action.error;
    },
    STOCK_DECR_MENU_SLCT_REQUEST: (state) => {
      state.stockDecrLoading = true;
      state.stockDecrDone = false;
      state.stockDecrError = null;
    },
    STOCK_DECR_MENU_SLCT_SUCCESS: (state, action) => {
      state.stockDecrLoading = false;
      state.stockDecrDone = true;
      state.menu = [...action.data];
    },
    STOCK_DECR_MENU_SLCT_FAILURE: (state, action) => {
      state.stockDecrLoading = false;
      state.stockDecrError = action.error;
    },
    STOCK_REST_MENU_SLCT_REQUEST: (state) => {
      state.stockRestLoading = true;
      state.stockRestDone = false;
      state.stockRestError = null;
    },
    STOCK_REST_MENU_SLCT_SUCCESS: (state, action) => {
      state.stockRestLoading = false;
      state.stockRestDone = true;
      state.menu = [...action.data];
    },
    STOCK_REST_MENU_SLCT_FAILURE: (state, action) => {
      state.stockRestLoading = false;
      state.stockRestError = action.error;
    },
  },
});

export const {
  GET_MENU_MENU_SLCT_REQUEST,
  GET_MENU_MENU_SLCT_SUCCESS,
  GET_MENU_MENU_SLCT_FAILURE,
  STOCK_INCR_MENU_SLCT_REQUEST,
  STOCK_INCR_MENU_SLCT_SUCCESS,
  STOCK_INCR_MENU_SLCT_FAILURE,
  STOCK_DECR_MENU_SLCT_REQUEST,
  STOCK_DECR_MENU_SLCT_SUCCESS,
  STOCK_DECR_MENU_SLCT_FAILURE,
  STOCK_REST_MENU_SLCT_REQUEST,
  STOCK_REST_MENU_SLCT_SUCCESS,
  STOCK_REST_MENU_SLCT_FAILURE,
} = menuSlctSlice.actions;

export default menuSlctSlice.reducer;
