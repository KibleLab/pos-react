import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getDailySales = createAsyncThunk('getDailySales', async () => {
  const res = await axios.get('/dailysales');
  return res.data;
});

export const addSales = createAsyncThunk('addSales', async ({orderData}) => {
  const menu_name = orderData.menu_name;
  const sales_quantity = orderData.order_quantity;
  const menu_price = orderData.menu_price;
  const total_price = orderData.menu_price * orderData.order_quantity;
  await axios.post('/dailysales', {
    menu_name,
    sales_quantity,
    menu_price,
    total_price,
  });
  const res = await axios.get('/dailysales');
  return res.data;
});

export const quanIncrSales = createAsyncThunk('quanIncrSales', async ({orderData, salesData}) => {
  const menu_name = salesData.menu_name;
  const sales_quantity = salesData.sales_quantity + orderData.order_quantity;
  const total_price = salesData.menu_price * sales_quantity;
  await axios.patch('/dailysales', {menu_name, sales_quantity, total_price});
  const res = await axios.get('/dailysales');
  return res.data;
});

export const resetSales = createAsyncThunk('resetSales', async () => {
  await axios.delete('/dailysales');
  const res = await axios.get('/dailysales');
  return res.data;
});

const initialState = {
  dailySales: [],
};

const dailySalesSlice = createSlice({
  name: 'dailySales',
  initialState,
  extraReducers: {
    [getDailySales.fulfilled]: (state, {payload}) => {
      state.dailySales = [...payload];
    },
    [addSales.fulfilled]: (state, {payload}) => {
      state.dailySales = [...payload];
    },
    [quanIncrSales.fulfilled]: (state, {payload}) => {
      state.dailySales = [...payload];
    },
    [resetSales.fulfilled]: (state, {payload}) => {
      state.dailySales = [...payload];
    },
  },
});

export default dailySalesSlice.reducer;
