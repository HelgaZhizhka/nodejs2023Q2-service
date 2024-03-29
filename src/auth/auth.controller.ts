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
import { UserTokens } from '../user/interfaces/user.interface';
import {
  CredentialsPreValidationGuard,
  JwtRefreshTokenGuard,
  LocalGuard,
} from './guards';
import { Public } from '../decorators/is-public-path.decorator';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RefreshResponse } from './interfaces/refresh.interface';
import { AuthService } from './auth.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(CredentialsPreValidationGuard, LocalGuard)
  @Post('login')
  @HttpCode(StatusCodes.OK)
  async login(@Request() req): Promise<UserTokens> {
    return await this.authService.login(req.user);
  }

  @Post('signup')
  @HttpCode(StatusCodes.CREATED)
  async signup(@Body() CreateUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.authService.signup(CreateUserDto);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh')
  @HttpCode(StatusCodes.OK)
  async refresh(
    @Body() updateAuthDto: UpdateAuthDto,
  ): Promise<RefreshResponse> {
    return await this.authService.refresh(updateAuthDto);
  }
}
