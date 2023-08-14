import { Module, forwardRef } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackRepository } from './track.repository';
import { FavsModule } from '../favs/favs.module';
// import { TrackEntity } from './entities/track.entity';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // TypeOrmModule.forFeature([TrackEntity]),
    forwardRef(() => FavsModule),
  ],
  controllers: [TrackController],
  providers: [TrackService, TrackRepository],
  exports: [TrackService],
})
export class TrackModule {}
