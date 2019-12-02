import { ILogin, ILogout } from "./actions";
import { LOGIN, LOGOUT } from "./constants";
import { IAuth } from "./types";

export default function authReducer(
  state: IAuth = {
    isAuthenticated: false,
    csrfToken: null,
  },
  action: ILogin | ILogout,
): IAuth {
  switch (action.type) {
    case LOGIN:
      return {
        csrfToken: "what the back sent", isAuthenticated: true
      };
    case LOGOUT:
      return { csrfToken: null, isAuthenticated: false }
  }
  return state;
}
