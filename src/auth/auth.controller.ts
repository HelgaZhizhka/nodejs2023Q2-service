import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { UserResponseDto } from '../user/dto/user-response.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import {
  CredentialsPreValidationGuard,
  JwtRefreshTokenGuard,
  LocalGuard,
} from './guards';
import { Public } from '../decorators/public-path.decorator';
import { AuthService } from './auth.service';
import { LoginResponse } from './interfaces/loginResponse.interface';
import { UserTokens } from './interfaces/userTokens.interface';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(CredentialsPreValidationGuard, LocalGuard)
  @Post('login')
  @HttpCode(StatusCodes.OK)
  async login(@Request() req): Promise<LoginResponse> {
    console.log('REQUESSSSSTTT' , req.user);
    return await this.authService.login(req.user);
  }

  @Post('signup')
  @HttpCode(StatusCodes.CREATED)
  async signup(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.authService.signup(createUserDto);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh')
  @HttpCode(StatusCodes.OK)
  async refresh(@Request() req): Promise<UserTokens> {
    return await this.authService.refresh(req.user);
  }
}
