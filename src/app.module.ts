import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoriteModule } from './favorite/favorite.module';
import { TrackModule } from './track/track.module';
import { LoggingService } from './logging/logging.service';
import { AuthModule } from './auth/auth.module';
import config from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    UserModule,
    ArtistModule,
    AlbumModule,
    FavoriteModule,
    TrackModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggingService],
})
export class AppModule {}
