import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDTO } from './dto/register.user.dto';
import { LoginUserDTO } from './dto/login.user.dto';
import { CreateProfileDTO } from './dto/create.profile.user.dto';
import { UpdateProfileDTO } from './dto/update.profile.user.dto';

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
      throw error;
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
      throw error;
    }
  }

  @Post('/createProfile')
  async createProfile(@Body() payload: CreateProfileDTO) {
    try {
      const result = await this.usersService.createProfileUser(payload);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Success save profile',
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch('/updateProfile/:id')
  async updateProfile(
    @Param('id') id: string,
    @Body() payload: UpdateProfileDTO,
  ) {
    try {
      const result = await this.usersService.updateProfileUser(id, payload);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success update profile',
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }
}
