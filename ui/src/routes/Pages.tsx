import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Landing from '../pages/Landing';
import Login from '../components/login';
import LoggedInRoute from './LoggedInRoute';
import LoggedOutRoute from './LoggedOutRoute';
import NotFound from '../pages/NotFound';

const Pages = (): JSX.Element => (
  <Switch>
    <LoggedInRoute path="/home" exact component={Home} />
    <LoggedOutRoute path="/login" exact component={Login} />
    <Route path="/" exact component={Landing} />
    <Route component={NotFound} />
  </Switch>
);

export default Pages;
