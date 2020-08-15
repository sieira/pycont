export const AUTHENTICATE = 'AUTHENTICATE'
export type AUTHENTICATE = typeof AUTHENTICATE
export const UNAUTHENTICATE = 'UNAUTHENTICATE'
export type UNAUTHENTICATE = typeof UNAUTHENTICATE

export const INITIAL_AUTH_STATE = { isAuthenticated: false, currentUser: null }
