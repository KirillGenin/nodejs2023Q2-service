import {
  Injectable,
  ForbiddenException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(authDto: AuthDto) {
    const { login, password } = authDto;
    return await this.userService.create({
      login,
      password,
    });
  }

  async signIn(authDto: AuthDto) {
    const { login, password } = authDto;
    const user = await this.userService.getOneByLogin(login);

    const isValidPass = await compare(password, user.password);
    if (!isValidPass) throw new ForbiddenException('Password is wrong');

    const CRYPT_SALT = this.configService.get('CRYPT_SALT');
    const JWT_SECRET_KEY = this.configService.get('JWT_SECRET_KEY');
    const JWT_SECRET_REFRESH_KEY = this.configService.get(
      'JWT_SECRET_REFRESH_KEY',
    );
    const TOKEN_EXPIRE_TIME = this.configService.get('TOKEN_EXPIRE_TIME');
    const TOKEN_REFRESH_EXPIRE_TIME = this.configService.get(
      'TOKEN_REFRESH_EXPIRE_TIME',
    );
    console.log(`CRYPT_SALT: ${CRYPT_SALT}`);
    console.log(`JWT_SECRET_KEY: ${JWT_SECRET_KEY}`);
    console.log(`JWT_SECRET_REFRESH_KEY: ${JWT_SECRET_REFRESH_KEY}`);
    console.log(`TOKEN_EXPIRE_TIME: ${TOKEN_EXPIRE_TIME}`);
    console.log(`TOKEN_REFRESH_EXPIRE_TIME: ${TOKEN_REFRESH_EXPIRE_TIME}`);
  }
}
