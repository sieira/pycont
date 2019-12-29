import { Fetch } from './actions'
import { FETCH } from './constants'
import { AccountsState } from './types'

export default function acountsReducer(
  state: AccountsState = {
    accountList: [],
    fetched: false
  },
  action: Fetch
): AccountsState {
  switch (action.type) {
    case FETCH:
      return action.payload
    default:
      return state
  }
}
