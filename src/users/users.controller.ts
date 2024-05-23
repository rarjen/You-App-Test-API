import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
    this.usersService = usersService;
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post('/register')
  register(
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('confirm_password') confirm_password: string,
  ) {
    return this.usersService.register(
      email,
      username,
      password,
      confirm_password,
    );
  }
}
