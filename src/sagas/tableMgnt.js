import {put, call, all, fork, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_TABLE_TABLE_MGNT_REQUEST,
  GET_TABLE_TABLE_MGNT_SUCCESS,
  GET_TABLE_TABLE_MGNT_FAILURE,
  ADD_TABLE_TABLE_MGNT_REQUEST,
  ADD_TABLE_TABLE_MGNT_SUCCESS,
  ADD_TABLE_TABLE_MGNT_FAILURE,
} from '../reducers/tableMgnt';

const getTableAPI = () => {
  return axios.get('/api/table-mgnt');
};

function* getTable() {
  try {
    const result = yield call(getTableAPI);
    yield put({
      type: GET_TABLE_TABLE_MGNT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: GET_TABLE_TABLE_MGNT_FAILURE,
      error: err.response.data,
    });
  }
}

const addTableAPI = (addData) => {
  const table_no = addData.table_no;
  const table_name = addData.table_name;
  axios.post('/api/table-mgnt', {table_no, table_name});
  return axios.get('/api/table-mgnt');
};

function* addTable(action) {
  try {
    const result = yield call(addTableAPI, action.payload.addData);
    yield put({
      type: ADD_TABLE_TABLE_MGNT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_TABLE_TABLE_MGNT_FAILURE,
      error: err.response.data,
    });
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
