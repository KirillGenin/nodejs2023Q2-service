import { Injectable } from '@nestjs/common';
import { User, UserResponse, UserUpdateConfig } from './user.types';
import { CreateUserDto } from './dto/createUser.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

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
    const { password, ...rest } = user;
    return rest;
  }

  async create(body: CreateUserDto): Promise<UserResponse> {
    const { login, password } = body;

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

  async update(id: string, body: UpdatePasswordDto): Promise<UserResponse> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      console.log(`Пользователь с id ${id} не найден`);
      return {} as UserResponse;
    }

    const { oldPassword, newPassword } = body;

    if (oldPassword !== user.password) {
      console.log(`Пароли не совпадают`);
      return {} as UserResponse;
    }

    const config: UserUpdateConfig = {
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    Object.assign(user, config);

    const { password, ...rest } = user;
    return rest;
  }

  async remove(id: string): Promise<unknown> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      console.log(`Пользователь с id ${id} не найден`);
      return null;
    }

    this.users = this.users.filter((user) => user.id !== id);
    console.log(`Пользователь с id ${id} БЫЛ УДАЛЕН`);
    return null;
  }
}
