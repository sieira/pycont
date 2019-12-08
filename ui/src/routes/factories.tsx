import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthStateRouteProps } from './types'

export const authStateRouteFactory = (
  authenticatedValue: boolean,
  defaultFallbackRoute: string,
  routeHeader: JSX.Element,
  routeFooter: JSX.Element
): React.FC<AuthStateRouteProps> => ({
  component: Component,
  isAuthenticated,
  ...otherProps
}: AuthStateRouteProps): JSX.Element => {
  if (isAuthenticated !== authenticatedValue) {
    return <Redirect push to={defaultFallbackRoute} />
  }

  return (
    <>
      {routeHeader}
      <Route
        render={(otherProps): JSX.Element => (
          <>
            <Component {...otherProps} />
          </>
        )}
      />
      {routeFooter}
    </>
  )
}
