import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk-recursion-detect'

import authReducer from './auth/reducers'
import { AuthState } from './auth/types'

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

export default store
