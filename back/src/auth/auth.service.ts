import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const errors: string[] = [];
    if (user === null) {
      errors.push('Username not found');
      throw new BadRequestException({ message: errors });
    } else if (user.password !== pass) {
      errors.push('Incorrect password');
      throw new BadRequestException({ message: errors });
    }
    const payload = { username: user.username, sub: user.token };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
