export interface User {
  username: string
}

export interface AuthState {
  isAuthenticated: boolean | null
  currentUser: User | null
}
