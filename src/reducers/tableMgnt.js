import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getTable = createAsyncThunk('getTable', async () => {
  const res = await axios.get('/api/table-mgnt');
  return res.data;
});

export const postTable = createAsyncThunk('postTable', async ({addData}) => {
  const table_no = addData.table_no;
  const table_name = addData.table_name;
  await axios.post('/api/table-mgnt', {table_no, table_name});
  const res = await axios.get('/api/table-mgnt');
  return res.data;
});

export const deleteTable = createAsyncThunk('deleteTable', async () => {
  await axios.delete('/api/table-mgnt');
  const res = await axios.get('/api/table-mgnt');
  return res.data;
});

const initialState = {
  table: [],
  load: false,
};

const tableMgntSlice = createSlice({
  name: 'tableMgnt',
  initialState,
  extraReducers: {
    [getTable.pending]: (state) => {
      state.load = true;
    },
    //successful getTable  p.s).rejected is fail.
    [getTable.fulfilled]: (state, {payload}) => {
      state.load = false;
      state.table = [...payload];
    },
    [postTable.pending]: (state) => {
      state.load = true;
    },
    [postTable.fulfilled]: (state, {payload}) => {
      state.load = false;
      state.table = [...payload];
    },
    [deleteTable.fulfilled]: (state, {payload}) => {
      state.table = [...payload];
    },
  },
});

export default tableMgntSlice.reducer;
