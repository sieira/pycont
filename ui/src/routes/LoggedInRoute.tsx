import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import history from '../history';
import { AuthState } from '../store/auth/types';
import { AuthStateRouteProps } from './types';


const LoggedInRoute = ({
  component: Component,
  isAuthenticated,
  ...otherProps
}: AuthStateRouteProps) => {
    if (isAuthenticated === false) {
    history.push('/login');
  }  return (
    <>
      <header>
        Logged In Header
      </header>
      <Route
        render={otherProps => (
          <>
            <Component {...otherProps} />
          </>
        )}
      />
      <footer>
        Logged In Footer
      </footer>
    </>
  );
};

const mapStateToProps = (state: AuthState) => ({
  isAuthenticated: state.isAuthenticated
});

export default connect(
  mapStateToProps
)(LoggedInRoute);
