export function mockLoggedOut() {
  fetch.doMock('api/profile/').mockResponse('UNAUTHORIZED', { status: 401})
  fetch.doMock('api/auth/refresh/').mockResponse('UNAUTHORIZED', { status: 401})
}

export function mockLoggedIn(user) {
  fetch.doMock('api/profile/').mockResponse(JSON.stringify(user), { status: 200})
}
