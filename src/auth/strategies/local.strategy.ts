import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'login', passwordField: 'password' });
  }

  async validate(login: string, password: string) {
    const user = await this.authService.validateUser({
      login,
      password,
    });
    
    if (!user) {
      throw new HttpException(`Authentication failed`, HttpStatus.FORBIDDEN);
    }

    return user;
  }
}
