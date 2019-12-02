import { IAuthenticate, IUnauthenticate } from './actions';
import { AUTHENTICATE, UNAUTHENTICATE } from './constants';
import { IAuth } from './types';

export default function authReducer(
  state: IAuth = {
    isAuthenticated: null,
    csrfToken: null,
  },
  action: IAuthenticate | IUnauthenticate,
): IAuth {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        csrfToken: 'what the back sent', isAuthenticated: true,
      };
    case UNAUTHENTICATE:
      return { csrfToken: null, isAuthenticated: false };
    default:
      return state;
  }
}
