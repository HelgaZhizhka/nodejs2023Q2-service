import { IsString } from 'class-validator';

export class UpdateAuthDto {
  @IsString()
  refreshToken: string;
}
