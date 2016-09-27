import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from 'redux/create';
import ApiClient from 'utils/ApiClient';

import makeRoutes from './routes';

const client = new ApiClient();
const store = createStore(hashHistory, client);
const history = syncHistoryWithStore(hashHistory, store);
const routes = makeRoutes();

const mountNode = document.querySelector('#root');

ReactDOM.render(
  <Provider store={store} key="provider">
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
mountNode);
