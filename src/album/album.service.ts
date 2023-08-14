import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';
import { AlbumEntity } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.types';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '../lib/exception';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    return await this.albumRepository.save(album);
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({ where: { id: id } });
    if (!album) throw new NotFoundException(id);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    Object.assign(album, updateAlbumDto);
    return await this.albumRepository.save(album);
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    await this.albumRepository.remove(artist);
    await this.trackService.updateAlbumId(id);
  }

  async updateArtistId(artistId: string) {
    let albums = await this.albumRepository.find();

    albums = albums.map((album) => ({
      ...album,
      artistId: album.artistId === artistId ? null : album.artistId,
    }));

    for (let album of albums) {
      await this.albumRepository.save(album);
    }
  }
}
