import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(createAuthDto: CreateAuthDto) {
    return await this.userService.create(createAuthDto);
  }

  async validateUser({ login, password }: CreateAuthDto) {
    const currentUser = await this.prisma.user.findUnique({ where: { login } });

    if (!currentUser) {
      return null;
    }

    const isMatch = await compare(password, currentUser.password);

    if (!isMatch) {
      throw new HttpException('Invalid password', HttpStatus.FORBIDDEN);
    }

    const payload = { userId: currentUser.id, login: currentUser.login };
    return this.jwtService.sign(payload);
  }
}
