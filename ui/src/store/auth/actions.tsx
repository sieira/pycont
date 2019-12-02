import * as constants from './constants';

export interface ILogin {
  type: constants.LOGIN;
}

export function login(): ILogin {
  return {
    type: constants.LOGIN,
  };
}

export interface ILogout {
  type: constants.LOGOUT;
}

export function logout(): ILogout {
  return {
    type: constants.LOGOUT,
  };
}

export type AuthenticationAction = ILogin | ILogout;
