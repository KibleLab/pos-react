import { put, call, all, fork, take, takeLeading, takeLatest } from 'redux-saga/effects';
import { eventChannel } from '@redux-saga/core';
import { io } from 'socket.io-client';
import axios, { AxiosResponse } from 'axios';
import { MenuData } from '../types/sagas';

import { menuMgntActions } from '../reducers/menuMgnt';

const socket = io('/api/menu-mgnt', { path: '/socket', transports: ['websocket'] });

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
  return await axios.get(`/api/menu-slct`);
};

const editStockAPI = async (payload: { editData: MenuData }) => {
  const menu_name = payload.editData.menu_name;
  const menu_stock = payload.editData.menu_stock;
  await axios.patch('/api/menu-slct', { menu_name, menu_stock });
  return await axios.get('/api/menu-slct');
};

const changeMenuAPI = async (payload: { menuData: MenuData }) => {
  const menu_name = payload.menuData.menu_name;
  const menu_stock = payload.menuData.menu_stock;
  await axios.patch('/api/menu-slct', { menu_name, menu_stock });
  return await axios.get('/api/menu-slct');
};

const deleteMenuAPI = async (payload: { delData: MenuData }) => {
  const menu_name = payload.delData.menu_name;
  await axios.delete('/api/menu-slct', { data: { menu_name } });
  return await axios.get('/api/menu-slct');
};

function* getMenu() {
  const channel: ReturnType<typeof getMenuAPI> = yield call(getMenuAPI);
  while (true) {
    try {
      const payload: {} = yield take(channel);
      yield put(menuMgntActions.getMenu_success({ data: payload }));
    } catch (err: any) {
      yield put(menuMgntActions.getMenu_Failure({ error: err.response.data }));
      channel.close();
    }
  }
}

function* addMenu(action: { payload: { addData: MenuData } }) {
  try {
    const result: AxiosResponse<Array<MenuData>> = yield call(addMenuAPI, action.payload);
    yield put(menuMgntActions.addMenu_success({ data: result.data }));
  } catch (err: any) {
    yield put(menuMgntActions.addMenu_Failure({ error: err.response.data }));
  }
}

function* editStock(action: { payload: { editData: MenuData } }) {
  try {
    const result: AxiosResponse<Array<MenuData>> = yield call(editStockAPI, action.payload);
    yield put(menuMgntActions.editStock_success({ data: result.data }));
  } catch (err: any) {
    yield put(menuMgntActions.editStock_Failure({ error: err.response.data }));
  }
}

function* changeMenu(action: { payload: { menuData: MenuData } }) {
  try {
    const result: AxiosResponse<Array<MenuData>> = yield call(changeMenuAPI, action.payload);
    yield put(menuMgntActions.changeMenu_success({ data: result.data }));
  } catch (err: any) {
    yield put(menuMgntActions.changeMenu_Failure({ error: err.response.data }));
  }
}

function* deleteMenu(action: { payload: { delData: MenuData } }) {
  try {
    const result: AxiosResponse<Array<MenuData>> = yield call(deleteMenuAPI, action.payload);
    yield put(menuMgntActions.deleteMenu_success({ data: result.data }));
  } catch (err: any) {
    yield put(menuMgntActions.deleteMenu_Failure({ error: err.response.data }));
  }
}

function* watchGetMenu() {
  yield takeLatest(menuMgntActions.getMenu_request, getMenu);
}

function* watchAddMenu() {
  yield takeLeading(menuMgntActions.addMenu_request, addMenu);
}

function* watchEditStock() {
  yield takeLeading(menuMgntActions.editStock_request, editStock);
}

function* watchChangeMenu() {
  yield takeLatest(menuMgntActions.changeMenu_request, changeMenu);
}

function* watchDeleteMenu() {
  yield takeLeading(menuMgntActions.deleteMenu_request, deleteMenu);
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
