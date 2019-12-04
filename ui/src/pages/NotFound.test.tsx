import React from 'react';
import { create } from 'react-test-renderer';

import NotFound from './NotFound';

it('renders without crashing', () => {
  const notFoundPage = create(<NotFound />);
  expect(notFoundPage.toJSON()).toMatchSnapshot();
});
