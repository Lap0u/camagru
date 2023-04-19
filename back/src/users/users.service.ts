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

  async checkValidUser(user: User, errors: string[]): Promise<boolean> {
    let err = '';

    err = usernameErrors(user.username);
    if (err) errors.push(err);
    else if (
      (await this.usersRepository.findOne({
        where: { username: user.username },
      })) !== null
    )
      errors.push('Username already exists');
    err = emailErrors(user.email);
    if (err) errors.push(err);
    else if (
      (await this.usersRepository.findOne({ where: { email: user.email } })) !==
      null
    )
      errors.push('Email is already in use');
    err = passwordErrors(user.password);
    if (err) errors.push(err);
    if (errors.length !== 0) return false;
    return true;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    const errors: string[] = [];
    console.log('newUser', newUser);
    if ((await this.checkValidUser(newUser, errors)) === false) {
      console.log('badReq', errors);
      throw new BadRequestException({ message: errors });
    } else {
      console.log('User successfully created', newUser);
      return this.usersRepository.save(newUser);
    }
  }

  async checkLogin(user: Partial<User>): Promise<User> {
    const errors: string[] = [];
    const loggedInUser = await this.usersRepository.findOne({
      where: {
        username: user.username,
      },
    });
    console.log(loggedInUser, 'loggedInUser');
    if (loggedInUser === null) {
      errors.push('Username not found');
      throw new BadRequestException({ message: errors });
    } else if (loggedInUser.password !== user.password) {
      errors.push('Incorrect password');
      throw new BadRequestException({ message: errors });
    } else return loggedInUser;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  updateUser(id: number, user: User): User {
    return user;
  }
}
