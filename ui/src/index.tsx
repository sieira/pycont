import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { compose, createStore } from 'redux';

import './index.css';
import App from './App';
import authReducer from './store/auth/reducers';
import * as serviceWorker from './serviceWorker';

let composeEnhancers;

if (
  process.env.NODE_ENV !== 'production'
  && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
} else {
  composeEnhancers = compose;
}

const store = createStore<IAuth, any, any, any>(
  authReducer,
  undefined,
  composeEnhancers(),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
