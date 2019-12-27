export function mockLoggedOut(canRefresh = false, user?) {
  user = user || { username: 'Oompa Loompa' }

  const mockProfile = fetch.mockOnceIf('api/profile/', 'UNAUTHORIZED', {
    status: 401
  })

  if (canRefresh) {
    return mockProfile.mockOnceIf('api/auth/refresh/', JSON.stringify(user), {
      status: 200
    })
  } else {
    return mockProfile.mockOnceIf('api/auth/refresh/', 'UNAUTHORIZED', {
      status: 401
    })
  }
}

export function mockLoggedIn(user?) {
  user = user || { username: 'Willy Wonka' }

  return fetch.mockOnceIf('api/profile/', JSON.stringify(user), { status: 200 })
}
