import { put, all, fork, takeLeading } from '@redux-saga/core/effects';

import { modalActions } from '../reducers/modal';

function* modalOpen(action: { payload: { index: number; open: boolean } }) {
  try {
    yield put(
      modalActions.modalOpen_success({
        index: action.payload.index,
        open: action.payload.open,
      }),
    );
  } catch (err: any) {
    yield put(modalActions.modalOpen_failure({ error: err.response.data }));
  }
}

function* watchModalOpen() {
  yield takeLeading(modalActions.modalOpen_request, modalOpen);
}

export default function* modal() {
  yield all([fork(watchModalOpen)]);
}
