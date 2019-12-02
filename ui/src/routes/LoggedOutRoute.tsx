import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import history from '../history';
import { AuthState } from '../store/auth/types';

interface Props {
  exact?: boolean;
  isAuthenticated: boolean | null;
  path: string;
  component: React.ComponentType<any>;
}

const LoggedOutRoute = ({
  component: Component,
  isAuthenticated,
  ...otherProps
}: Props) => {
   if (isAuthenticated === true) {
    history.push('/home');
  }  return (
    <>
      <header>
        Logged Out Header
      </header>
      <Route
        render={otherProps => (
          <>
            <Component {...otherProps} />
          </>
        )}
      />
      <footer>
        Logged Out Footer
      </footer>
    </>
  );
};

const mapStateToProps = (state: AuthState) => ({
  isAuthenticated: state.isAuthenticated
});

export default connect(
  mapStateToProps
)(LoggedOutRoute);
