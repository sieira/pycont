import React from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        <span role="img" aria-label="beer">🍺 Edit</span>
        {' '}
        <code>src/App.js</code>
        {' '}
and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
          Learn React
      </a>
    </header>
  </div>
);

export default App;
