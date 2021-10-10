import { put, call, all, fork, take, takeLeading, takeLatest } from 'redux-saga/effects';
import { eventChannel } from '@redux-saga/core';
import { io } from 'socket.io-client';
import axios, { AxiosResponse } from 'axios';
import { MenuData } from '../types/sagas';

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

const socket = io('/api/menu-slct', { path: '/socket', transports: ['websocket'] });

const getMenuAPI = () => {
  return eventChannel((emitter) => {
    socket.emit('GET /api/menu-mgnt Request');
    socket.on('GET /api/menu-mgnt Success', emitter);
    return () => {
      socket.off('GET /api/menu-mgnt Success', emitter);
    };
  });
};

const addMenuAPI = async (payload: { addData: MenuData }) => {
  const menu_name = payload.addData.menu_name;
  const menu_price = payload.addData.menu_price;
  const menu_stock = payload.addData.menu_stock;
  await axios.post('/api/menu-slct', { menu_name, menu_price, menu_stock });
  return await axios.get(`/api/menu-mgnt`);
};

const editStockAPI = async (payload: { editData: MenuData }) => {
  const menu_name = payload.editData.menu_name;
  const menu_stock = payload.editData.menu_stock;
  await axios.patch('/api/menu-slct', { menu_name, menu_stock });
  return await axios.get('/api/menu-mgnt');
};

const changeMenuAPI = async (payload: { menuData: MenuData }) => {
  const menu_name = payload.menuData.menu_name;
  const menu_stock = payload.menuData.menu_stock;
  await axios.patch('/api/menu-slct', { menu_name, menu_stock });
  return await axios.get('/api/menu-mgnt');
};

const deleteMenuAPI = async (payload: { delData: MenuData }) => {
  const menu_name = payload.delData.menu_name;
  await axios.delete('/api/menu-slct', { data: { menu_name } });
  return await axios.get('/api/menu-mgnt');
};

function* getMenu() {
  const channel: ReturnType<typeof getMenuAPI> = yield call(getMenuAPI);
  while (true) {
    try {
      const payload: {} = yield take(channel);
      yield put(GET_MENU_MENU_MGNT_SUCCESS({ data: payload }));
    } catch (err: any) {
      yield put(GET_MENU_MENU_MGNT_FAILURE({ error: err.response.data }));
      channel.close();
    }
  }
}

function* addMenu(action: { payload: { addData: MenuData } }) {
  try {
    const result: AxiosResponse<Array<MenuData>> = yield call(addMenuAPI, action.payload);
    yield put(ADD_MENU_MENU_MGNT_SUCCESS({ data: result.data }));
  } catch (err: any) {
    yield put(ADD_MENU_MENU_MGNT_FAILURE({ error: err.response.data }));
  }
}

function* editStock(action: { payload: { editData: MenuData } }) {
  try {
    const result: AxiosResponse<Array<MenuData>> = yield call(editStockAPI, action.payload);
    yield put(EDIT_STOCK_MENU_MGNT_SUCCESS({ data: result.data }));
  } catch (err: any) {
    yield put(EDIT_STOCK_MENU_MGNT_FAILURE({ error: err.response.data }));
  }
}

function* changeMenu(action: { payload: { menuData: MenuData } }) {
  try {
    const result: AxiosResponse<Array<MenuData>> = yield call(changeMenuAPI, action.payload);
    yield put(CHANGE_MENU_MENU_MGNT_SUCCESS({ data: result.data }));
  } catch (err: any) {
    yield put(CHANGE_MENU_MENU_MGNT_FAILURE({ error: err.response.data }));
  }
}

function* deleteMenu(action: { payload: { delData: MenuData } }) {
  try {
    const result: AxiosResponse<Array<MenuData>> = yield call(deleteMenuAPI, action.payload);
    yield put(DELETE_MENU_MENU_MGNT_SUCCESS({ data: result.data }));
  } catch (err: any) {
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
