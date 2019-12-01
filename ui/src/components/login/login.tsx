import React, { useState, FormEvent } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./login.css";

export default function Login(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" >
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={(e: FormEvent) => setUsername((e.target as HTMLInputElement).value)}
          />
        </FormGroup>
        <FormGroup controlId="password" >
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e: FormEvent) => setPassword((e.target as HTMLInputElement).value)}
            type="password"
          />
        </FormGroup>
        <Button block  disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
