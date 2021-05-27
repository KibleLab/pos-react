import React from 'react';
import ReactDOM from 'react-dom';
import Main from './containers/Main';
import MenuManagement from './containers/MenuManagement';
import OrderSheet from './containers/OrderSheet';
import MenuSelect from './containers/MenuSelect';
import DailySalesStatus from './containers/DailySalesStatus';
import ErrorPage from './containers/ErrorPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Provider} from 'react-redux';
import rootReducer from './reducers';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({reducer: rootReducer});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/MenuManagement" component={MenuManagement} />
        <Route path="/OrderSheet/:table_no" component={OrderSheet} />
        <Route path="/MenuSelect/:table_no" component={MenuSelect} />
        <Route path="/DailySalesStatus" component={DailySalesStatus} />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
