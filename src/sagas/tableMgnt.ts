import { put, call, all, fork, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { TableData } from '../types/sagas';

import {
  GET_TABLE_TABLE_MGNT_REQUEST,
  GET_TABLE_TABLE_MGNT_SUCCESS,
  GET_TABLE_TABLE_MGNT_FAILURE,
  ADD_TABLE_TABLE_MGNT_REQUEST,
  ADD_TABLE_TABLE_MGNT_SUCCESS,
  ADD_TABLE_TABLE_MGNT_FAILURE,
} from '../reducers/tableMgnt';

const getTableAPI = async () => {
  return await axios.get('/api/table-mgnt');
};

const addTableAPI = async (payload: { addData: TableData }) => {
  const table_no = payload.addData.table_no;
  const table_name = payload.addData.table_name;
  await axios.post('/api/table-mgnt', { table_no, table_name });
  return await axios.get('/api/table-mgnt');
};

function* getTable() {
  try {
    const result: AxiosResponse<Array<TableData>> = yield call(getTableAPI);
    yield put(GET_TABLE_TABLE_MGNT_SUCCESS({ data: result.data }));
  } catch (err: any) {
    yield put(GET_TABLE_TABLE_MGNT_FAILURE({ error: err.response.data }));
  }
}

function* addTable(action: { payload: { addData: TableData } }) {
  try {
    const result: AxiosResponse<Array<TableData>> = yield call(addTableAPI, action.payload);
    yield put(ADD_TABLE_TABLE_MGNT_SUCCESS({ data: result.data }));
  } catch (err: any) {
    yield put(ADD_TABLE_TABLE_MGNT_FAILURE({ error: err.response.data }));
  }
}

function* watchGetTable() {
  yield takeLatest(GET_TABLE_TABLE_MGNT_REQUEST, getTable);
}

function* watchAddTable() {
  yield takeLatest(ADD_TABLE_TABLE_MGNT_REQUEST, addTable);
}

export default function* tableMgnt() {
  yield all([fork(watchGetTable), fork(watchAddTable)]);
}
