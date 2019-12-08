import { Action } from 'redux'
import { ThunkDispatch as Dispatch } from 'redux-thunk'

import * as constants from './constants'

export interface Authenticate {
  type: constants.AUTHENTICATE
}

export function authenticate(): Authenticate {
  return {
    type: constants.AUTHENTICATE
  }
}

export interface Unauthenticate {
  type: constants.UNAUTHENTICATE
}

export function unauthenticate(): Unauthenticate {
  return {
    type: constants.UNAUTHENTICATE
  }
}

export type AuthenticationAction = Authenticate | Unauthenticate

export function login() {
  return async (
    dispatch: Dispatch<AuthenticationAction, {}, Action>
  ): Promise<void> => {
    await window.localStorage.setItem('authenticated', 'true')
    dispatch(authenticate())
  }
}

export function logout() {
  return async (
    dispatch: Dispatch<AuthenticationAction, {}, Action>
  ): Promise<void> => {
    await window.localStorage.setItem('authenticated', 'false')
    dispatch(unauthenticate())
  }
}

export function checkAuth() {
  return async (
    dispatch: Dispatch<AuthenticationAction, {}, Action>
  ): Promise<void> => {
    const auth = await window.localStorage.getItem('authenticated')
    const formattedAuth = typeof auth === 'string' ? JSON.parse(auth) : null
    formattedAuth ? dispatch(authenticate()) : dispatch(unauthenticate())
  }
}
