export interface Account {
  id: number
  name?: string
  balance?: number
}

export interface AccountsState {
  accountList: Account[]
  fetched: boolean
}
