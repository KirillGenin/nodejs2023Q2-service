import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { forwardRef } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [forwardRef(() => UserModule), ConfigModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
