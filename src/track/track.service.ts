import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Track } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.prisma.track.create({ data: createTrackDto });
  }

  async findAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new HttpException(
        `Track with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    await this.findOne(id);

    return await this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });
  }

  async remove(trackId: string): Promise<void> {
    await this.findOne(trackId);

    const favoritesContainingTrack = await this.prisma.favorite.findMany({
      where: {
        tracks: {
          has: trackId,
        },
      },
    });

    for (const favorite of favoritesContainingTrack) {
      const updatedTracks = favorite.tracks.filter((id) => id !== trackId);
      await this.prisma.favorite.update({
        where: { favoriteId: favorite.favoriteId },
        data: { tracks: updatedTracks },
      });
    }

    await this.prisma.track.delete({ where: { id: trackId } });
  }
}
