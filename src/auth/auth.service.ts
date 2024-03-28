import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import { User } from '@prisma/client';

import { UserResponseDto } from '../user/dto/user-response.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User, UserTokens } from './interfaces/UserTokens';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(user: User): Promise<UserTokens> {
    const { id: userId, login } = user;
    const tokens = await this.signTokens(userId, login);
    return { userId, login, ...tokens };
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

  async refresh({ refreshToken }: UpdateAuthDto): Promise<UserTokens> {
    const payload = await this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('jwt.refreshSecretKey'),
    });
    const { login, userId } = payload;
    const tokens = await this.signTokens(userId, login);
    return { userId, login, ...tokens };
  }

  private async signTokens(userId: string, login: string) {
    const payload = { userId, login };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.secretKey'),
      expiresIn: this.configService.get<string>('jwt.tokenExpireTime'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.refreshSecretKey'),
      expiresIn: this.configService.get<string>('jwt.tokenRefreshExpireTime'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
