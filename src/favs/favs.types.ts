import { Album } from 'src/album/album.types';
import { Artist } from 'src/artist/artist.types';
import { Track } from 'src/track/track.types';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
