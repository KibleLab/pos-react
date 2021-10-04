import { put, call, all, fork, take, takeLatest } from 'redux-saga/effects';
import { eventChannel } from '@redux-saga/core';
import { io } from 'socket.io-client';
import axios, { AxiosResponse } from 'axios';
import { OrderData, SalesData } from '../types/sagas';

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

const socket = io('/api/dailysales', { path: '/socket', transports: ['websocket'] });

const getSalesAPI = () => {
  return eventChannel((emitter) => {
    socket.emit('GET /api/dailysales Request');
    socket.on('GET /api/dailysales Success', emitter);
    return () => {
      socket.off('GET /api/dailysales Success', emitter);
    };
  });
};

const addSalesAPI = async (payload: { orderData: OrderData }) => {
  const menu_name = payload.orderData.menu_name;
  const sales_quantity = payload.orderData.order_quantity;
  await axios.post('/api/dailysales', { menu_name, sales_quantity });
  return await axios.get('/api/dailysales');
};

const quanIncrAPI = async (payload: { orderData: OrderData; salesData: SalesData }) => {
  const menu_name = payload.salesData.menu_name;
  const sales_quantity = payload.salesData.sales_quantity + payload.orderData.order_quantity;
  await axios.patch('/api/dailysales', { menu_name, sales_quantity });
  return axios.get('/api/dailysales');
};

const resetSalesAPI = async () => {
  await axios.delete('/api/dailysales');
  return await axios.get('/api/dailysales');
};

function* getSales() {
  const channel: ReturnType<typeof getSalesAPI> = yield call(getSalesAPI);
  while (true) {
    try {
      const payload: {} = yield take(channel);
      yield put(GET_SALES_DAILY_SALES_SUCCESS({ data: payload }));
    } catch (err: any) {
      yield put(GET_SALES_DAILY_SALES_FAILURE({ error: err.response.data }));
      channel.close();
    }
  }
}

function* addSales(action: { payload: { orderData: OrderData } }) {
  try {
    const result: AxiosResponse<Array<SalesData>> = yield call(addSalesAPI, action.payload);
    yield put(ADD_SALES_DAILY_SALES_SUCCESS({ data: result.data }));
  } catch (err: any) {
    yield put(ADD_SALES_DAILY_SALES_FAILURE({ error: err.response.data }));
  }
}

function* quanIncr(action: { payload: { orderData: OrderData; salesData: SalesData } }) {
  try {
    const result: AxiosResponse<Array<SalesData>> = yield call(quanIncrAPI, action.payload);
    yield put(QUAN_INCR_DAILY_SALES_SUCCESS({ data: result.data }));
  } catch (err: any) {
    yield put(QUAN_INCR_DAILY_SALES_FAILURE({ error: err.response.data }));
  }
}

function* resetSales() {
  try {
    const result: AxiosResponse<Array<SalesData>> = yield call(resetSalesAPI);
    yield put(RESET_SALES_DAILY_SALES_SUCCESS({ data: result.data }));
  } catch (err: any) {
    yield put(RESET_SALES_DAILY_SALES_FAILURE({ error: err.response.data }));
  }
}

function* watchGetSales() {
  yield takeLatest(GET_SALES_DAILY_SALES_REQUEST, getSales);
}

function* watchAddSales() {
  yield takeLatest(ADD_SALES_DAILY_SALES_REQUEST, addSales);
}

function* watchQuanIncr() {
  yield takeLatest(QUAN_INCR_DAILY_SALES_REQUEST, quanIncr);
}

function* watchResetSales() {
  yield takeLatest(RESET_SALES_DAILY_SALES_REQUEST, resetSales);
}

export default function* dailySales() {
  yield all([fork(watchGetSales), fork(watchAddSales), fork(watchQuanIncr), fork(watchResetSales)]);
}
