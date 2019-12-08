import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk-recursion-detect'

export function createWithProvider(element, authState) {
  const mockStore = configureMockStore([thunkMiddleware])
  const store = mockStore({ isAuthenticated: authState })
  return create(
    <Provider store={store}>
      <MemoryRouter>{element}</MemoryRouter>
    </Provider>
  )
}

export default {
  createWithProvider
}
