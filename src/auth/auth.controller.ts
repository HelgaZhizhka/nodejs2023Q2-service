import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UserResponseDto } from '../user/dto/user-response.dto';
import { AuthService } from './auth.service';
import { CredentialsPreValidationGuard, LocalGuard } from './guards';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { StatusCodes } from 'http-status-codes';
import { Tokens } from './interfaces/Tokens';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(CredentialsPreValidationGuard, LocalGuard)
  @HttpCode(StatusCodes.OK)
  async login(@Request() req): Promise<Tokens> {
    return await this.authService.login(req.user);
  }

  @Post('signup')
  @HttpCode(StatusCodes.CREATED)
  async signup(@Body() createAuthDto: CreateAuthDto): Promise<UserResponseDto> {
    return await this.authService.signup(createAuthDto);
  }

  @Post('refresh')
  @HttpCode(StatusCodes.OK)
  async refresh(@Body() updateAuthDto: UpdateAuthDto): Promise<Tokens> {
    return await this.authService.refresh(updateAuthDto);
  }
}
