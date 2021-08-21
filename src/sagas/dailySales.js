import {put, call, all, fork, take, takeEvery, takeLatest} from 'redux-saga/effects';
import {eventChannel} from '@redux-saga/core';
import {io} from 'socket.io-client';
import axios from 'axios';

import {
  GET_SALES_DAILY_SALES_REQUEST,
  GET_SALES_DAILY_SALES_SUCCESS,
  GET_SALES_DAILY_SALES_FAILURE,
  ADD_SALES_DAILY_SALES_REQUEST,
  ADD_SALES_DAILY_SALES_SUCCESS,
  ADD_SALES_DAILY_SALES_FAILURE,
  QUAN_INCR_DAILY_SALES_REQUEST,
  QUAN_INCR_DAILY_SALES_SUCCESS,
  QUAN_INCR_DAILY_SALES_FAILURE,
  RESET_SALES_DAILY_SALES_REQUEST,
  RESET_SALES_DAILY_SALES_SUCCESS,
  RESET_SALES_DAILY_SALES_FAILURE,
} from '../reducers/dailySales';

const socket = io('/api/dailysales', {path: '/socket', transports: ['websocket']});

const getSalesAPI = () => {
  return eventChannel((emit) => {
    const emitter = (result) => {
      emit(result);
    };
    socket.emit('GET /api/dailysales Request');
    socket.on('GET /api/dailysales Success', emitter);
  });
};

const addSalesAPI = (orderData) => {
  const menu_name = orderData.menu_name;
  const sales_quantity = orderData.order_quantity;
  const menu_price = orderData.menu_price;
  const total_price = orderData.menu_price * orderData.order_quantity;
  axios.post('/api/dailysales', {
    menu_name,
    sales_quantity,
    menu_price,
    total_price,
  });
  return axios.get('/api/dailysales');
};

const quanIncrAPI = ({orderData, salesData}) => {
  const menu_name = salesData.menu_name;
  const sales_quantity = salesData.sales_quantity + orderData.order_quantity;
  const total_price = salesData.menu_price * sales_quantity;
  axios.patch('/api/dailysales', {menu_name, sales_quantity, total_price});
  return axios.get('/api/dailysales');
};

const resetSalesAPI = () => {
  axios.delete('/api/dailysales');
  return axios.get('/api/dailysales');
};

function* getSales() {
  try {
    const result = yield call(getSalesAPI);
    while (true) {
      const channel = yield take(result);
      yield put(GET_SALES_DAILY_SALES_SUCCESS({data: channel}));
    }
  } catch (err) {
    yield put(GET_SALES_DAILY_SALES_FAILURE({error: err.response.data}));
  }
}

function* addSales(action) {
  try {
    const result = yield call(addSalesAPI, action.payload.orderData);
    yield put(ADD_SALES_DAILY_SALES_SUCCESS({data: result.data}));
  } catch (err) {
    yield put(ADD_SALES_DAILY_SALES_FAILURE({error: err.response.data}));
  }
}

function* quanIncr(action) {
  try {
    const result = yield call(quanIncrAPI, {
      orderData: action.payload.orderData,
      salesData: action.payload.salesData,
    });
    yield put(QUAN_INCR_DAILY_SALES_SUCCESS({data: result.data}));
  } catch (err) {
    yield put(QUAN_INCR_DAILY_SALES_FAILURE({error: err.response.data}));
  }
}

function* resetSales() {
  try {
    const result = yield call(resetSalesAPI);
    yield put(RESET_SALES_DAILY_SALES_SUCCESS({data: result.data}));
  } catch (err) {
    yield put(RESET_SALES_DAILY_SALES_FAILURE({error: err.response.data}));
  }
}

function* watchGetSales() {
  yield takeLatest(GET_SALES_DAILY_SALES_REQUEST, getSales);
}

function* watchAddSales() {
  yield takeEvery(ADD_SALES_DAILY_SALES_REQUEST, addSales);
}

function* watchQuanIncr() {
  yield takeEvery(QUAN_INCR_DAILY_SALES_REQUEST, quanIncr);
}

function* watchResetSales() {
  yield takeLatest(RESET_SALES_DAILY_SALES_REQUEST, resetSales);
}

export default function* dailySales() {
  yield all([fork(watchGetSales), fork(watchAddSales), fork(watchQuanIncr), fork(watchResetSales)]);
}
