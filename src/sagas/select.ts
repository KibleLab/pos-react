import { put, all, fork, takeLeading } from '@redux-saga/core/effects';

import { selectActions } from '../reducers/select';

function* setSelect(action: { payload: { select: {} } }) {
  try {
    yield put(selectActions.setSelect_success({ select: action.payload.select }));
  } catch (err: any) {
    yield put(selectActions.setSelect_failure({ error: err.response.data }));
  }
}

function* resetSelect() {
  try {
    yield put(selectActions.resetSelect_success());
  } catch (err: any) {
    yield put(selectActions.resetSelect_failure({ error: err.response.data }));
  }
}

function* watchSetSelect() {
  yield takeLeading(selectActions.setSelect_request, setSelect);
}

function* watchResetSelect() {
  yield takeLeading(selectActions.resetSelect_request, resetSelect);
}

export default function* select() {
  yield all([fork(watchSetSelect), fork(watchResetSelect)]);
}
