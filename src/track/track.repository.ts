import { Injectable } from '@nestjs/common';
import { Track } from './track.types';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '../lib/exception';

@Injectable()
export class TrackRepository {
  tracks: Track[];

  constructor() {
    this.tracks = [];
  }

  async findAll(): Promise<Track[]> {
    return this.tracks;
  }

  async findOne(id: string): Promise<Track> {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException(id);
    return track;
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    this.tracks.push(track);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.findOne(id);
    Object.assign(track, updateTrackDto);
    return track;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }

  async updateArtistId(artistId: string) {
    this.tracks = this.tracks.map((track) => ({
      ...track,
      artistId: track.artistId === artistId ? null : track.artistId,
    }));
  }
}
