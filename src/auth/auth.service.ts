import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserResponseDto } from '../user/dto/user-response.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User, UserTokens } from '../user/interfaces/user.interface';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshResponse } from './interfaces/refresh.interface';
import { UpdateAuthDto } from './dto/update-auth.dto';

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
    await this.saveUserTokens(userId, tokens.refreshToken);
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

  async refresh({ refreshToken }: UpdateAuthDto): Promise<RefreshResponse> {
    const { userId } = await this.prisma.userTokens.findUnique({
      where: {
        refreshToken,
      },
    });

    if (!userId) {
      throw new ForbiddenException('Invalid refresh token');
    }

    await this.removeUserTokens(userId);
    const user = await this.userService.findOne(userId);
    const { login } = user;
    const tokens = await this.signTokens(userId, login);
    await this.saveUserTokens(userId, refreshToken);
    return tokens;
  }

  private async signTokens(
    userId: string,
    login: string,
  ): Promise<RefreshResponse> {
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

  private async saveUserTokens(userId: string, refreshToken: string) {
    const token = await this.prisma.userTokens.findUnique({
      where: {
        userId,
      },
    });

    if (token) {
      await this.prisma.userTokens.update({
        where: {
          userId,
        },
        data: {
          refreshToken,
        },
      });
    } else {
      await this.prisma.userTokens.create({
        data: {
          userId,
          refreshToken,
        },
      });
    }
  }

  private async removeUserTokens(userId: string) {
    await this.prisma.userTokens.delete({
      where: {
        userId,
      },
    });
  }
}
