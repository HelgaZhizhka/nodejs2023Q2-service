import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.prisma.album.create({ data: createAlbumDto });
  }

  async findAll(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new HttpException(
        `Album with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    await this.findOne(id);

    return await this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });
  }

  async remove(albumId: string): Promise<void> {
    await this.findOne(albumId);

    const favoritesContainingAlbum = await this.prisma.favorite.findMany({
      where: {
        albums: {
          has: albumId,
        },
      },
    });

    for (const favorite of favoritesContainingAlbum) {
      const updatedAlbums = favorite.albums.filter((id) => id !== albumId);
      await this.prisma.favorite.update({
        where: { favoriteId: favorite.favoriteId },
        data: { albums: updatedAlbums },
      });
    }

    await this.prisma.album.delete({ where: { id: albumId } });
  }
}
