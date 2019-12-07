import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk-recursion-detect';

import { authenticate, unauthenticate, login, logout, checkAuth } from './actions';
import { AUTHENTICATE, UNAUTHENTICATE } from './constants';

//mock store
const mockStore = configureMockStore([thunkMiddleware]);
const store = mockStore({isAuthenticated: false});


describe('Auth actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Authenticates to authenticate state', () => {
    expect(authenticate()).toEqual({type: AUTHENTICATE});
  });

  it('Unauthenticates to unauthenticate state', () => {
    expect(unauthenticate()).toEqual({type: UNAUTHENTICATE});
  });

  it('Login authenticates', () => {
    const unsubscribe = store.subscribe(() => {
      expect(store.getActions()).toEqual([authenticate()]);
      unsubscribe();
    });
    store.dispatch(login());
  });

  it('Logout unauthenticates', () => {
    const unsubscribe = store.subscribe(() => {
      expect(store.getActions()).toEqual([unauthenticate()]);
      unsubscribe();
    });
    store.dispatch(logout());
  });

  it('Check auth checks auth', () => {
    const unsubscribe = store.subscribe(() => {
      expect(store.getActions()).toEqual([unauthenticate()]);
      unsubscribe();
    });
    store.dispatch(checkAuth());
  });
});
