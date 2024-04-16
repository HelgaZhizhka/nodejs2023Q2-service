import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.prisma.artist.create({
      data: createArtistDto,
    });
  }

  async findAll(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new HttpException(
        `Artist with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    await this.findOne(id);

    return await this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  async remove(artistId: string): Promise<void> {
    await this.findOne(artistId);

    const favoritesContainingArtist = await this.prisma.favorite.findMany({
      where: {
        artists: {
          has: artistId,
        },
      },
    });

    for (const favorite of favoritesContainingArtist) {
      const updatedArtists = favorite.artists.filter((id) => id !== artistId);
      await this.prisma.favorite.update({
        where: { favoriteId: favorite.favoriteId },
        data: { artists: updatedArtists },
      });
    }

    await this.prisma.artist.delete({ where: { id: artistId } });
  }
}
