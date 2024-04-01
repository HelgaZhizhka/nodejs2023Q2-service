import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '../interfaces/jwtPayload.interface';
import { UserService } from '../../user/user.service';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secretKey'),
    });
  }

  async validate(payload: JwtPayload) {
    const { userId } = payload;

    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }
}

export default JwtStrategy;
