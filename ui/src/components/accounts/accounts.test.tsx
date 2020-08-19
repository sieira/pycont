import React from 'react'
import AccountList from './accounts'

import { createWithProvider } from '../../test-utils/render-utils.test'

describe('Accounts tests', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('Should show accounts if fetched', () => {
    const accounts = createWithProvider(<AccountList />, {
      accounts: {
        accountList: [{ name: 'Account1' }, { name: 'Account2' }],
        fetched: true,
      },
    })
    expect(accounts).toMatchSnapshot()
  })

  it('Should show loader if not fetched', () => {
    fetch.mockResponseOnce(JSON.stringify([]))
    const accounts = createWithProvider(<AccountList />, {
      accounts: {
        accountList: undefined,
        fetched: false,
      },
    })
    expect(accounts).toMatchSnapshot()
  })
})
