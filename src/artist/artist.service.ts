import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from './artist.repository';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async create(createArtistDto: CreateArtistDto) {
    return this.artistRepository.create(createArtistDto);
  }

  async findAll() {
    return this.artistRepository.findAll();
  }

  async findOne(id: string) {
    return this.artistRepository.findOne(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistRepository.update(id, updateArtistDto);
  }

  async remove(id: string) {
    return this.artistRepository.remove(id);
  }
}
