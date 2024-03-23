import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '@prisma/client';

interface RequestWithUser extends Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Request() req: RequestWithUser) {
    return req.user;
  }

  @Post('signup')
  async signup(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.signup(createAuthDto);
  }

}
