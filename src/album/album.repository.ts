import { Injectable } from '@nestjs/common';
import { Album } from './album.types';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '../lib/exception';

@Injectable()
export class AlbumRepository {
  albums: Album[];

  constructor() {
    this.albums = [];
  }

  async findAll(): Promise<Album[]> {
    return this.albums;
  }

  async findOne(id: string): Promise<Album> {
    const album = this.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException(id);
    return album;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.albums.push(album);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);
    Object.assign(album, updateAlbumDto);
    return album;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    this.albums = this.albums.filter((album) => album.id !== id);
  }

  async updateArtistId(artistId: string) {
    this.albums = this.albums.map((album) => ({
      ...album,
      artistId: album.artistId === artistId ? null : album.artistId,
    }));
  }
}
