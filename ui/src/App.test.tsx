import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk-recursion-detect';

import App from './App';

const mockStore = configureMockStore([thunkMiddleware]);
const store = mockStore({});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, div
  );
  ReactDOM.unmountComponentAtNode(div);
});
