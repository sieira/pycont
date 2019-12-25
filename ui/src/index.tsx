import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk-recursion-detect'

import './index.css'

import App from './App'
import authReducer from './store/auth/reducers'
import { AuthState } from './store/auth/types'
import * as serviceWorker from './serviceWorker'

let composeEnhancers

if (
  process.env.NODE_ENV !== 'production' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
} else {
  composeEnhancers = compose
}

const store = createStore<AuthState, any, any, any>(
  authReducer,
  undefined,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

ReactDOM.render(
  <>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossOrigin="anonymous"
    />
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.getElementById('root')
)

serviceWorker.unregister()
