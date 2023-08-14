import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import connectionOptions from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(connectionOptions),
    UserModule,
    TrackModule,
    ArtistModule,
    FavsModule,
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
