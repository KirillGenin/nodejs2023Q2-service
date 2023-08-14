import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { FavsService } from 'src/favs/favs.service';
import { ArtistEntity } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artist.types';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '../lib/exception';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    return this.artistRepository.save(artist);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id: id } });
    if (!artist) throw new NotFoundException(id);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);
    Object.assign(artist, updateArtistDto);
    return this.artistRepository.save(artist);
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    await this.artistRepository.remove(artist);

    this.trackService.updateArtistId(id);
    this.albumService.updateArtistId(id);
  }
}
