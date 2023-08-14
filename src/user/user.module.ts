import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
// import { UserEntity } from './entities/user.entity';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
