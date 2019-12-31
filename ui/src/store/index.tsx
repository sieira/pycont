import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk-recursion-detect'

import { UNAUTHENTICATE } from './auth/constants'
import authReducer from './auth/reducer'
import accountsReducer from './accounts/reducer'
import { PycontState } from './types'

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

const appReducer = combineReducers({
  auth: authReducer,
  accounts: accountsReducer
})

export const rootReducer = (state, action): PycontState => {
  if (action.type === UNAUTHENTICATE) {
    state = undefined
  }
  return appReducer(state, action)
}

const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store
