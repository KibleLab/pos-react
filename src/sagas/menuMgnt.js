import { put, call, all, fork, take, takeLeading, takeLatest } from 'redux-saga/effects';
import { eventChannel } from '@redux-saga/core';
import { io } from 'socket.io-client';
import axios from 'axios';

import {
  GET_MENU_MENU_MGNT_REQUEST,
  GET_MENU_MENU_MGNT_SUCCESS,
  GET_MENU_MENU_MGNT_FAILURE,
  ADD_MENU_MENU_MGNT_REQUEST,
  ADD_MENU_MENU_MGNT_SUCCESS,
  ADD_MENU_MENU_MGNT_FAILURE,
  EDIT_STOCK_MENU_MGNT_REQUEST,
  EDIT_STOCK_MENU_MGNT_SUCCESS,
  EDIT_STOCK_MENU_MGNT_FAILURE,
  CHANGE_MENU_MENU_MGNT_REQUEST,
  CHANGE_MENU_MENU_MGNT_SUCCESS,
  CHANGE_MENU_MENU_MGNT_FAILURE,
  DELETE_MENU_MENU_MGNT_REQUEST,
  DELETE_MENU_MENU_MGNT_SUCCESS,
  DELETE_MENU_MENU_MGNT_FAILURE,
} from '../reducers/menuMgnt';

const socket = io('/api/menu-mgnt', { path: '/socket', transports: ['websocket'] });

const getMenuAPI = () => {
  return eventChannel((emitter) => {
    socket.emit('GET /api/menu-mgnt Request');
    socket.on('GET /api/menu-mgnt Success', emitter);
  });
};

const addMenuAPI = async ({ addData }) => {
  const menu_name = addData.menu_name;
  const menu_price = addData.menu_price;
  const menu_stock = addData.menu_stock;
  await axios.post('/api/menu-slct', { menu_name, menu_price, menu_stock });
  return await axios.get(`/api/menu-slct`);
};

const editStockAPI = async ({ editData }) => {
  const menu_name = editData.menu_name;
  const menu_stock = editData.menu_stock;
  await axios.patch('/api/menu-slct', { menu_name, menu_stock });
  return await axios.get('/api/menu-slct');
};

const changeMenuAPI = async ({ menuData }) => {
  const menu_name = menuData.menu_name;
  const menu_stock = menuData.menu_stock;
  await axios.patch('/api/menu-slct', { menu_name, menu_stock });
  return await axios.get('/api/menu-slct');
};

const deleteMenuAPI = async ({ delData }) => {
  const menu_name = delData.menu_name;
  await axios.delete('/api/menu-slct', { data: { menu_name } });
  return await axios.get('/api/menu-slct');
};

function* getMenu() {
  try {
    const result = yield call(getMenuAPI);
    while (true) {
      const channel = yield take(result);
      yield put(GET_MENU_MENU_MGNT_SUCCESS({ data: channel }));
    }
  } catch (err) {
    yield put(GET_MENU_MENU_MGNT_FAILURE({ error: err.response.data }));
  }
}

function* addMenu(action) {
  try {
    const result = yield call(addMenuAPI, { addData: action.payload.addData });
    yield put(ADD_MENU_MENU_MGNT_SUCCESS({ data: result.data }));
  } catch (err) {
    yield put(ADD_MENU_MENU_MGNT_FAILURE({ error: err.response.data }));
  }
}

function* editStock(action) {
  try {
    const result = yield call(editStockAPI, { editData: action.payload.editData });
    yield put(EDIT_STOCK_MENU_MGNT_SUCCESS({ data: result.data }));
  } catch (err) {
    yield put(EDIT_STOCK_MENU_MGNT_FAILURE({ error: err.response.data }));
  }
}

function* changeMenu(action) {
  try {
    const result = yield call(changeMenuAPI, { menuData: action.payload.menuData });
    yield put(CHANGE_MENU_MENU_MGNT_SUCCESS({ data: result.data }));
  } catch (err) {
    yield put(CHANGE_MENU_MENU_MGNT_FAILURE({ error: err.response.data }));
  }
}

function* deleteMenu(action) {
  try {
    const result = yield call(deleteMenuAPI, { delData: action.payload.delData });
    yield put(DELETE_MENU_MENU_MGNT_SUCCESS({ data: result.data }));
  } catch (err) {
    yield put(DELETE_MENU_MENU_MGNT_FAILURE({ error: err.response.data }));
  }
}

function* watchGetMenu() {
  yield takeLatest(GET_MENU_MENU_MGNT_REQUEST, getMenu);
}

function* watchAddMenu() {
  yield takeLeading(ADD_MENU_MENU_MGNT_REQUEST, addMenu);
}

function* watchEditStock() {
  yield takeLeading(EDIT_STOCK_MENU_MGNT_REQUEST, editStock);
}

function* watchChangeMenu() {
  yield takeLatest(CHANGE_MENU_MENU_MGNT_REQUEST, changeMenu);
}

function* watchDeleteMenu() {
  yield takeLeading(DELETE_MENU_MENU_MGNT_REQUEST, deleteMenu);
}

export default function* menuMgnt() {
  yield all([
    fork(watchGetMenu),
    fork(watchAddMenu),
    fork(watchEditStock),
    fork(watchChangeMenu),
    fork(watchDeleteMenu),
  ]);
}
