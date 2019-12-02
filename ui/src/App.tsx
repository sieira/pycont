import React from 'react';
import { Route, Router } from 'react-router-dom';

import history from './history';
import Pages from './routes/Pages';

const App: React.FC = () => (
  <Router history={history}>
    <Route component={Pages} />
  </Router>
);

export default App;
