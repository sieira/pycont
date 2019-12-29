import { AuthState } from 'auth/types'
import { AccountsState } from 'accounts/types'

export interface PycontState {
  auth: AuthState
  accounts: AccountsState
}
