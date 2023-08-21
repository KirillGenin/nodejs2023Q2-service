import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserdDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { NotFoundException } from '../lib/exception';
import { User, UserUpdateConfig } from './user.types';
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async get() {
    return await this.userRepository.find();
  }

  async getOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) throw new NotFoundException(id);
    return user;
  }

  async getOneByLogin(login: string) {
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user)
      throw new ForbiddenException(`User with login ${login} not found`);
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    const user: User = {
      id: uuidv4(),
      login,
      version: 1,
      password: await hash(password, 10),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await this.userRepository.save(user);
    
    return await this.userRepository.findOne({ where: { id: user.id } });
  }

  async update(id: string, updateUserdDto: UpdateUserdDto) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) throw new NotFoundException(id);

    const { oldPassword, newPassword } = updateUserdDto;

    const isValidPass = await compare(oldPassword, user.password);
    if (!isValidPass) throw new ForbiddenException('oldPassword is wrong');

    const config: UserUpdateConfig = {
      password: await hash(newPassword, 10),
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    Object.assign(user, config);

    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) throw new NotFoundException(id);

    await this.userRepository.remove(user);
    return user;
  }
}
