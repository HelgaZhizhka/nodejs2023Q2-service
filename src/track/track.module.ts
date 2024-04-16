import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [PrismaModule],
})
export class TrackModule {}
