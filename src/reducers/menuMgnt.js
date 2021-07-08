import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getMenu = createAsyncThunk('getMenu', async () => {
  const res = await axios.get('/api/menu-mgnt');
  return res.data;
});

export const addMenu = createAsyncThunk('addMenu', async ({addData}) => {
  const menu_name = addData.menu_name;
  const menu_price = addData.menu_price;
  const menu_stock = addData.menu_stock;
  await axios.post('/api/menu-mgnt', {menu_name, menu_price, menu_stock});
  await axios.post('/api/menu-slct', {menu_name, menu_price, menu_stock});
  const res = await axios.get('/api/menu-mgnt');
  return res.data;
});

export const editStock = createAsyncThunk('editStock', async ({editData}) => {
  const menu_name = editData.menu_name;
  const menu_stock = editData.menu_stock;
  await axios.patch('/api/menu-mgnt', {menu_name, menu_stock});
  await axios.patch('/api/menu-slct', {menu_name, menu_stock});
  const res = await axios.get('/api/menu-mgnt');
  return res.data;
});

export const changeMenu = createAsyncThunk('changeMenu', async ({menuData}) => {
  const menu_name = menuData.menu_name;
  const menu_stock = menuData.menu_stock;
  await axios.patch('/api/menu-mgnt', {menu_name, menu_stock});
  await axios.patch('/api/menu-slct', {menu_name, menu_stock});
  const res = await axios.get('/api/menu-mgnt');
  return res.data;
});

export const delMenu = createAsyncThunk('delMenu', async ({delData}) => {
  const menu_name = delData.menu_name;
  await axios.delete('/api/menu-mgnt', {data: {menu_name}});
  await axios.delete('/api/menu-slct', {data: {menu_name}});
  const res = await axios.get('/api/menu-mgnt');
  return res.data;
});

const initialState = {
  menu: [],
};

const menuMgntSlice = createSlice({
  name: 'menuMgnt',
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

export default menuMgntSlice.reducer;
