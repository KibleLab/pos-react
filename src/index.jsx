import React from 'react';
import ReactDOM from 'react-dom';
import Main from './containers/Main';
import MenuMgnt from './containers/MenuMgnt';
import OrderSheet from './containers/OrderSheet';
import MenuSlct from './containers/MenuSlct';
import DailySales from './containers/DailySales';
import ErrorPage from './containers/ErrorPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Provider} from 'react-redux';
import rootReducer from './reducers';
import rootSaga from './sagas';
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({reducer: rootReducer, middleware: [sagaMiddleware]});
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/menu-mgnt" component={MenuMgnt} />
        <Route path="/ordersheet/:table" component={OrderSheet} />
        <Route path="/menu-slct/:table" component={MenuSlct} />
        <Route path="/dailysales" component={DailySales} />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
