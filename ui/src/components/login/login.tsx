import React, { useState, FormEvent } from 'react';
import { connect } from 'react-redux';

import {
  Button, FormGroup, FormControl, FormLabel,
} from 'react-bootstrap';

import { login } from '../../store/auth/actions';

import './login.css';

interface Props {
  loginConnect: () => void;
}

const Login: React.FunctionComponent<Props> = ({ loginConnect }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function validateForm(): boolean {
    return username.length > 0 && password.length > 0;
  }

  return (
    <div className="Login">
      <form onSubmit={loginConnect}>
        <FormGroup controlId="username">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={(e: FormEvent): void => setUsername((e.target as HTMLInputElement).value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e: FormEvent): void => setPassword((e.target as HTMLInputElement).value)}
            type="password"
          />
        </FormGroup>
        <Button block disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  loginConnect: login,
};

export default connect(
  null,
  mapDispatchToProps,
)(Login);
