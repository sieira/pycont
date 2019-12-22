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

function actionChecker(actions) {
  const unsubscribe = store.subscribe(() => {
    unsubscribe()
    expect(store.getActions()).toEqual(actions)
  })
  return unsubscribe
}

describe('Auth actions', () => {
  beforeEach(() => {
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
    fetch.mockResponseOnce(JSON.stringify({ user: { username: 'optimus' } }))
    actionChecker([authenticate({ username: 'optimus' })])
    store.dispatch(login('optimus', 'prime'))
  })

  it('Logout unauthenticates', () => {
    fetch.mockResponseOnce()
    actionChecker([unauthenticate()])
    store.dispatch(logout())
  })

  it("Failed logout don't unauthenticate", async () => {
    fetch.mockResponseOnce('Shit happened', { status: 500 })
    await expect(store.dispatch(logout())).rejects.toThrow()
    expect(store.getActions()).toEqual([])
  })

  it('checkAuth checks auth when logged out', () => {
    fetch.mockResponseOnce('UNAUTHORIZED', { status: 401 })
    actionChecker([unauthenticate()])
    store.dispatch(checkAuth())
  })

  it('checkAuth checks auth when logged in', () => {
    fetch.mockResponses(
      [JSON.stringify({ user: { username: 'optimus' } })],
      [JSON.stringify({ username: 'optimus' })]
    )
    store.dispatch(login('optimus', 'prime')).then(() => {
      actionChecker([
        authenticate({ username: 'optimus' }),
        authenticate({ username: 'optimus' })
      ])
      store.dispatch(checkAuth())
    })
  })

  it('checkAuth logs out when expired', () => {
    fetch.mockResponses(
      [JSON.stringify({ user: { username: 'optimus' } })],
      ['Reponse', { status: 401 }]
    )
    store.dispatch(login('optimus', 'prime')).then(() => {
      actionChecker([authenticate({ username: 'optimus' }), unauthenticate()])
      store.dispatch(checkAuth())
    })
  })

  it('Failed login unauthenticates', () => {
    fetch.mockResponses(['You shall not pass', { status: 401 }])
    actionChecker([unauthenticate()])
    store.dispatch(login('optimus', 'prime'))
  })
})
