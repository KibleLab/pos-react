import {createSlice} from '@reduxjs/toolkit';

const tableLength = Array.from(Array(100), () => new Array(0));

const initialState = {
  wish: [...tableLength],
  getWishLoading: false,
  getWishDone: false,
  getWishError: null,
  addWishLoading: false,
  addWishDone: false,
  addWishError: null,
  deleteWishLoading: false,
  deleteWishDone: false,
  deleteWishError: null,
  resetWishLoading: false,
  resetWishDone: false,
  resetWishError: null,
  quanIncrLoading: false,
  quanIncrDone: false,
  quanIncrError: null,
  quanDecrLoading: false,
  quanDecrDone: false,
  quanDecrError: null,
};

const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    GET_WISH_WISH_LIST_REQUEST: (state) => {
      state.getWishLoading = true;
      state.getWishDone = false;
      state.getWishError = null;
    },
    GET_WISH_WISH_LIST_SUCCESS: (state, action) => {
      state.getWishLoading = false;
      state.getWishDone = true;
      state.wish[action.table - 1] = [...action.data];
    },
    GET_WISH_WISH_LIST_FAILURE: (state, action) => {
      state.getWishLoading = false;
      state.getWishError = action.error;
    },
    ADD_WISH_WISH_LIST_REQUEST: (state) => {
      state.addWishLoading = true;
      state.addWishDone = false;
      state.addWishError = null;
    },
    ADD_WISH_WISH_LIST_SUCCESS: (state, action) => {
      state.addWishLoading = false;
      state.addWishDone = true;
      state.wish[action.table - 1] = [...action.data];
    },
    ADD_WISH_WISH_LIST_FAILURE: (state, action) => {
      state.addWishLoading = false;
      state.addWishError = action.error;
    },
    DELETE_WISH_WISH_LIST_REQUEST: (state) => {
      state.deleteWishLoading = true;
      state.deleteWishDone = false;
      state.deleteWishError = null;
    },
    DELETE_WISH_WISH_LIST_SUCCESS: (state, action) => {
      state.deleteWishLoading = false;
      state.deleteWishDone = true;
      state.wish[action.table - 1] = [...action.data];
    },
    DELETE_WISH_WISH_LIST_FAILURE: (state, action) => {
      state.deleteWishLoading = false;
      state.deleteWishError = action.error;
    },
    RESET_WISH_WISH_LIST_REQUEST: (state) => {
      state.resetWishLoading = true;
      state.resetWishDone = false;
      state.resetWishError = null;
    },
    RESET_WISH_WISH_LIST_SUCCESS: (state, action) => {
      state.resetWishLoading = false;
      state.resetWishDone = true;
      state.wish[action.table - 1] = [...action.data];
    },
    RESET_WISH_WISH_LIST_FAILURE: (state, action) => {
      state.resetWishLoading = false;
      state.resetWishError = action.error;
    },
    QUAN_INCR_WISH_LIST_REQUEST: (state) => {
      state.quanIncrLoading = true;
      state.quanIncrDone = false;
      state.quanIncrError = null;
    },
    QUAN_INCR_WISH_LIST_SUCCESS: (state, action) => {
      state.quanIncrLoading = false;
      state.quanIncrDone = true;
      state.wish[action.table - 1] = [...action.data];
    },
    QUAN_INCR_WISH_LIST_FAILURE: (state, action) => {
      state.quanIncrLoading = false;
      state.quanIncrError = action.error;
    },
    QUAN_DECR_WISH_LIST_REQUEST: (state) => {
      state.quanDecrLoading = true;
      state.quanDecrDone = false;
      state.quanDecrError = null;
    },
    QUAN_DECR_WISH_LIST_SUCCESS: (state, action) => {
      state.quanDecrLoading = false;
      state.quanDecrDone = true;
      state.wish[action.table - 1] = [...action.data];
    },
    QUAN_DECR_WISH_LIST_FAILURE: (state, action) => {
      state.quanDecrLoading = false;
      state.quanDecrError = action.error;
    },
  },
});

export const {
  GET_WISH_WISH_LIST_REQUEST,
  GET_WISH_WISH_LIST_SUCCESS,
  GET_WISH_WISH_LIST_FAILURE,
  ADD_WISH_WISH_LIST_REQUEST,
  ADD_WISH_WISH_LIST_SUCCESS,
  ADD_WISH_WISH_LIST_FAILURE,
  DELETE_WISH_WISH_LIST_REQUEST,
  DELETE_WISH_WISH_LIST_SUCCESS,
  DELETE_WISH_WISH_LIST_FAILURE,
  RESET_WISH_WISH_LIST_REQUEST,
  RESET_WISH_WISH_LIST_SUCCESS,
  RESET_WISH_WISH_LIST_FAILURE,
  QUAN_INCR_WISH_LIST_REQUEST,
  QUAN_INCR_WISH_LIST_SUCCESS,
  QUAN_INCR_WISH_LIST_FAILURE,
  QUAN_DECR_WISH_LIST_REQUEST,
  QUAN_DECR_WISH_LIST_SUCCESS,
  QUAN_DECR_WISH_LIST_FAILURE,
} = wishListSlice.actions;

export default wishListSlice.reducer;
