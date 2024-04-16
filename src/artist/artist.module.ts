import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [PrismaModule],
})
export class ArtistModule {}
