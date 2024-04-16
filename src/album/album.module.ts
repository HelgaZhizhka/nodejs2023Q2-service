import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [PrismaModule],
})
export class AlbumModule {}
