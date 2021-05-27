import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getTable = createAsyncThunk('getTable', async () => {
  const res = await axios.get('/api');
  return res.data;
});

export const postTable = createAsyncThunk('postTable', async (data) => {
  await axios.post('/api', data);
  const res = await axios.get('/api');
  return res.data;
});

export const deleteTable = createAsyncThunk('deleteTable', async () => {
  await axios.delete('/api');
  const res = await axios.get('/api');
  return res.data;
});

const initialState = {
  table: [],
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  extraReducers: {
    [getTable.fulfilled]: (state, {payload}) => {
      state.table = [...payload];
    },
    [postTable.fulfilled]: (state, {payload}) => {
      state.table = [...payload];
    },
    [deleteTable.fulfilled]: (state, {payload}) => {
      state.table = [...payload];
    },
  },
});

export default mainSlice.reducer;
