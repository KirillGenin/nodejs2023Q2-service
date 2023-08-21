import {
  Injectable,
  UnauthorizedException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async signUp(authDto: AuthDto) {
    const { login, password } = authDto;
    return await this.userService.create({
      login,
      password,
    });
  }
}
