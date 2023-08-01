import { Injectable } from '@nestjs/common';
import { Favorites } from './favs.types';
import { NotFoundException } from '../lib/exception';

@Injectable()
export class FavoritesRepository {
  favs: Favorites;

  constructor() {
    this.favs = {
      albums: [],
      artists: [],
      tracks: [],
    };
  }

  async findAll(): Promise<Favorites> {
    return this.favs;
  }

  async addTrack(id: string): Promise<void> {
    this.favs.tracks.push(id);
  }

  async removeTrack(id: string): Promise<void> {
    const track = this.favs.tracks.find((trackId) => trackId === id);
    if (!track) throw new NotFoundException(id);
    this.favs.tracks = this.favs.tracks.filter((trackId) => trackId !== id);
  }

  async addArtist(id: string): Promise<void> {
    this.favs.artists.push(id);
  }

  async removeArtist(id: string): Promise<void> {
    const artist = this.favs.artists.find((artistId) => artistId === id);
    if (!artist) throw new NotFoundException(id);
    this.favs.artists = this.favs.artists.filter((artistId) => artistId !== id);
  }

  async addAlbum(id: string): Promise<void> {
    this.favs.albums.push(id);
  }

  async removeAlbum(id: string): Promise<void> {
    const album = this.favs.albums.find((albumId) => albumId === id);
    if (!album) throw new NotFoundException(id);
    this.favs.albums = this.favs.albums.filter((albumId) => albumId !== id);
  }
}
