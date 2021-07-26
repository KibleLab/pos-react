import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  menu: [],
  getMenuLoading: false,
  getMenuDone: false,
  getMenuError: null,
  addMenuLoading: false,
  addMenuDone: false,
  addMenuError: null,
  editStockLoading: false,
  editStockDone: false,
  editStockError: null,
  changeMenuLoading: false,
  changeMenuDone: false,
  changeMenuError: null,
  deleteMenuLoading: false,
  deleteMenuDone: false,
  deleteMenuError: null,
};

const menuMgntSlice = createSlice({
  name: 'menuMgnt',
  initialState,
  reducers: {
    GET_MENU_MENU_MGNT_REQUEST: (state) => {
      state.getMenuLoading = true;
      state.getMenuDone = false;
      state.getMenuError = null;
    },
    GET_MENU_MENU_MGNT_SUCCESS: (state, action) => {
      state.getMenuLoading = false;
      state.getMenuDone = true;
      state.menu = [...action.data];
    },
    GET_MENU_MENU_MGNT_FAILURE: (state, action) => {
      state.getMenuLoading = false;
      state.getMenuError = action.error;
    },
    ADD_MENU_MENU_MGNT_REQUEST: (state) => {
      state.addMenuLoading = true;
      state.addMenuDone = false;
      state.addMenuError = null;
    },
    ADD_MENU_MENU_MGNT_SUCCESS: (state, action) => {
      state.addMenuLoading = false;
      state.addMenuDone = true;
      state.menu = [...action.data];
    },
    ADD_MENU_MENU_MGNT_FAILURE: (state, action) => {
      state.addMenuLoading = false;
      state.addMenuError = action.error;
    },
    EDIT_STOCK_MENU_MGNT_REQUEST: (state) => {
      state.editStockLoading = true;
      state.editStockDone = false;
      state.editStockError = null;
    },
    EDIT_STOCK_MENU_MGNT_SUCCESS: (state, action) => {
      state.editStockLoading = false;
      state.editStockDone = true;
      state.menu = [...action.data];
    },
    EDIT_STOCK_MENU_MGNT_FAILURE: (state, action) => {
      state.editStockLoading = false;
      state.editStockError = action.error;
    },
    CHANGE_MENU_MENU_MGNT_REQUEST: (state) => {
      state.changeMenuLoading = true;
      state.changeMenuDone = false;
      state.changeMenuError = null;
    },
    CHANGE_MENU_MENU_MGNT_SUCCESS: (state, action) => {
      state.changeMenuLoading = false;
      state.changeMenuDone = true;
      state.menu = [...action.data];
    },
    CHANGE_MENU_MENU_MGNT_FAILURE: (state, action) => {
      state.changeMenuLoading = false;
      state.changeMenuError = action.error;
    },
    DELETE_MENU_MENU_MGNT_REQUEST: (state) => {
      state.deleteMenuLoading = true;
      state.deleteMenuDone = false;
      state.deleteMenuError = null;
    },
    DELETE_MENU_MENU_MGNT_SUCCESS: (state, action) => {
      state.deleteMenuLoading = false;
      state.deleteMenuDone = true;
      state.menu = [...action.data];
    },
    DELETE_MENU_MENU_MGNT_FAILURE: (state, action) => {
      state.deleteMenuLoading = false;
      state.deleteMenuError = action.error;
    },
  },
});

export const {
  GET_MENU_MENU_MGNT_REQUEST,
  GET_MENU_MENU_MGNT_SUCCESS,
  GET_MENU_MENU_MGNT_FAILURE,
  ADD_MENU_MENU_MGNT_REQUEST,
  ADD_MENU_MENU_MGNT_SUCCESS,
  ADD_MENU_MENU_MGNT_FAILURE,
  EDIT_STOCK_MENU_MGNT_REQUEST,
  EDIT_STOCK_MENU_MGNT_SUCCESS,
  EDIT_STOCK_MENU_MGNT_FAILURE,
  CHANGE_MENU_MENU_MGNT_REQUEST,
  CHANGE_MENU_MENU_MGNT_SUCCESS,
  CHANGE_MENU_MENU_MGNT_FAILURE,
  DELETE_MENU_MENU_MGNT_REQUEST,
  DELETE_MENU_MENU_MGNT_SUCCESS,
  DELETE_MENU_MENU_MGNT_FAILURE,
} = menuMgntSlice.actions;

export default menuMgntSlice.reducer;
