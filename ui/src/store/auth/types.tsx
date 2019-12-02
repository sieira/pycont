export interface IAuth {
  isAuthenticated: boolean | null;
  csrfToken: string | null;
}
