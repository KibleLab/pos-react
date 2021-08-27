import { combineReducers } from 'redux';
import menuMgnt from './menuMgnt';
import menuSlct from './menuSlct';
import wishList from './wishList';
import orderSheet from './orderSheet';
import dailySales from './dailySales';
import tableMgnt from './tableMgnt';
import modal from './modal';
import select from './select';

const rootReducer = combineReducers({
  menuMgnt,
  menuSlct,
  wishList,
  orderSheet,
  dailySales,
  tableMgnt,
  modal,
  select,
});

export default rootReducer;
