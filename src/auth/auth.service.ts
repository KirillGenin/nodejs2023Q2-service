import {
  Injectable,
  ForbiddenException,
  forwardRef,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenAuthDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
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
    return await this.createAuthTokens(user.id, login);
  }

  private async createAuthTokens(id: string, login: string) {
    const payload = { sub: id, username: login };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
    });
    console.log('from AuthService: createAuthTokens');
    console.log(`accessToken: ${accessToken}`);
    console.log(`refreshToken: ${refreshToken}`);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshDto: RefreshTokenAuthDto) {
    const { refreshToken } = refreshDto;
    console.log('from AuthService: refresh');
    console.log(`refreshToken: ${refreshToken}`);
    if (!refreshToken) throw new UnauthorizedException();

    let payload: {
      userId: string;
      login: string;
    };

    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      });
    } catch (error) {
      throw new ForbiddenException();
    }

    const user = await this.userService.getOne(payload.userId);
    if (!user) throw new ForbiddenException();

    return await this.createAuthTokens(user.id, user.login);
  }
}
