import React from 'react';
import { connect } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { checkAuth } from './store/auth/actions';
import { AuthState } from './store/auth/types';

import history from './history';
import Pages from './routes/Pages';
import MainNav from './components/nav';

interface Props {
  checkAuthConnect: () => void;
  isAuthenticated: boolean | null;
}

const App: React.FunctionComponent<Props> = ({
  checkAuthConnect,
  isAuthenticated
}: Props) => {
  
  React.useEffect(() => {
    checkAuthConnect();
  }, []);
  
  const app = isAuthenticated !== null ? (
    <Router history={history}>
      <MainNav/>
      <Route component={Pages} />
    </Router>
  ) : null;
  
  return (
    <div className="App">
      {app}
    </div>
  );
}

const mapStateToProps = (state: AuthState) => ({
  isAuthenticated: state.isAuthenticated
});

const mapDispatchToProps = {
  checkAuthConnect: checkAuth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
