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

  @Get('checkBalance/:id')
  getBalance(@Param('id') id: string) {
    return this.usersService.getBalance(Number(id));
  }

  @Post('transferCoin/:idFirst/:idSecond')
  transferCoin(
        @Param('idFirst') idFirst: string,
        @Param('idSecond') idSecond: string,
        @Body() createUsersDto : CreateUsersDto
    ) {
    return this.usersService.transferCoin(Number(idFirst), Number(idSecond), createUsersDto.coin);
  }
 
  @Post()
  async createUsers() {
    return this.usersService.createUsers();
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