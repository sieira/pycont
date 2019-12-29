import { Action } from 'redux'
import { ThunkDispatch as Dispatch } from 'redux-thunk'

import * as constants from './constants'
import { Account, AccountsState } from './types'

export interface Fetch {
  type: constants.FETCH
  payload: AccountsState
}

export function fetchData(accounts: Account[]): Fetch {
  return {
    type: constants.FETCH,
    payload: { accountList: accounts, fetched: true }
  }
}

export type AccountsAction = Fetch

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
