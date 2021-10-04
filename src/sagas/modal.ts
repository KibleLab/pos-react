import { put, all, fork, takeLeading } from '@redux-saga/core/effects';

import {
  MODAL_OPEN_MODAL_REQUEST,
  MODAL_OPEN_MODAL_SUCCESS,
  MODAL_OPEN_MODAL_FAILURE,
} from '../reducers/modal';

function* modalOpen(action: { payload: { index: number; open: boolean } }) {
  try {
    yield put(MODAL_OPEN_MODAL_SUCCESS({ index: action.payload.index, open: action.payload.open }));
  } catch (err: any) {
    yield put(MODAL_OPEN_MODAL_FAILURE({ error: err.response.data }));
  }
}

function* watchModalOpen() {
  yield takeLeading(MODAL_OPEN_MODAL_REQUEST, modalOpen);
}

export default function* modal() {
  yield all([fork(watchModalOpen)]);
}
