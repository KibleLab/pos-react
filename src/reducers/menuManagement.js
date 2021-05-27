import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getMenu = createAsyncThunk('getMenu', async () => {
  const res = await axios.get('/api/MenuManagement');
  return res.data;
});

export const addMenu = createAsyncThunk('addMenu', async (data) => {
  await axios.post('/api/MenuManagement', data);
  const res = await axios.get('/api/MenuManagement');
  return res.data;
});

export const editStock = createAsyncThunk('editStock', async (data) => {
  console.log(data);
  await axios.patch('/api/MenuManagement', data);
  const res = await axios.get('/api/MenuManagement');
  return res.data;
});

export const changeMenu = createAsyncThunk('changeMenu', async (data) => {
  await axios.patch('/api/MenuManagement', data);
  const res = await axios.get('/api/MenuManagement');
  return res.data;
});

export const delMenu = createAsyncThunk('delMenu', async (data) => {
  await axios.delete('/api/MenuManagement', data);
  const res = await axios.get('/api/MenuManagement');
  return res.data;
});

const initialState = {
  menu: [],
};

const menuManagementSlice = createSlice({
  name: 'menuManagement',
  initialState,
  extraReducers: {
    [getMenu.fulfilled]: (state, {payload}) => {
      state.menu = [...payload];
    },
    [addMenu.fulfilled]: (state, {payload}) => {
      state.menu = [...payload];
    },
    [editStock.fulfilled]: (state, {payload}) => {
      state.menu = [...payload];
    },
    [changeMenu.fulfilled]: (state, {payload}) => {
      state.menu = [...payload];
    },
    [delMenu.fulfilled]: (state, {payload}) => {
      state.menu = [...payload];
    },
  },
});

export default menuManagementSlice.reducer;
