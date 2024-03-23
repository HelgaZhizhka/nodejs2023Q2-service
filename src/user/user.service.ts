import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ login, password }: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await hash(password, 10);
    const user = await this.prisma.user.create({
      data: { login, password: hashedPassword, version: 1 },
    });
    return new UserResponseDto(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new UserResponseDto(user));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new HttpException(
        `User with ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return new UserResponseDto(user);
  }

  async update(
    id: string,
    { oldPassword, newPassword }: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isMatch = await compare(oldPassword, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid password', HttpStatus.FORBIDDEN);
    }

    const hashedNewPassword = await hash(newPassword, 10);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: hashedNewPassword,
        version: { increment: 1 },
      },
    });

    return new UserResponseDto(updatedUser);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
  }
}
