import * as React from 'react';
import { connect } from 'react-redux';

import { AuthState } from '../store/auth/types';
import { authStateRouteFactory } from './factories';


const LoggedInRoute = authStateRouteFactory(
  true, '/login', <header>Logged In Header</header>, <footer>Logger In Footer</footer>
);

const mapStateToProps = (state: AuthState) => ({
  isAuthenticated: state.isAuthenticated
});

export default connect(
  mapStateToProps
)(LoggedInRoute);
