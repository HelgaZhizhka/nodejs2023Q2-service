import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { Track } from '@prisma/client';

import { JwtAuthGuard } from '../auth/guards';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@UseGuards(JwtAuthGuard)
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.trackService.create(createTrackDto);
  }

  @Get()
  async findAll(): Promise<Track[]> {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.trackService.findOne(id);
  }

  @Put(':id')
  @HttpCode(StatusCodes.OK)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return await this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return await this.trackService.remove(id);
  }
}
