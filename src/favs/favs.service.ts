import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { FavoritesRepository } from './favs.repository';
import { FavoritesResponse } from './favs.types';
import {
  NotExistAlbumException,
  NotExistArtistException,
  NotExistTrackException,
} from '../lib/exception';

@Injectable()
export class FavsService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
  ) {}

  async findAll(): Promise<FavoritesResponse> {
    const favorites = await this.favoritesRepository.findAll();

    let albums = await this.albumService.findAll();
    albums = albums.filter((album) => favorites.albums.includes(album.id));

    let artists = await this.artistService.findAll();
    artists = artists.filter((album) => favorites.artists.includes(album.id));

    let tracks = await this.trackService.findAll();
    tracks = tracks.filter((album) => favorites.tracks.includes(album.id));

    return {
      albums,
      artists,
      tracks,
    };
  }

  async addTrack(id: string) {
    try {
      await this.trackService.findOne(id);
      await this.favoritesRepository.addTrack(id);
    } catch {
      throw new NotExistTrackException(id);
    }
  }

  async removeTrack(id: string) {
    await this.favoritesRepository.removeTrack(id);
  }

  async addArtist(id: string) {
    try {
      await this.artistService.findOne(id);
      await this.favoritesRepository.addArtist(id);
    } catch {
      throw new NotExistArtistException(id);
    }
  }

  async removeArtist(id: string) {
    await this.favoritesRepository.removeArtist(id);
  }

  async addAlbum(id: string) {
    try {
      await this.albumService.findOne(id);
      await this.favoritesRepository.addAlbum(id);
    } catch {
      throw new NotExistAlbumException(id);
    }
  }

  async removeAlbum(id: string) {
    await this.favoritesRepository.removeAlbum(id);
  }
}
