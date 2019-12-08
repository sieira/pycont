import React from 'react'
import { create } from 'react-test-renderer'

import Landing from './Landing'

it('Landing should render without crashing', () => {
  const landingPage = create(<Landing />)
  expect(landingPage.toJSON()).toMatchSnapshot()
})
