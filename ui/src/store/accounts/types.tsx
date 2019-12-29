export interface Account {
  name: string
}

export interface AccountsState {
  accountList: Account[]
  fetched: boolean
}
