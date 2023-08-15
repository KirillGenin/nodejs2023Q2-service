import { DataSourceOptions } from 'typeorm';
import { AlbumEntity } from './src/album/entities/album.entity';
import { ArtistEntity } from './src/artist/entities/artist.entity';
import { FavsEntity } from './src/favs/entities/favs.entity';
import { TrackEntity } from './src/track/entities/track.entity';
import { UserEntity } from './src/user/entities/user.entity';

const ormconfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  host: process.env.POSTGRES_HOST,
  port: Number.parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [AlbumEntity, ArtistEntity, FavsEntity, TrackEntity, UserEntity],
  synchronize: true,
  logging: true,
  logger: 'debug',
};

export default ormconfig;
