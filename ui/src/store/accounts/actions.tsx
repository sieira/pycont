import Cookies from 'universal-cookie'

import { Action } from 'redux'
import { ThunkDispatch as Dispatch } from 'redux-thunk'

import * as constants from './constants'
import { Account, AccountsState } from './types'

export interface Fetch {
  type: constants.FETCH
  payload: AccountsState
}

export interface Patch {
  type: constants.PATCH
  payload: AccountsState
}

export function fetchData(accounts: Account[]): Fetch {
  return {
    type: constants.FETCH,
    payload: { accountList: accounts, fetched: true }
  }
}

export function resetData(): Patch {
  return {
    type: constants.PATCH,
    payload: { accountList: [], fetched: false }
  }
}

export type AccountsAction = Fetch | Patch

export function fetchAccounts() {
  return async (
    dispatch: Dispatch<AccountsAction, {}, Action>
  ): Promise<void> => {
    return fetch('api/accounts/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(function(response) {
      response.json().then(data => {
        dispatch(fetchData(data))
      })
    })
  }
}

export function patchAccount(account) {
  return async (
    dispatch: Dispatch<AccountsAction, {}, Action>
  ): Promise<void> => {
    return fetch(`api/accounts/${account.id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRFToken': new Cookies().get('csrftoken')
      },
      body: JSON.stringify(account)
    }).then(function(response) {
      response.json().then(data => {
        dispatch(resetData())
        dispatch(fetchAccounts())
      })
    })
  }
}
