import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackRepository } from './track.repository';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.trackRepository.create(createTrackDto);
  }

  async findAll() {
    return await this.trackRepository.findAll();
  }

  async findOne(id: string) {
    return await this.trackRepository.findOne(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return await this.trackRepository.update(id, updateTrackDto);
  }

  async remove(id: string) {
    await this.trackRepository.remove(id);
  }

  async updateArtistId(artistId: string) {
    this.trackRepository.updateArtistId(artistId);
  }
}
