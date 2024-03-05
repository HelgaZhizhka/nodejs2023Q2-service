import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
