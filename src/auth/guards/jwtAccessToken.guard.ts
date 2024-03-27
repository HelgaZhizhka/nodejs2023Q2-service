import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';


@Injectable()
class JwtAccessTokenGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const publicRoutes: string[] = ['/auth/signup', '/auth/login', '/doc', '/'];

    if (publicRoutes.includes(request.path)) {
      return true;
    }

    return super.canActivate(context);
  }
}

export default JwtAccessTokenGuard;
