'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/pattern-manager/App';
import store from './store';
import remote from 'remote';

require('./styles/global.scss');

require('ipc').on('action', function (type, data) {
  if (type === 'delInstance') {
    remote.getCurrentWindow().close();
    return;
  }
  store.dispatch({ type, data });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body
);