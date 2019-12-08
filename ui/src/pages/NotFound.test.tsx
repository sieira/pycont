import React from 'react'
import { Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { create } from 'react-test-renderer'

import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk-recursion-detect'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'

import Pages from '../routes/Pages'
import NotFound from './NotFound'

const mockStore = configureMockStore([thunkMiddleware])
const store = mockStore({})

it('renders without crashing', () => {
  const notFoundPage = create(<NotFound />)
  expect(notFoundPage.toJSON()).toMatchSnapshot()
})

it('should land here when the URL is unknown', () => {
  const history = createMemoryHistory()

  history.push('/hoola-kaboola')

  const { getByRole } = render(
    <Provider store={store}>
      <Router history={history}>
        <Route component={Pages} />
      </Router>
    </Provider>
  )
  expect(getByRole('heading')).toHaveTextContent('404')
})
