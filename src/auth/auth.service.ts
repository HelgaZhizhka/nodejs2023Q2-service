import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

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

  async login(user: User): Promise<Tokens> {
    return await this.signTokens(user.id, user.login);
  }

  async signup(createAuthDto: CreateAuthDto): Promise<UserResponseDto> {
    return await this.userService.create(createAuthDto);
  }

  async validateUser({ login, password }: CreateAuthDto) {
    const currentUser = await this.prisma.user.findUnique({ where: { login } });

    if (!currentUser) {
      return null;
    }

    const isMatch = await this.userService.comparePassword(
      password,
      currentUser.password,
    );

    if (!isMatch) {
      return null;
    }

    return currentUser;
  }

  async refresh({ refreshToken }: UpdateAuthDto): Promise<Tokens> {
    const payload = await this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });

    if (!payload) {
      throw new HttpException(
        'Refresh token is invalid or expired',
        HttpStatus.FORBIDDEN,
      );
    }

    const { login, userId } = payload;
    return await this.signTokens(userId, login);
  }

  private async signTokens(userId: string, login: string): Promise<Tokens> {
    const payload = { sub: userId, login };
    console.log(payload);
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
