export interface RefreshRequest {
  userId: string;
  login: string;
  iat: number;
  exp: number;
}
