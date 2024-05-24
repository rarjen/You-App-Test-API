import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDTO } from './dto/register.user.dto';
import { LoginUserDTO } from './dto/login.user.dto';
import { CreateProfileDTO } from './dto/create.profile.user.dto';
import { UpdateProfileDTO } from './dto/update.profile.user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

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
        message: 'Success login',
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('/getProfile')
  @UseGuards(AuthGuard('jwt'))
  async getProfileUser(@GetUser() user: any) {
    try {
      const result = await this.usersService.getProfileUser(user.userId);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Success get profile',
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('/createProfile')
  @UseGuards(AuthGuard('jwt'))
  async createProfile(@GetUser() user: any, @Body() payload: CreateProfileDTO) {
    try {
      const result = await this.usersService.createProfileUser(
        user.userId,
        payload,
      );

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Success save profile',
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('/createProfile')
  @UseGuards(AuthGuard('jwt'))
  @Patch('/updateProfile')
  async updateProfile(@GetUser() user: any, @Body() payload: UpdateProfileDTO) {
    try {
      const result = await this.usersService.updateProfileUser(
        user.id,
        payload,
      );

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
