import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserResponseDto } from '../user/dto/user-response.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/interfaces/user.interface';
import { PrismaService } from '../prisma/prisma.service';
import { UserTokens } from './interfaces/userTokens.interface';
import { LoginResponse } from './interfaces/loginResponse.interface';
import { RefreshRequest } from './interfaces/refreshRequest.interface';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(user: User): Promise<LoginResponse> {
    const { id: userId, login } = user;
    const tokens = await this.signTokens(userId, login);
    await this.updateRefreshToken(userId, tokens.refreshToken);
    return { userId, login, ...tokens };
  }

  async signup(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.userService.create(createUserDto);
  }

  async validateUser({ login, password }: CreateUserDto) {
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

  async refresh(user: RefreshRequest): Promise<UserTokens> {
    const { userId, login } = user;
    const tokens = await this.signTokens(userId, login);

    try {
      await this.updateRefreshToken(userId, tokens.refreshToken);
    } catch (error) {
      console.error('Error updating refresh token:', error);
    }

    return tokens;
  }

  private async signTokens(userId: string, login: string): Promise<UserTokens> {
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

  private async updateRefreshToken(userId: string, refreshToken: string) {
    await this.prisma.userTokens.upsert({
      where: { userId },
      update: { refreshToken },
      create: { userId, refreshToken },
    });
  }
}
