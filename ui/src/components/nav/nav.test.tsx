import React from 'react';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk-recursion-detect';

import { login, authenticate } from '../../store/auth/actions';

import Nav from '.';


it('renders without crashing', () => {
  const mockStore = configureMockStore([thunkMiddleware]);
  const store = mockStore({});
  const loginForm = create(<Provider store={store}><MemoryRouter><Nav /></MemoryRouter></Provider>);
  expect(loginForm.toJSON()).toMatchSnapshot();
});

it('renders logged in without crashing', () => {
  const mockStore = configureMockStore([thunkMiddleware]);
  const store = mockStore(authenticate());
  const loginForm = create(<Provider store={store}><MemoryRouter><Nav /></MemoryRouter></Provider>);
  expect(loginForm.toJSON()).toMatchSnapshot();
});
