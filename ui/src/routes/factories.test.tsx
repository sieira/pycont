import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { authStateRouteFactory } from './factories';

configure({adapter: new Adapter()});

it('Should add header and footer', () => {
  const header = <div>Header</div>;
  const footer = <div>Footer</div>
  const route = authStateRouteFactory(true, '/fallback', header, footer);

  const component = <div id="i-am-muzzy"/>
  const componentRoute = route(component, true);

  expect(componentRoute).toMatchSnapshot();
  expect(componentRoute.props.children[0]).toStrictEqual(header);
  expect(componentRoute.props.children[2]).toStrictEqual(footer);
});
