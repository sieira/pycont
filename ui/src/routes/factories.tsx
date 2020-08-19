import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthStateRouteProps, RouteProps } from './types'

export const authStateRouteFactory = (
  authenticatedValue: boolean,
  defaultFallbackRoute: string
): React.FC<AuthStateRouteProps & RouteProps> => ({
  component: Component,
  isAuthenticated,
}: AuthStateRouteProps & RouteProps): JSX.Element => {
  if (isAuthenticated !== authenticatedValue) {
    return <Redirect push to={defaultFallbackRoute} />
  }

  return (
    <Route
      render={(otherProps): JSX.Element => (
        <>
          <Component />
        </>
      )}
    />
  )
}
