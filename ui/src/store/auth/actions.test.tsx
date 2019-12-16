import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk-recursion-detect'

import {
  authenticate,
  unauthenticate,
  login,
  logout,
  checkAuth
} from './actions'
import { AUTHENTICATE, UNAUTHENTICATE } from './constants'

//mock store
const mockStore = configureMockStore([thunkMiddleware])
const store = mockStore({ isAuthenticated: false })

describe('Auth actions', () => {
  beforeEach(() => {
    window.localStorage.clear()
    fetch.resetMocks()
    store.clearActions()
  })

  it('Authenticates to authenticate state', () => {
    expect(authenticate({ username: 'Boris Johnson' })).toEqual({
      payload: { username: 'Boris Johnson' },
      type: AUTHENTICATE
    })
  })

  it('Unauthenticates to unauthenticate state', () => {
    expect(unauthenticate()).toEqual({ type: UNAUTHENTICATE })
  })

  it('Login authenticates', () => {
    fetch.mockResponseOnce(
      JSON.stringify({ token: 'something', user: { username: 'optimus' } })
    )
    const unsubscribe = store.subscribe(() => {
      expect(window.localStorage.getItem('token')).toEqual('something')
      expect(store.getActions()).toEqual([
        authenticate({ username: 'optimus' })
      ])
      unsubscribe()
    })
    store.dispatch(login('optimus', 'prime'))
  })

  it('Logout unauthenticates', () => {
    const unsubscribe = store.subscribe(() => {
      expect(store.getActions()).toEqual([unauthenticate()])
      unsubscribe()
    })
    store.dispatch(logout())
  })

  it('checkAuth checks auth when logged out', () => {
    const unsubscribe = store.subscribe(() => {
      expect(store.getActions()).toEqual([unauthenticate()])
      unsubscribe()
    })
    store.dispatch(checkAuth())
  })

  it('checkAuth checks auth when logged in', () => {
    fetch.mockResponses(
      [JSON.stringify({ token: 'something', user: { username: 'optimus' } })],
      [JSON.stringify({ username: 'optimus' })]
    )
    store.dispatch(login('optimus', 'prime')).then(() => {
      const unsubscribe = store.subscribe(() => {
        expect(store.getActions()).toEqual([
          authenticate({ username: 'optimus' }),
          authenticate({ username: 'optimus' })
        ])
        unsubscribe()
      })

      store.dispatch(checkAuth())
    })
  })

  it('checkAuth logs out when expired', () => {
    fetch.mockResponses(
      [JSON.stringify({ token: 'something', user: { username: 'optimus' } })],
      ['Reponse', { status: 401 }]
    )
    store.dispatch(login('optimus', 'prime')).then(() => {
      const unsubscribe = store.subscribe(() => {
        expect(store.getActions()).toEqual([
          authenticate({ username: 'optimus' }),
          unauthenticate()
        ])
        unsubscribe()
      })

      store.dispatch(checkAuth())
    })
  })

  it('Failed login unauthenticates', () => {
    fetch.mockResponses(['You shall not pass', { status: 401 }])
    const unsubscribe = store.subscribe(() => {
      expect(store.getActions()).toEqual([unauthenticate()])
      unsubscribe()
    })
    store.dispatch(login('optimus', 'prime'))
  })
})
