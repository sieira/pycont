import React from 'react';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk-recursion-detect';

import { mount } from 'enzyme';

import Login from '.';

const mockStore = configureMockStore([thunkMiddleware]);
const store = mockStore({})

it('should render without crashing', () => {
  const loginForm = create(<Provider store={store}><Login /></Provider>);
  expect(loginForm.toJSON()).toMatchSnapshot();
});

it('should be disabled when no content', () => {
  const loginForm = create(<Provider store={store}><Login /></Provider>).root;
  const loginButton = loginForm.findByType('button');
  expect(loginButton).toBeDefined();
  expect(loginButton.props.disabled).toBe(true);
});

it('should enable button when filled up', () => {
  const loginForm = mount(<Provider store={store}><Login /></Provider>);
  const usernameText = loginForm.find('input[type="username"]');
  const passwordText = loginForm.find('input[type="password"]');
  usernameText.simulate('change', {target: {value: 'Bazinga'}});
  passwordText.simulate('change', {target: {value: 'Spontiak!!'}});
  const loginButton = loginForm.find('button');
  expect(loginButton.props().disabled).toBe(false);
});

it('should require logout', () => {
  expect('/login').toRequireLogout();
});
