import {combineReducers} from 'redux';
import menuManagement from './menuManagement';
import menuSelect from './menuSelect';
import orderSheet from './orderSheet';
import modal from './modal';
import select from './select';
import dailySales from './dailySales';
import main from './main';

const rootReducer = combineReducers({
  menuManagement,
  menuSelect,
  orderSheet,
  modal,
  select,
  dailySales,
  main,
});

export default rootReducer;
