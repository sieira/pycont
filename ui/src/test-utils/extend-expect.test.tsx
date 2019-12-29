import React from 'react'
import { Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk-recursion-detect'

import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'

import { defaultStoreState } from './store.test'

import Pages from '../routes/Pages'

interface TestResult {
  pass: boolean
}

//mock store
const mockStore = configureMockStore([thunkMiddleware])

// Extend expect
export function toRedirect(
  path: string,
  dest: string,
  storeValues
): TestResult {
  const history = createMemoryHistory()
  const store = mockStore(storeValues)
  history.push(path)
  render(
    <Provider store={store}>
      <Router history={history}>
        <Route component={Pages} />
      </Router>
    </Provider>
  )
  expect(history.location.pathname).toEqual(dest)
  return { pass: true }
}

export function toRequireLogin(path: string): TestResult {
  return toRedirect(path, '/login', defaultStoreState())
}

export function toRequireLogout(path: string): TestResult {
  return toRedirect(path, '/home', defaultStoreState(true))
}

export default {
  toRedirect,
  toRequireLogin,
  toRequireLogout
}
