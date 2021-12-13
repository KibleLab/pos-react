import { put, call, all, fork, take, takeLatest } from 'redux-saga/effects';
import { eventChannel } from '@redux-saga/core';
import { io } from 'socket.io-client';
import axios, { AxiosResponse } from 'axios';
import { OrderData, SalesData } from '../types/sagas';

import { dailySalesActions } from '../reducers/dailySales';

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
      yield put(dailySalesActions.getSales_success({ data: payload }));
    } catch (err: any) {
      yield put(dailySalesActions.getSales_failure({ error: err.response.data }));
      channel.close();
    }
  }
}

function* addSales(action: { payload: { orderData: OrderData } }) {
  try {
    const result: AxiosResponse<Array<SalesData>> = yield call(addSalesAPI, action.payload);
    yield put(dailySalesActions.addSales_success({ data: result.data }));
  } catch (err: any) {
    yield put(dailySalesActions.addSales_failure({ error: err.response.data }));
  }
}

function* quanIncr(action: { payload: { orderData: OrderData; salesData: SalesData } }) {
  try {
    const result: AxiosResponse<Array<SalesData>> = yield call(quanIncrAPI, action.payload);
    yield put(dailySalesActions.quanIncr_success({ data: result.data }));
  } catch (err: any) {
    yield put(dailySalesActions.quanIncr_failure({ error: err.response.data }));
  }
}

function* resetSales() {
  try {
    const result: AxiosResponse<Array<SalesData>> = yield call(resetSalesAPI);
    yield put(dailySalesActions.resetSales_success({ data: result.data }));
  } catch (err: any) {
    yield put(dailySalesActions.resetSales_failure({ error: err.response.data }));
  }
}

function* watchGetSales() {
  yield takeLatest(dailySalesActions.getSales_request, getSales);
}

function* watchAddSales() {
  yield takeLatest(dailySalesActions.addSales_request, addSales);
}

function* watchQuanIncr() {
  yield takeLatest(dailySalesActions.quanIncr_request, quanIncr);
}

function* watchResetSales() {
  yield takeLatest(dailySalesActions.resetSales_request, resetSales);
}

export default function* dailySales() {
  yield all([fork(watchGetSales), fork(watchAddSales), fork(watchQuanIncr), fork(watchResetSales)]);
}
