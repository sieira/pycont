import React from 'react';

import logo from '../logo.svg';
import './Landing.css';


const Landing: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        <span role="img" aria-label="beer">🍺 Edit</span>
        and save to reload.
        <br />
        <a href="/login">Let me in</a>
      </p>
    </header>
  </div>
);

export default Landing;
