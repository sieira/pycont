import React from 'react';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk-recursion-detect';

import Home from './Home';

const mockStore = configureMockStore([thunkMiddleware]);
const store = mockStore({});

it('renders without crashing', () => {
  const homePage = create(<Provider store={store}><Home /></Provider>);
  expect(homePage.toJSON()).toMatchSnapshot();
});
