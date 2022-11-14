import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import UsersService from './users.service';
import { CreateUsersDto } from './dto/createUsers.dto';
import { UpdateUsersDto } from './dto/updateUsers.dto';
 
@Controller('users')
export default class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}
 
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
 
  @Get(':id')
  getUsersById(@Param('id') id: string) {
    return this.usersService.getUsersById(Number(id));
  }
 
  @Post()
  async createUsers(@Body() users: CreateUsersDto) {
    return this.usersService.createUsers(users);
  }
 
  @Put(':id')
  async replaceUsers(@Param('id') id: string, @Body() users: UpdateUsersDto) {
    return this.usersService.updateUsers(Number(id), users);
  }
 
  @Delete(':id')
  async deleteUsers(@Param('id') id: string) {
    this.usersService.deleteUsers(Number(id));
  }
}