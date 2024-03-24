import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { RequestWithUser } from '../user/interface/user.interface';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Tokens } from './interfaces/Tokens';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(req: RequestWithUser): Promise<Tokens> {
    const tokens = await this.getTokens(req.user.id, req.user.login);
    return { ...tokens };
  }

  async signup(createAuthDto: CreateAuthDto): Promise<UserResponseDto> {
    return await this.userService.create(createAuthDto);
  }

  async validateUser({ login, password }: CreateAuthDto) {
    const currentUser = await this.prisma.user.findUnique({ where: { login } });

    if (!currentUser) {
      return null;
    }

    const isMatch = await compare(password, currentUser.password);

    if (!isMatch) {
      return null;
    }

    const payload = { userId: currentUser.id, login: currentUser.login };
    return this.jwtService.sign(payload);
  }

  async refresh({ refreshToken }: UpdateAuthDto): Promise<Tokens> {
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });

    return await this.getTokens(payload.userId, payload.login);
  }

  private async getTokens(userId: string, login: string): Promise<Tokens> {
    const payload = { sub: userId, login };
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      access_token,
      refresh_token,
    };
  }
}
