import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk-recursion-detect'

import authReducer from './auth/reducers'

let composeEnhancers

if (
  process.env.NODE_ENV !== 'production' &&
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
} else {
  composeEnhancers = compose
}

const store = createStore(
  authReducer,
  undefined,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store
