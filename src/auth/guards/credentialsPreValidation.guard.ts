import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
class CredentialsPreValidationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { login, password } = request.body;

    if (
      !login ||
      !password ||
      typeof login !== 'string' ||
      typeof password !== 'string'
    ) {
      throw new BadRequestException(
        'Login and password must be provided and be strings',
      );
    }

    return true;
  }
}

export default CredentialsPreValidationGuard;
