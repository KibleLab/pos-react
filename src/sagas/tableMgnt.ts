import { put, call, all, fork, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { TableData } from '../types/sagas';

import { tableMgntActions } from '../reducers/tableMgnt';

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
    yield put(tableMgntActions.getTable_success({ data: result.data }));
  } catch (err: any) {
    yield put(tableMgntActions.getTable_failure({ error: err.response.data }));
  }
}

function* addTable(action: { payload: { addData: TableData } }) {
  try {
    const result: AxiosResponse<Array<TableData>> = yield call(addTableAPI, action.payload);
    yield put(tableMgntActions.addTable_success({ data: result.data }));
  } catch (err: any) {
    yield put(tableMgntActions.addTable_failure({ error: err.response.data }));
  }
}

function* watchGetTable() {
  yield takeLatest(tableMgntActions.getTable_request, getTable);
}

function* watchAddTable() {
  yield takeLatest(tableMgntActions.addTable_request, addTable);
}

export default function* tableMgnt() {
  yield all([fork(watchGetTable), fork(watchAddTable)]);
}
