import React from 'react';
import { connect } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { checkAuth } from "./store/auth/actions";
import { IAuth } from "./store/auth/types";

import history from './history';
import Pages from './routes/Pages';
import MainNav from './components/nav';

interface IProps {
  checkAuthConnect: () => void;
  isAuthenticated: boolean | null;
}

const App: React.FunctionComponent<IProps> = ({
  checkAuthConnect,
  isAuthenticated
}: IProps) => {
  
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

const mapStateToProps = (state: IAuth) => ({
  isAuthenticated: state.isAuthenticated
});

const mapDispatchToProps = {
  checkAuthConnect: checkAuth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
