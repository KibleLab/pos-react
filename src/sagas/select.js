import { put, all, fork, takeLeading } from '@redux-saga/core/effects';

import {
  SET_SELECT_SELECT_REQUEST,
  SET_SELECT_SELECT_SUCCESS,
  SET_SELECT_SELECT_FAILURE,
  RESET_SELECT_SELECT_REQUEST,
  RESET_SELECT_SELECT_SUCCESS,
  RESET_SELECT_SELECT_FAILURE,
} from '../reducers/select';

function* setSelect(action) {
  try {
    yield put(SET_SELECT_SELECT_SUCCESS({ select: action.payload.select }));
  } catch (err) {
    yield put(SET_SELECT_SELECT_FAILURE({ error: err.response.data }));
  }
}

function* resetSelect() {
  try {
    yield put(RESET_SELECT_SELECT_SUCCESS());
  } catch (err) {
    yield put(RESET_SELECT_SELECT_FAILURE({ error: err.response.data }));
  }
}

function* watchSetSelect() {
  yield takeLeading(SET_SELECT_SELECT_REQUEST, setSelect);
}

function* watchResetSelect() {
  yield takeLeading(RESET_SELECT_SELECT_REQUEST, resetSelect);
}

export default function* select() {
  yield all([fork(watchSetSelect), fork(watchResetSelect)]);
}
