import { Action } from 'redux'
import { ThunkDispatch as Dispatch } from 'redux-thunk'

import * as constants from './constants'
import { User } from './types'

export interface Authenticate {
  type: constants.AUTHENTICATE
  payload: User
}

export function authenticate(user: User): Authenticate {
  return {
    type: constants.AUTHENTICATE,
    payload: user
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

export function logout() {
  return async (
    dispatch: Dispatch<AuthenticationAction, {}, Action>
  ): Promise<void> => {
    await window.localStorage.removeItem('token')
    dispatch(unauthenticate())
  }
}

export function login(username: string, password: string) {
  return async (
    dispatch: Dispatch<AuthenticationAction, {}, Action>
  ): Promise<void> => {
    return fetch('api/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(function(response) {
      if (response.status != 200) {
        logout()
      } else {
        response.json().then(data => {
          window.localStorage.setItem('token', data.token)
          dispatch(authenticate(data.user))
        })
      }
    })
  }
}

export function checkAuth() {
  return async (
    dispatch: Dispatch<AuthenticationAction, {}, Action>
  ): Promise<void> => {
    const token = await window.localStorage.getItem('token')
    if (token) {
      return fetch('api/profile/', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `JWT ${token}`
        },
        method: 'GET'
      }).then(function(resp) {
        if (resp.status !== 200) {
          dispatch(unauthenticate())
          return
        } else {
          resp.json().then(data => dispatch(authenticate(data)))
        }
      })
    } else {
      dispatch(unauthenticate())
    }
  }
}
