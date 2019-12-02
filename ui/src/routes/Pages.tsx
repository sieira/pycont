import * as React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Landing from "../pages/Landing";
import Login from '../components/Login';
import LoggedInRoute from "./LoggedInRoute";

const Pages = () => {

  return (
    <Switch>
      <LoggedInRoute path="/home" exact={true} component={Home} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/" exact={true} component={Landing} />
    </Switch>
  );
};

export default Pages;
