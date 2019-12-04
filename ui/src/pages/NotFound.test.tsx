import React from 'react';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk-recursion-detect';

import NotFound from './NotFound';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const notFoundPage = create(<NotFound />);
  expect(notFoundPage.toJSON()).toMatchSnapshot();
});
