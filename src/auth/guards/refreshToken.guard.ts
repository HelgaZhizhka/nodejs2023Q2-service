import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload, decode } from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
class RefreshTokenGuard extends AuthGuard('refresh') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.body.refreshToken;

   

    if (this.isTokenExpired(token)) {
      return true
    }

    return super.canActivate(context);
  }

  private isTokenExpired(token: string): boolean {
     if (
      !token ||
      token === null ||
      token === undefined ||
      typeof token !== 'string' ||
      token.trim().length === 0
    ) {
      throw new UnauthorizedException();
    };

    const decodedToken = decode(token) as JwtPayload;

    if (!decodedToken || decodedToken.exp === undefined) {
       throw new ForbiddenException();
    }


    const currentDate = new Date();
    const expirationDate = new Date(decodedToken.exp * 1000);


    if (currentDate > expirationDate) {
        throw new ForbiddenException();
    }

    return true;
  }
}
export default RefreshTokenGuard;