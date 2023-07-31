import { Injectable, ForbiddenException } from '@nestjs/common';
import { User, UserResponse, UserUpdateConfig } from './user.types';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserdDto } from './dto/update-user.dto';
import { NotFoundException } from 'src/lib/exception';

@Injectable()
export class UserRepository {
  users: User[];

  constructor() {
    this.users = [];
  }

  async find(): Promise<UserResponse[]> {
    return this.users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  async findOne(id: string): Promise<UserResponse> {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException(id);

    const { password, ...rest } = user;
    return rest;
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const { login, password } = createUserDto;

    const user: User = {
      id: uuidv4(),
      login,
      version: 1,
      password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(user);
    const { password: pass, ...rest } = user;
    return rest;
  }

  async update(
    id: string,
    updateUserdDto: UpdateUserdDto,
  ): Promise<UserResponse> {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException(id);

    const { oldPassword, newPassword } = updateUserdDto;

    if (oldPassword !== user.password)
      throw new ForbiddenException('oldPassword is wrong');

    const config: UserUpdateConfig = {
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    Object.assign(user, config);

    const { password, ...rest } = user;
    return rest;
  }

  async remove(id: string): Promise<void> {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException(id);

    this.users = this.users.filter((user) => user.id !== id);
  }
}
