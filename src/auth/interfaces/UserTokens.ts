export interface User {
  id: string;
  login: string;
  password: string;
}

export interface UserTokens {
  userId: string;
  login: string;
  accessToken: string;
  refreshToken: string;
}