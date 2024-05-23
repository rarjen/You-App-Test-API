import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RegisterUserDTO } from './dto/register.user.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../schema/user.schema';
import { Model } from 'mongoose';
import { LoginUserDTO } from './dto/login.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerUserDTO: RegisterUserDTO): Promise<User> {
    const { email, username, password, confirm_password } = registerUserDTO;

    if (password != confirm_password) {
      throw new BadRequestException('Password not match!');
    }

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw new BadRequestException('Email or Username already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new this.userModel({
      _id: uuidv4(),
      email,
      username,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async loginUser(
    loginUserDTO: LoginUserDTO,
  ): Promise<{ accessToken: string }> {
    const { username_or_email, password } = loginUserDTO;

    const user = await this.userModel.findOne({
      $or: [{ email: username_or_email }, { username: username_or_email }],
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
