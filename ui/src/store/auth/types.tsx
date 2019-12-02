export interface IAuth {
  isAuthenticated: boolean;
  csrfToken: string | null;
}
