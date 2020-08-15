import { Authenticate, Unauthenticate } from './actions'
import { AUTHENTICATE, UNAUTHENTICATE, INITIAL_AUTH_STATE } from './constants'
import { AuthState } from './types'

export default function authReducer(
  state: AuthState = INITIAL_AUTH_STATE,
  action: Authenticate | Unauthenticate
): AuthState {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        isAuthenticated: true,
        currentUser: action.payload,
      }
    case UNAUTHENTICATE:
      return { isAuthenticated: false, currentUser: null }
    default:
      return state
  }
}
