import * as React from 'react';
import { Route } from 'react-router-dom';

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const LoggedOutRoute = ({
  component: Component,
}: IProps) => (
  <>
    <header>
      Logged In Header
    </header>
    <Route
      render={(otherProps) => (
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
export default LoggedOutRoute;
