import {put, call, all, fork, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_ORDER_ORDER_SHEET_REQUEST,
  GET_ORDER_ORDER_SHEET_SUCCESS,
  GET_ORDER_ORDER_SHEET_FAILURE,
  ADD_ORDER_ORDER_SHEET_REQUEST,
  ADD_ORDER_ORDER_SHEET_SUCCESS,
  ADD_ORDER_ORDER_SHEET_FAILURE,
  QUAN_INCR_ORDER_SHEET_REQUEST,
  QUAN_INCR_ORDER_SHEET_SUCCESS,
  QUAN_INCR_ORDER_SHEET_FAILURE,
  RESET_ORDER_ORDER_SHEET_REQUEST,
  RESET_ORDER_ORDER_SHEET_SUCCESS,
  RESET_ORDER_ORDER_SHEET_FAILURE,
} from '../reducers/orderSheet';

const getOrderAPI = (table) => {
  return axios.get(`/api/ordersheet/${table}`);
};

function* getOrder(action) {
  try {
    const result = yield call(getOrderAPI, action.payload.table);
    yield put({
      type: GET_ORDER_ORDER_SHEET_SUCCESS,
      table: action.payload.table,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: GET_ORDER_ORDER_SHEET_FAILURE,
      error: err.response.data,
    });
  }
}

const addOrderAPI = ({table, wishData}) => {
  const menu_name = wishData.menu_name;
  const menu_price = wishData.menu_price;
  const order_quantity = wishData.wish_quantity;
  axios.post(`/api/ordersheet/${table}`, {menu_name, menu_price, order_quantity});
  return axios.get(`/api/ordersheet/${table}`);
};

function* addOrder(action) {
  try {
    const result = yield call(addOrderAPI, {
      table: action.payload.table,
      wishData: action.payload.wishData,
    });
    yield put({
      type: ADD_ORDER_ORDER_SHEET_SUCCESS,
      table: action.payload.table,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_ORDER_ORDER_SHEET_FAILURE,
      error: err.response.data,
    });
  }
}

const quanIncrAPI = ({table, wishData, orderData}) => {
  const menu_name = orderData.menu_name;
  const order_quantity = orderData.order_quantity + wishData.wish_quantity;
  axios.patch(`/api/ordersheet/${table}`, {menu_name, order_quantity});
  return axios.get(`/api/ordersheet/${table}`);
};

function* quanIncr(action) {
  try {
    const result = yield call(quanIncrAPI, {
      table: action.payload.table,
      wishData: action.payload.wishData,
      orderData: action.payload.orderData,
    });
    yield put({
      type: QUAN_INCR_ORDER_SHEET_SUCCESS,
      table: action.payload.table,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: QUAN_INCR_ORDER_SHEET_FAILURE,
      error: err.response.data,
    });
  }
}

const resetOrderAPI = (table) => {
  axios.delete(`/api/ordersheet/${table}`);
  return axios.get(`/api/ordersheet/${table}`);
};

function* resetOrder(action) {
  try {
    const result = yield call(resetOrderAPI, action.payload.table);
    yield put({
      type: RESET_ORDER_ORDER_SHEET_SUCCESS,
      table: action.payload.table,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: RESET_ORDER_ORDER_SHEET_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchGetOrder() {
  yield takeLatest(GET_ORDER_ORDER_SHEET_REQUEST, getOrder);
}

function* watchAddOrder() {
  yield takeLatest(ADD_ORDER_ORDER_SHEET_REQUEST, addOrder);
}

function* watchQuanIncr() {
  yield takeLatest(QUAN_INCR_ORDER_SHEET_REQUEST, quanIncr);
}

function* watchResetOrder() {
  yield takeLatest(RESET_ORDER_ORDER_SHEET_REQUEST, resetOrder);
}

export default function* orderSheet() {
  yield all([fork(watchGetOrder), fork(watchAddOrder), fork(watchQuanIncr), fork(watchResetOrder)]);
}
