export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface UserTokens {
  userId: string;
  login: string;
  accessToken: string;
  refreshToken: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
