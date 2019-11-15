/* eslint-disable import/first */
import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
/* eslint-enable import/first */

import reducer from './reducers';
import Routes from './components/Routes';
import { SHOW_DEV_TOOLS, IS_PROD } from './constants';
import { register } from './utils/serviceworker';

const composeEnhancers = (SHOW_DEV_TOOLS && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; // eslint-disable-line no-underscore-dangle

const store = createStore(reducer, {}, composeEnhancers(applyMiddleware(...[thunk])));

const rootEl = document.getElementById('main');
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    rootEl
  );
};

register();

if (module.hot && !IS_PROD) {
  module.hot.accept('./components/Routes', () => {
    render();
  });
}

render();
