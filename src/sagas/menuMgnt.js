import {put, call, all, fork, takeEvery, takeLatest} from 'redux-saga/effects';
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

const getMenuAPI = () => {
  return axios.get('/api/menu-mgnt');
};

function* getMenu() {
  try {
    const result = yield call(getMenuAPI);
    yield put({
      type: GET_MENU_MENU_MGNT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: GET_MENU_MENU_MGNT_FAILURE,
      error: err.response.data,
    });
  }
}

const addMenuAPI = (addData) => {
  const menu_name = addData.menu_name;
  const menu_price = addData.menu_price;
  const menu_stock = addData.menu_stock;
  axios.post('/api/menu-mgnt', {menu_name, menu_price, menu_stock});
  axios.post('/api/menu-slct', {menu_name, menu_price, menu_stock});
  return axios.get(`/api/menu-mgnt`);
};

function* addMenu(action) {
  try {
    const result = yield call(addMenuAPI, action.payload.addData);
    yield put({
      type: ADD_MENU_MENU_MGNT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_MENU_MENU_MGNT_FAILURE,
      error: err.response.data,
    });
  }
}

const editStockAPI = (editData) => {
  const menu_name = editData.menu_name;
  const menu_stock = editData.menu_stock;
  axios.patch('/api/menu-mgnt', {menu_name, menu_stock});
  axios.patch('/api/menu-slct', {menu_name, menu_stock});
  return axios.get('/api/menu-mgnt');
};

function* editStock(action) {
  try {
    const result = yield call(editStockAPI, action.payload.editData);
    yield put({
      type: EDIT_STOCK_MENU_MGNT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: EDIT_STOCK_MENU_MGNT_FAILURE,
      error: err.response.data,
    });
  }
}

const changeMenuAPI = (menuData) => {
  const menu_name = menuData.menu_name;
  const menu_stock = menuData.menu_stock;
  axios.patch('/api/menu-mgnt', {menu_name, menu_stock});
  axios.patch('/api/menu-slct', {menu_name, menu_stock});
  return axios.get('/api/menu-mgnt');
};

function* changeMenu(action) {
  try {
    const result = yield call(changeMenuAPI, action.payload.menuData);
    yield put({
      type: CHANGE_MENU_MENU_MGNT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: CHANGE_MENU_MENU_MGNT_FAILURE,
      error: err.response.data,
    });
  }
}

const deleteMenuAPI = (delData) => {
  const menu_name = delData.menu_name;
  axios.delete('/api/menu-mgnt', {data: {menu_name}});
  axios.delete('/api/menu-slct', {data: {menu_name}});
  return axios.get('/api/menu-mgnt');
};

function* deleteMenu(action) {
  try {
    const result = yield call(deleteMenuAPI, action.payload.delData);
    yield put({
      type: DELETE_MENU_MENU_MGNT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_MENU_MENU_MGNT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchGetMenu() {
  yield takeLatest(GET_MENU_MENU_MGNT_REQUEST, getMenu);
}

function* watchAddMenu() {
  yield takeLatest(ADD_MENU_MENU_MGNT_REQUEST, addMenu);
}

function* watchEditStock() {
  yield takeLatest(EDIT_STOCK_MENU_MGNT_REQUEST, editStock);
}

function* watchChangeMenu() {
  yield takeEvery(CHANGE_MENU_MENU_MGNT_REQUEST, changeMenu);
}

function* watchDeleteMenu() {
  yield takeLatest(DELETE_MENU_MENU_MGNT_REQUEST, deleteMenu);
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
