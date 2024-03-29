import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

interface Payload {
  userId: string;
  login: string;
}

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secretKey'),
    });
  }

  async validate(payload: Payload) {
    const { userId, login } = payload;

    if (!userId || !login) {
      throw new UnauthorizedException();
    }
    
    return { userId, login };
  }
}

export default JwtStrategy;
