import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserResponse } from './user.types';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async get() {
    return await this.userRepository.find();
  }

  async getOne(id: string) {
    return await this.userRepository.findOne(id);
  }

  async create(body: CreateUserDto) {
    return await this.userRepository.create(body);
  }

  async update(id: string, body: UpdatePasswordDto) {
    return await this.userRepository.update(id, body);
  }

  async remove(id: string) {
    return await this.userRepository.remove(id);
  }
}
