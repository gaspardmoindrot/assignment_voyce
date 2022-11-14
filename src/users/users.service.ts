import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/createUsers.dto';
import { UpdateUsersDto } from './dto/updateUsers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Users from './users.entity';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  getAllUsers() {
    return this.usersRepository.find();
  }

  /*async getUsersById(id: number) {
    const users = await this.usersRepository.findOne(id);
    if (users) {
      return users;
    }
    throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
  }*/

  async createUsers(users: CreateUsersDto) {
    const newUsers = await this.usersRepository.create(users);
    await this.usersRepository.save(newUsers);
    return newUsers;
  }

  /*async updateUsers(id: number, users: UpdateUsersDto) {
    await this.usersRepository.update(id, users);
    const updatedUsers = await this.usersRepository.findOne(id);
    if (updatedUsers) {
      return updatedUsers
    }
    throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
  }*/

  async deleteUsers(id: number) {
    const deleteResponse = await this.usersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
  }
}