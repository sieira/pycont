import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk-recursion-detect'

import { mount } from 'enzyme'

import { Account } from '../../store/accounts/types'
import AccountSummary from './account-summary'

import { createWithProvider } from '../../test-utils/render-utils.test'

const mockStore = configureMockStore([thunkMiddleware])
const store = mockStore({ auth: { isAuthenticated: false } })

it('should render without crashing', () => {
  const accountSummary = createWithProvider(
    <AccountSummary account={{ name: 'SomeAccount', balance: 200 }} />
  )
  expect(accountSummary.toJSON()).toMatchSnapshot()
})

it('should toggle isEditing when click on edit', () => {
  const wrapper = mount(
    <Provider store={store}>
      <AccountSummary account={{ name: 'SomeAccount', balance: 200 }} />
    </Provider>
  )
  const accountSummary = wrapper.find('AccountSummary')
  expect(accountSummary.state('isEditing')).toBe(false)
  const editButton = accountSummary.find('button')
  expect(editButton.props().disabled).toBe(false)
  editButton.simulate('click')
  expect(accountSummary.state('isEditing')).toBe(true)
})
