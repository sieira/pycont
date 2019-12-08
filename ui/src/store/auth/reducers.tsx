import { Authenticate, Unauthenticate } from './actions'
import { AUTHENTICATE, UNAUTHENTICATE } from './constants'
import { AuthState } from './types'

export default function authReducer(
  state: AuthState = {
    isAuthenticated: null,
    csrfToken: null
  },
  action: Authenticate | Unauthenticate
): AuthState {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        csrfToken: 'what the back sent',
        isAuthenticated: true
      }
    case UNAUTHENTICATE:
      return { csrfToken: null, isAuthenticated: false }
    default:
      return state
  }
}
