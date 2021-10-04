import { all, fork } from 'redux-saga/effects';

import menuMgnt from './menuMgnt';
import menuSlct from './menuSlct';
import wishList from './wishList';
import orderSheet from './orderSheet';
import dailySales from './dailySales';
import tableMgnt from './tableMgnt';
import modal from './modal';
import select from './select';

export default function* rootSaga() {
  yield all([
    fork(menuMgnt),
    fork(menuSlct),
    fork(wishList),
    fork(orderSheet),
    fork(dailySales),
    fork(tableMgnt),
    fork(modal),
    fork(select),
  ]);
}
