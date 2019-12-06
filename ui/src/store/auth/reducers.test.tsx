import authReducer from './reducers';
import { authenticate, unauthenticate } from './actions';

it('Should reduce on authenticate', () => {
  expect(
    authReducer({csrfToken: null, isAuthenticated: null}, authenticate())
  ).toEqual({csrfToken: 'what the back sent', isAuthenticated: true});
});

it('Should reduce on unauthenticate', () => {
  expect(
    authReducer({csrfToken: 'piupiupiu', isAuthenticated: true}, unauthenticate())
  ).toEqual({csrfToken: null, isAuthenticated: false});
});
