import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDTO } from './dto/register.user.dto';
import { LoginUserDTO } from './dto/login.user.dto';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  async register(@Body() payload: RegisterUserDTO) {
    try {
      const newUser = await this.usersService.registerUser(payload);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Success login!',
        data: newUser,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Something went wrong!');
    }
  }

  @Post('/login')
  async login(@Body() payload: LoginUserDTO) {
    try {
      const result = await this.usersService.loginUser(payload);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success register user',
        data: result,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Something went wrong!');
    }
  }
}
