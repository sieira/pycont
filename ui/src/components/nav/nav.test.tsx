import React from 'react'
import { createWithProvider } from '../../test-utils/render-utils.test'

import Nav from '.'

it('renders without crashing', () => {
  const navBar = createWithProvider(<Nav />)
  expect(navBar.toJSON()).toMatchSnapshot()
})

it('renders logged in without crashing', () => {
  const navBar = createWithProvider(<Nav />, {
    isAuthenticated: true,
    currentUser: { username: 'Schwarzenegger' }
  })
  expect(navBar.toJSON()).toMatchSnapshot()
})
