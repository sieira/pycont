export function mockLoggedIn(user) {
  return fetch.mockOnceIf('api/profile/', JSON.stringify(user), { status: 200 })
}
