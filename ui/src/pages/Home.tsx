import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../store/auth/actions';

interface IProps {
  logoutConnect: () => void;
}

const Home = ({ logoutConnect }: IProps) => (
  <>
    <h1>You are in the home page</h1>
    <button type="submit" onClick={logoutConnect}>log me out</button>
  </>
);

const mapDispatchToProps = {
  logoutConnect: logout,
};

export default connect(
  null,
  mapDispatchToProps,
)(Home);
