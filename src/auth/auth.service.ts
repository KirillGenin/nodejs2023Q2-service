import {
  Injectable,
  ForbiddenException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';

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

  async signIn(authDto: AuthDto) {
    const { login, password } = authDto;
    const user = await this.userService.getOneByLogin(login);

    const isValidPass = await compare(password, user.password);
    if (!isValidPass) throw new ForbiddenException('Password is wrong');
    
  }
}
