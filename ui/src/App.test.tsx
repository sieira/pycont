import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk-recursion-detect'

import App from './App'

const mockStore = configureMockStore([thunkMiddleware])

describe('App tests', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('renders without crashing', () => {
    const store = mockStore({ isAuthenticated: false })
    const div = document.createElement('div')
    fetch.mockResponseOnce('UNAUTHORIZED', { status: 401 })
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders without crashing on isAuthenticated null', () => {
    const store = mockStore({ isAuthenticated: null })
    const div = document.createElement('div')
    fetch.mockResponseOnce('UNAUTHORIZED', { status: 401 })
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})
