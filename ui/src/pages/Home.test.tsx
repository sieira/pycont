import React from 'react'

import Home from './Home'

it('renders without crashing', () => {
  const homePage = shallow(<Home />)
  expect(homePage).toMatchSnapshot()
})

it('requires login', () => {
  expect('/home').toRequireLogin()
})
