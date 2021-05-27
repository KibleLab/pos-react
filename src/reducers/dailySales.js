import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getDailySales = createAsyncThunk('getDailySales', async () => {
  const res = await axios.get('/api/DailySalesStatus');
  return res.data;
});

export const addSales = createAsyncThunk('addSales', async ({table_no, data}) => {
  await axios.post(`/api/OrderSheet/${table_no}`, data);
  const res = await axios.get('/api/DailySalesStatus');
  return res.data;
});

export const quanIncrDS = createAsyncThunk('quanIncrDS', async ({table_no, data}) => {
  await axios.patch(`/api/OrderSheet/${table_no}`, data);
  const res = await axios.get('/api/DailySalesStatus');
  return res.data;
});

export const resetSales = createAsyncThunk('resetSales', async () => {
  await axios.delete('/api/DailySalesStatus');
  const res = await axios.get('/api/DailySalesStatus');
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
    [quanIncrDS.fulfilled]: (state, {payload}) => {
      state.dailySales = [...payload];
    },
    [resetSales.fulfilled]: (state, {payload}) => {
      state.dailySales = [...payload];
    },
  },
});

export default dailySalesSlice.reducer;
