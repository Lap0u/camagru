import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { emailErrors, passwordErrors, usernameErrors } from './users.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private checkValidUser(user: User, errors: string[]): boolean {
    let err = '';

    err = usernameErrors(user.username);
    if (err) errors.push(err);
    err = emailErrors(user.email);
    if (err) errors.push(err);
    err = passwordErrors(user.password);
    if (err) errors.push(err);
    console.log('validUserErrors', errors);
    console.log('errors.length', errors.length);
    if (errors.length !== 0) return false;
    console.log('ret true');
    return true;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    console.log('createUser', userData);
    const newUser = this.usersRepository.create(userData);
    const errors: string[] = [];
    if (this.checkValidUser(newUser, errors) === false) {
      console.log('bad req sent');
      throw new BadRequestException({ message: errors });
    } else {
      console.log('success');
      return this.usersRepository.save(newUser);
    }
  }

  async checkLogin(user: Partial<User>): Promise<User> {
    const errors: string[] = [];
    const loggedInUser = await this.usersRepository.findOneBy({
      username: user.username,
    });
    if (loggedInUser === null) {
      errors.push('Username not found');
      throw new BadRequestException({ message: errors });
    }
    if (loggedInUser.password !== user.password) {
      errors.push('Incorrect password');
      throw new BadRequestException({ message: errors });
    }
    return loggedInUser;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  updateUser(id: number, user: User): User {
    return user;
  }
}
