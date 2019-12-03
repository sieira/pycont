import React from 'react';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk-recursion-detect';

import Login from '.';

const mockStore = configureMockStore([thunkMiddleware]);
const store = mockStore({});

it('renders without crashing', () => {
  const div = document.createElement('div');
  const loginForm = create(<Provider store={store}><Login /></Provider>);
  expect(loginForm.toJSON()).toMatchSnapshot();
});
