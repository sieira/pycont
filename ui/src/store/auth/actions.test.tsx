import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk-recursion-detect'

import {
  authenticate,
  checkAuth,
  login,
  logout,
  refreshAuth,
  refreshOn401,
  unauthenticate,
} from './actions'
import { AUTHENTICATE, UNAUTHENTICATE } from './constants'
import { mockLoggedIn } from '../../test-utils/auth.test'

//mock store
const mockStore = configureMockStore([thunkMiddleware])

function actionChecker(actions): Store {
  const store = mockStore({ isAuthenticated: false })
  const unsubscribe = store.subscribe(() => {
    unsubscribe()
    expect(store.getActions()).toEqual(actions)
  })
  return store
}

describe('Auth actions', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('Authenticates to authenticate state', () => {
    expect(authenticate({ username: 'Boris Johnson' })).toEqual({
      payload: { username: 'Boris Johnson' },
      type: AUTHENTICATE,
    })
  })

  it('Unauthenticates to unauthenticate state', () => {
    expect(unauthenticate()).toEqual({ type: UNAUTHENTICATE })
  })

  it('Login authenticates', () => {
    fetch.mockResponseOnce(JSON.stringify({ user: { username: 'optimus' } }))
    const store = actionChecker([authenticate({ username: 'optimus' })])
    store.dispatch(login('optimus', 'prime'))
  })

  it('Logout unauthenticates', () => {
    fetch.mockResponseOnce()
    const store = actionChecker([unauthenticate()])
    store.dispatch(logout())
  })

  it("Failed logout don't unauthenticate", async () => {
    const store = mockStore({ isAuthenticated: false })
    fetch.mockResponseOnce('Shit happened', { status: 500 })
    await expect(store.dispatch(logout())).rejects.toThrow()
    expect(store.getActions()).toEqual([])
  })

  it('checkAuth authenticates when logged in', () => {
    mockLoggedIn({ username: 'Mary Poppins' })
    const store = actionChecker([authenticate({ username: 'Mary Poppins' })])
    store.dispatch(checkAuth())
  })

  it('Failed login unauthenticates', () => {
    fetch.mockResponses(['You shall not pass', { status: 401 }])
    const store = actionChecker([unauthenticate()])
    store.dispatch(login('optimus', 'prime'))
  })

  it('Failed refresh unauthenticates', () => {
    fetch.mockResponses(['You shall not pass', { status: 401 }])
    const store = actionChecker([unauthenticate()])
    store.dispatch(refreshAuth())
  })

  it('Successful refresh authenticates', () => {
    fetch.mockResponseOnce(
      JSON.stringify({ user: { username: 'Ignatius Farray' } }),
      { status: 200 }
    )
    const store = actionChecker([authenticate({ username: 'Ignatius Farray' })])
    store.dispatch(refreshAuth())
  })

  it('Dispatches refresh on 401', () => {
    const user = { user: { username: 'Freddy Mercury' } }
    const store = actionChecker([authenticate(user.user)])
    const expectedResponse = {
      status: 401,
      url: 'https://somehost.foo/somepath',
    }
    fetch.mockResponseOnce(JSON.stringify(user))
    const response = refreshOn401(store)(expectedResponse)
    expect(response).toEqual(expectedResponse)
  })

  it('Avoid infinite recursion', () => {
    const store = actionChecker([])
    const expectedResponse = {
      status: 401,
      url: 'https://somehost.foo/api/auth/refresh/',
    }
    const response = refreshOn401(store)(expectedResponse)
    expect(response).toEqual(expectedResponse)
  })

  it('Does nothing on not 401', () => {
    const store = actionChecker([])
    const expectedResponse = {
      status: 200,
      url: 'https://somehost.foo/foo/bar/clan/',
    }
    const response = refreshOn401(store)(expectedResponse)
    expect(response).toEqual(expectedResponse)
  })
})
