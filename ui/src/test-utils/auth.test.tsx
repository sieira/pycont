// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function mockLoggedIn(user) {
  return fetch.doMockOnceIf('api/profile/', JSON.stringify(user), {
    status: 200
  })
}
