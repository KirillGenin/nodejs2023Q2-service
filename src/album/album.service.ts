import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './album.repository';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumRepository.create(createAlbumDto);
  }

  async findAll() {
    return await this.albumRepository.findAll();
  }

  async findOne(id: string) {
    return await this.albumRepository.findOne(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return await this.albumRepository.update(id, updateAlbumDto);
  }

  async remove(id: string) {
    await this.albumRepository.remove(id);
    this.trackService.updateAlbumId(id);
  }

  async updateArtistId(artistId: string) {
    this.albumRepository.updateArtistId(artistId);
  }
}
