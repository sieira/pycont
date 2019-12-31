import authReducer from './reducer'
import { authenticate, unauthenticate } from './actions'

it('Should reduce on authenticate', () => {
  expect(
    authReducer(
      { currentUser: null, isAuthenticated: null },
      authenticate({ username: 'Hoola Kaboola' })
    )
  ).toEqual({
    currentUser: { username: 'Hoola Kaboola' },
    isAuthenticated: true
  })
})

it('Should reduce on unauthenticate', () => {
  expect(
    authReducer(
      { currentUser: { username: 'piupiupiu' }, isAuthenticated: true },
      unauthenticate()
    )
  ).toEqual({ currentUser: null, isAuthenticated: false })
})
