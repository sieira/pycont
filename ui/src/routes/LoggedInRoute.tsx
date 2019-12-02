import * as React from 'react';
import { connect } from "react-redux";
import { Route } from 'react-router-dom';

import history from "../history";
import { IAuth } from "../store/auth/types";

interface IProps {
  exact?: boolean;
  isAuthenticated: boolean | null;
  path: string;
  component: React.ComponentType<any>;
}

const LoggedInRoute = ({
  component: Component,
  isAuthenticated,
  ...otherProps
}: IProps) => {
    if (isAuthenticated === false) {
    history.push("/login");
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

const mapStateToProps = (state: IAuth) => ({
  isAuthenticated: state.isAuthenticated
});

export default connect(
  mapStateToProps
)(LoggedInRoute);
