import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
class JwtRefreshTokenGuard extends AuthGuard('jwt-refresh') {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super();
  }
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.body.refreshToken;

    if (!token) {
      throw new UnauthorizedException('No refresh token provided');
    }

    try {
      await this.jwtService.verify(token, {
        secret: this.configService.get<string>('jwt.refreshSecretKey'),
      });
    } catch {
      throw new ForbiddenException('Refresh token expired');
    }

    return true;
  }
}
export default JwtRefreshTokenGuard;
