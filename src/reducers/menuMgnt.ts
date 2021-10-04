import { createSlice } from '@reduxjs/toolkit';
import { InitialState_Data } from '../types/reducers';

const initialState: InitialState_Data = {
  data: [],
  isLoading: false,
  isDone: false,
  error: null,
};

const menuMgntSlice = createSlice({
  name: 'menuMgnt',
  initialState,
  reducers: {
    // GET_MENU_MENU_MGNT
    GET_MENU_MENU_MGNT_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    GET_MENU_MENU_MGNT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    GET_MENU_MENU_MGNT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // ADD_MENU_MENU_MGNT
    ADD_MENU_MENU_MGNT_REQUEST: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    ADD_MENU_MENU_MGNT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    ADD_MENU_MENU_MGNT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // EDIT_STOCK_MENU_MGNT
    EDIT_STOCK_MENU_MGNT_REQUEST: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    EDIT_STOCK_MENU_MGNT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    EDIT_STOCK_MENU_MGNT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // CHANGE_MENU_MENU_MGNT
    CHANGE_MENU_MENU_MGNT_REQUEST: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    CHANGE_MENU_MENU_MGNT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    CHANGE_MENU_MENU_MGNT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // DELETE_MENU_MENU_MGNT
    DELETE_MENU_MENU_MGNT_REQUEST: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    DELETE_MENU_MENU_MGNT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    DELETE_MENU_MENU_MGNT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
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
