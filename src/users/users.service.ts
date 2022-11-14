import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/createUsers.dto';
import Users from './users.entity';
import { UpdateUsersDto } from './dto/updateUsers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  getAllUsers() {
    return this.usersRepository.find();
  }

  async getUsersById(id: number) {
    const users = await this.usersRepository.findOne({where: {id: id}});
    if (users) {
      return users;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async getBalance(id: number) {
    const users = await this.usersRepository.findOne({where: {id: id}});
    if (users) {
      return users.coin;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async createUsers() {
    const newUsers = await this.usersRepository.create();
    newUsers.coin = 100
    await this.usersRepository.save(newUsers);
    return newUsers;
  }

  async updateUsers(id: number, users: UpdateUsersDto) {
    await this.usersRepository.update(id, users);
    const updatedUsers = await this.usersRepository.findOne({where: {id: id}});
    if (updatedUsers) {
      return updatedUsers
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async transferCoin(idFirst: number, idSecond: number, coin: number) {
    const updatedUser1 = await this.usersRepository.findOne({where: {id: idFirst}});
    const updatedUser2 = await this.usersRepository.findOne({where: {id: idSecond}});

    (await updatedUser1).coin -= coin;
    (await updatedUser2).coin += coin;

    if (updatedUser1 && updatedUser2 && updatedUser1.coin - coin >= 0) {
        await this.usersRepository.update(idFirst, updatedUser1);
        await this.usersRepository.update(idSecond, updatedUser2);
        return updatedUser1
    }
    throw new HttpException('One of the users not found or the amount is too big for the user', HttpStatus.NOT_FOUND);
  }

  async deleteUsers(id: number) {
    const deleteResponse = await this.usersRepository.delete(id);
    if (!deleteResponse) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}