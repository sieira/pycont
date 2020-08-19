import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk-recursion-detect'

import { fetchData, fetchAccounts, patchAccount } from './actions'
import { FETCH, PATCH } from './constants'

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
    fetch.mockResponseOnce(JSON.stringify(accounts), {
      status: 200,
    })
    const unsubscribe = store.subscribe(() => {
      unsubscribe()
      expect(store.getActions()).toEqual([
        {
          type: FETCH,
          payload: { accountList: accounts, fetched: true },
        },
      ])
    })
    store.dispatch(fetchAccounts())
  })

  it('patchAccount resets data', () => {
    const mockStore = configureMockStore([thunkMiddleware])
    const store = mockStore()
    const accounts = [{ name: 'Account1', balance: 100 }, { name: 'Account2', balance: -300 }]
    fetch.mockResponseOnce(JSON.stringify(accounts), {
      status: 200,
    })
    const unsubscribe = store.subscribe(() => {
      unsubscribe()
      expect(store.getActions()).toEqual([
        {
          type: PATCH,
          payload: { accountList: [] , fetched: false },
        },
      ])
    })
    store.dispatch(patchAccount({ name: 'Account1', balance: 10 }))
  })
})
