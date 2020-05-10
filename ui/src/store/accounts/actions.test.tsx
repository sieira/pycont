import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk-recursion-detect'

import { fetchData, fetchAccounts } from './actions'
import { FETCH } from './constants'

describe('Account actions', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('Sets fetched on fetchData', () => {
    expect(fetchData([])).toEqual({
      payload: { accountList: [], fetched: true },
      type: FETCH,
    })
  })

  it('fetchData on fetch accounts', () => {
    const mockStore = configureMockStore([thunkMiddleware])
    const store = mockStore()
    const accounts = [{ name: 'Account1' }, { name: 'Account2' }]
    fetch.mockResponseOnce(JSON.stringify({ accounts: accounts }), {
      status: 200,
    })
    const unsubscribe = store.subscribe(() => {
      unsubscribe()
      expect(store.getActions()).toEqual([
        {
          type: FETCH,
          payload: { accountList: { accounts: accounts }, fetched: true },
        },
      ])
    })
    store.dispatch(fetchAccounts())
  })
})
