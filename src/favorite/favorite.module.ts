import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [PrismaModule],
})
export class FavoriteModule {}
