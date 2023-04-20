import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() user: Partial<User>): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: number, @Body() user: User): User {
    return this.usersService.updateUser(id, user);
  }

  @Post('/login')
  @UseGuards(AuthGuard)
  async login(@Body() user: Partial<User>): Promise<User> {
    return this.usersService.checkLogin(user);
  }
}
