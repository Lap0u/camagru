import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { User } from 'src/entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() user: Partial<User>): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() user: User): User {
    return this.usersService.updateUser(id, user);
  }

  @Post('/login')
  async login(@Body() user: Partial<User>): Promise<User> {
    return this.usersService.checkLogin(user);
  }
}
