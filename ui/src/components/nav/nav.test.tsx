import React from 'react'
import { createWithProvider } from '../../test-utils/render-utils.test'

import Nav from '.'

it('renders without crashing', () => {
  const navBar = createWithProvider(<Nav />)
  expect(navBar.toJSON()).toMatchSnapshot()
})

it('renders logged in without crashing', () => {
  const navBar = createWithProvider(<Nav />, {
    auth: {
      isAuthenticated: true,
      currentUser: { username: 'Schwarzenegger' },
    },
    accounts: {},
  })
  expect(navBar.toJSON()).toMatchSnapshot()
})
