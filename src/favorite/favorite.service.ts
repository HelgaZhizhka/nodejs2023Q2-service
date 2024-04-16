import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { Entities, EntityToTable } from '../utils/enums';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  private createFavorites() {
    return this.prisma.favorite.create({
      data: {
        artists: [],
        albums: [],
        tracks: [],
      },
    });
  }

  async findAll() {
    let favorites = await this.prisma.favorite.findFirst();

    if (!favorites) {
      favorites = await this.createFavorites();
    }

    const [tracks, albums, artists] = await Promise.all([
      this.findAllEntities(favorites.tracks, 'track'),
      this.findAllEntities(favorites.albums, 'album'),
      this.findAllEntities(favorites.artists, 'artist'),
    ]);

    return { tracks, albums, artists };
  }

  private async findAllEntities(entity: string[], entityName: string) {
    return (
      await Promise.all(
        entity.map((id) =>
          this.prisma[entityName].findUnique({ where: { id } }),
        ),
      )
    ).filter((e) => e !== null);
  }

  private async checkEntity(entity: Entities, id: string) {
    const entityToFavorite = await this.prisma[
      EntityToTable[entity]
    ].findUnique({
      where: { id },
    });

    if (!entityToFavorite) {
      throw new HttpException(
        `${entity} with id ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  private async addToFavorites(id: string, entity: Entities) {
    await this.checkEntity(entity, id);
    let favorites = await this.prisma.favorite.findFirst();

    if (!favorites) {
      favorites = await this.createFavorites();
    }

    if (!favorites[entity].includes(id)) {
      await this.prisma.favorite.update({
        where: { favoriteId: favorites.favoriteId },
        data: {
          [entity]: {
            set: [...favorites[entity], id],
          },
        },
      });
    } else {
      throw new HttpException(
        `${entity} with id ${id} already exists in favorites`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  private async removeFromFavorites(id: string, entity: Entities) {
    await this.checkEntity(entity, id);
    let favorites = await this.prisma.favorite.findFirst();

    if (!favorites) {
      favorites = await this.createFavorites();
    }

    if (favorites[entity].includes(id)) {
      await this.prisma.favorite.update({
        where: { favoriteId: favorites.favoriteId },
        data: {
          [entity]: {
            set: favorites[entity].filter((entityId) => entityId !== id),
          },
        },
      });
    } else {
      throw new HttpException(
        `${entity} with id ${id} does not exist in favorites`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  addArtist(id: string) {
    return this.addToFavorites(id, Entities.ARTISTS);
  }

  removeArtist(id: string) {
    return this.removeFromFavorites(id, Entities.ARTISTS);
  }

  addAlbum(id: string) {
    return this.addToFavorites(id, Entities.ALBUMS);
  }

  removeAlbum(id: string) {
    return this.removeFromFavorites(id, Entities.ALBUMS);
  }

  addTrack(id: string) {
    return this.addToFavorites(id, Entities.TRACKS);
  }

  removeTrack(id: string) {
    return this.removeFromFavorites(id, Entities.TRACKS);
  }
}
