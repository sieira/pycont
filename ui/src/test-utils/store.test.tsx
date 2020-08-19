import { PycontState } from '../store/types'

export function defaultStoreState(isAuthenticated = false): PycontState {
  return {
    auth: { isAuthenticated: isAuthenticated },
    accounts: { fetched: true, accountList: [] },
  }
}
