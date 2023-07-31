import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserdDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async get() {
    return await this.userRepository.find();
  }

  async getOne(id: string) {
    return await this.userRepository.findOne(id);
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async update(id: string, updateUserdDto: UpdateUserdDto) {
    return await this.userRepository.update(id, updateUserdDto);
  }

  async remove(id: string) {
    return await this.userRepository.remove(id);
  }
}
