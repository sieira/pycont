import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk-recursion-detect'

import { defaultStoreState } from './store.test'

export function createWithProvider(element, state): TestRenderer {
  const mockStore = configureMockStore([thunkMiddleware])
  const store = mockStore(state || defaultStoreState())
  return create(
    <Provider store={store}>
      <MemoryRouter>{element}</MemoryRouter>
    </Provider>
  )
}

export default {
  createWithProvider,
}
