import { Authenticate, Unauthenticate } from './actions'
import { AUTHENTICATE, UNAUTHENTICATE } from './constants'
import { AuthState } from './types'

export default function authReducer(
  state: AuthState = {
    isAuthenticated: false,
    currentUser: null
  },
  action: Authenticate | Unauthenticate
): AuthState {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        isAuthenticated: true,
        currentUser: action.payload
      }
    case UNAUTHENTICATE:
      return { isAuthenticated: false, currentUser: null }
    default:
      return state
  }
}
