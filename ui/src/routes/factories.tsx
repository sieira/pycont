import * as React from 'react';
import { Route } from 'react-router-dom';

import history from '../history';
import { AuthStateRouteProps } from './types';


export const authStateRouteFactory = (
  authenticatedValue: boolean, defaultFallbackRoute: string,
  routeHeader: JSX.Element, routeFooter: JSX.Element
) => ({
  component: Component,
  isAuthenticated,
  ...otherProps
}: AuthStateRouteProps) => {
  if (isAuthenticated !== authenticatedValue) {
    history.push(defaultFallbackRoute);
  }  return (
    <>
      {routeHeader}
      <Route
        render={otherProps => (
          <>
            <Component {...otherProps} />
          </>
        )}
      />
      {routeFooter}
    </>
  );
};
