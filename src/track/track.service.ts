import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavsService } from '../favs/favs.service';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '../lib/exception';
import { TrackEntity } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './track.types';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    return await this.trackRepository.save(track);
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({ where: { id: id } });
    if (!track) throw new NotFoundException(id);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);
    Object.assign(track, updateTrackDto);
    return await this.trackRepository.save(track);
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    await this.trackRepository.remove(track);
  }

  async updateArtistId(artistId: string) {
    let tracks = await this.trackRepository.find();

    tracks = tracks.map((track) => ({
      ...track,
      artistId: track.artistId === artistId ? null : track.artistId,
    }));

    for (let track of tracks) {
      await this.trackRepository.save(track);
    }
  }

  async updateAlbumId(albumId: string) {
    let tracks = await this.trackRepository.find();

    tracks = tracks.map((track) => ({
      ...track,
      albumId: track.albumId === albumId ? null : track.albumId,
    }));

    for (let track of tracks) {
      await this.trackRepository.save(track);
    }
  }
}
