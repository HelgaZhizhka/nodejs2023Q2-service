import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface Payload {
  userId: string;
  login: string;
}

@Injectable()
class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.refreshSecretKey'),
    });
  }

  async validate(payload: Payload) {
    console.log(payload);
    const { userId, login } = payload;

    if (!userId || !login) {
      throw new UnauthorizedException();
    }
    return { userId, login };
  }
}

export default RefreshStrategy;