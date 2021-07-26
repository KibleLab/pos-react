import {put, call, all, fork, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_WISH_WISH_LIST_REQUEST,
  GET_WISH_WISH_LIST_SUCCESS,
  GET_WISH_WISH_LIST_FAILURE,
  ADD_WISH_WISH_LIST_REQUEST,
  ADD_WISH_WISH_LIST_SUCCESS,
  ADD_WISH_WISH_LIST_FAILURE,
  DELETE_WISH_WISH_LIST_REQUEST,
  DELETE_WISH_WISH_LIST_SUCCESS,
  DELETE_WISH_WISH_LIST_FAILURE,
  RESET_WISH_WISH_LIST_REQUEST,
  RESET_WISH_WISH_LIST_SUCCESS,
  RESET_WISH_WISH_LIST_FAILURE,
  QUAN_INCR_WISH_LIST_REQUEST,
  QUAN_INCR_WISH_LIST_SUCCESS,
  QUAN_INCR_WISH_LIST_FAILURE,
  QUAN_DECR_WISH_LIST_REQUEST,
  QUAN_DECR_WISH_LIST_SUCCESS,
  QUAN_DECR_WISH_LIST_FAILURE,
} from '../reducers/wishList';

const getWishAPI = (table) => {
  return axios.get(`/api/wishlist/${table}`);
};

function* getWish(action) {
  try {
    const result = yield call(getWishAPI, action.payload.table);
    yield put({
      type: GET_WISH_WISH_LIST_SUCCESS,
      table: action.payload.table,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: GET_WISH_WISH_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

const addWishAPI = ({table, menuData}) => {
  const menu_name = menuData.menu_name;
  const menu_price = menuData.menu_price;
  axios.post(`/api/wishlist/${table}`, {menu_name, menu_price});
  return axios.get(`/api/wishlist/${table}`);
};

function* addWish(action) {
  try {
    const result = yield call(addWishAPI, {
      table: action.payload.table,
      menuData: action.payload.menuData,
    });
    yield put({
      type: ADD_WISH_WISH_LIST_SUCCESS,
      table: action.payload.table,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_WISH_WISH_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

const deleteWishAPI = ({table, wishData}) => {
  const menu_name = wishData.menu_name;
  axios.delete(`/api/wishlist/${table}`, {data: {menu_name}});
  return axios.get(`/api/wishlist/${table}`);
};

function* deleteWish(action) {
  try {
    const result = yield call(deleteWishAPI, {
      table: action.payload.table,
      wishData: action.payload.wishData,
    });
    yield put({
      type: DELETE_WISH_WISH_LIST_SUCCESS,
      table: action.payload.table,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_WISH_WISH_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

const resetWishAPI = (table) => {
  axios.delete(`/api/wishlist/reset/${table}`);
  return axios.get(`/api/wishlist/${table}`);
};

function* resetWish(action) {
  try {
    const result = yield call(resetWishAPI, action.payload.table);
    yield put({
      type: RESET_WISH_WISH_LIST_SUCCESS,
      table: action.payload.table,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: RESET_WISH_WISH_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

const quanIncrAPI = ({table, wishData}) => {
  const menu_name = wishData.menu_name;
  const wish_quantity = wishData.wish_quantity + 1;
  axios.patch(`/api/wishlist/${table}`, {menu_name, wish_quantity});
  return axios.get(`/api/wishlist/${table}`);
};

function* quanIncr(action) {
  try {
    const result = yield call(quanIncrAPI, {
      table: action.payload.table,
      wishData: action.payload.wishData,
    });
    yield put({
      type: QUAN_INCR_WISH_LIST_SUCCESS,
      table: action.payload.table,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: QUAN_INCR_WISH_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

const quanDecrAPI = ({table, wishData}) => {
  const menu_name = wishData.menu_name;
  const wish_quantity = wishData.wish_quantity - 1;
  axios.patch(`/api/wishlist/${table}`, {menu_name, wish_quantity});
  return axios.get(`/api/wishlist/${table}`);
};

function* quanDecr(action) {
  try {
    const result = yield call(quanDecrAPI, {
      table: action.payload.table,
      wishData: action.payload.wishData,
    });
    yield put({
      type: QUAN_DECR_WISH_LIST_SUCCESS,
      table: action.payload.table,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: QUAN_DECR_WISH_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchGetWish() {
  yield takeLatest(GET_WISH_WISH_LIST_REQUEST, getWish);
}

function* watchAddWish() {
  yield takeLatest(ADD_WISH_WISH_LIST_REQUEST, addWish);
}

function* watchDeleteWish() {
  yield takeLatest(DELETE_WISH_WISH_LIST_REQUEST, deleteWish);
}

function* watchResetWish() {
  yield takeLatest(RESET_WISH_WISH_LIST_REQUEST, resetWish);
}

function* watchQuanIncr() {
  yield takeLatest(QUAN_INCR_WISH_LIST_REQUEST, quanIncr);
}

function* watchQuanDecr() {
  yield takeLatest(QUAN_DECR_WISH_LIST_REQUEST, quanDecr);
}

export default function* wishList() {
  yield all([
    fork(watchGetWish),
    fork(watchAddWish),
    fork(watchDeleteWish),
    fork(watchResetWish),
    fork(watchQuanIncr),
    fork(watchQuanDecr),
  ]);
}
