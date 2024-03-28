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
import { AuthService } from './auth.service';
import {
  CredentialsPreValidationGuard,
  RefreshTokenGuard,
  LocalGuard,
} from './guards';
import { Public } from './decorators/is-public-path.decorator';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserTokens } from './interfaces/UserTokens';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(CredentialsPreValidationGuard, LocalGuard)
  @Post('login')
  @Public()
  @HttpCode(StatusCodes.OK)
  async login(@Request() req): Promise<UserTokens> {
    return await this.authService.login(req.user);
  }

  @Post('signup')
  @Public()
  @HttpCode(StatusCodes.CREATED)
  async signup(@Body() createAuthDto: CreateAuthDto): Promise<UserResponseDto> {
    return await this.authService.signup(createAuthDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @Public()
  @HttpCode(StatusCodes.OK)
  async refresh(@Body() updateAuthDto: UpdateAuthDto): Promise<UserTokens> {
    return await this.authService.refresh(updateAuthDto);
  }
}
