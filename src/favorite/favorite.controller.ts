import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.favoriteService.findAll();
  }

  @Post('track/:id')
  @HttpCode(StatusCodes.CREATED)
  async addTrackToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoriteService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrackFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoriteService.removeTrack(id);
  }

  @Post('album/:id')
  @HttpCode(StatusCodes.CREATED)
  async addAlbumToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoriteService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbumFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoriteService.removeAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(StatusCodes.CREATED)
  async addArtistToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoriteService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtistFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.favoriteService.removeArtist(id);
  }
}
