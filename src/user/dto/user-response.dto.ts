import { User } from '@prisma/client';

export class UserResponseDto {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor({ id, login, version, createdAt, updatedAt }: User) {
    this.id = id;
    this.login = login;
    this.version = version;
    this.createdAt = createdAt.getTime();
    this.updatedAt = updatedAt.getTime();
  }
}
