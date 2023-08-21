import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenAuthDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() authDto: AuthDto) {
    return await this.authService.signUp(authDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() authDto: AuthDto) {
    console.log('from AuthController: login');
    return await this.authService.signIn(authDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshDto: RefreshTokenAuthDto) {
    console.log('from AuthController: refresh');
    return await this.authService.refresh(refreshDto);
  }
}
