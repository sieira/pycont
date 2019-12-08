import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk-recursion-detect'

import { authenticate } from '../../store/auth/actions'

import Nav from '.'

const mockStore = configureMockStore([thunkMiddleware])

it('renders without crashing', () => {
  const store = mockStore({})
  const navBar = create(
    <Provider store={store}>
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    </Provider>
  )
  expect(navBar.toJSON()).toMatchSnapshot()
})

it('renders logged in without crashing', () => {
  const store = mockStore({ isAuthenticated: true })
  const navBar = create(
    <Provider store={store}>
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    </Provider>
  )
  expect(navBar.toJSON()).toMatchSnapshot()
})
