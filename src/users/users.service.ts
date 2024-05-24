import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RegisterUserDTO } from './dto/register.user.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../schema/user.schema';
import { Model } from 'mongoose';
import { LoginUserDTO } from './dto/login.user.dto';
import { CreateProfileDTO } from './dto/create.profile.user.dto';
import { Profile } from 'schema/profile.schema';
import { Horroscopehelper } from '../helpers/horroscope.helpers';
import { ConversionHelper } from 'src/helpers/conversion.helpers';
import { UpdateProfileDTO } from './dto/update.profile.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
    private readonly horrosCopeService: Horroscopehelper,
    private readonly conversionHelper: ConversionHelper,
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

  async createProfileUser(
    createProfileUserDTO: CreateProfileDTO,
  ): Promise<Profile> {
    const { display_name, gender, birthday, weight, height } =
      createProfileUserDTO;

    const birthdayConvertToDate = new Date(birthday);
    const heightConverstionToFeet =
      this.conversionHelper.convertCmToFeet(height);

    const result = new this.profileModel({
      _id: uuidv4(),
      display_name,
      gender,
      birthday,
      horoscope: this.horrosCopeService.getWesternHoroscope(
        birthdayConvertToDate,
      ),
      zodiac: this.horrosCopeService.getChineseZodiac(
        birthdayConvertToDate.getFullYear(),
      ),
      weight,
      weightInKilograms: `${weight} Kg`,
      height,
      heightInCentimenters: `${height} Cm`,
      heightInFeet: `${heightConverstionToFeet} Feet`,
    });
    return result.save();
  }

  async updateProfileUser(
    id: string,
    updateProfileDTO: UpdateProfileDTO,
  ): Promise<Profile> {
    const { display_name, gender, birthday, weight, height } = updateProfileDTO;

    const birthdayConvertToDate = new Date(birthday);
    const heightConverstionToFeet =
      this.conversionHelper.convertCmToFeet(height);

    const result = await this.profileModel.findByIdAndUpdate(
      id,
      {
        display_name,
        gender,
        birthday,
        horoscope: this.horrosCopeService.getWesternHoroscope(
          birthdayConvertToDate,
        ),
        zodiac: this.horrosCopeService.getChineseZodiac(
          birthdayConvertToDate.getFullYear(),
        ),
        weight,
        weightInKilograms: `${weight} Kg`,
        height,
        heightInCentimenters: `${height} Cm`,
        heightInFeet: `${heightConverstionToFeet} Feet`,
      },
      { new: true },
    );

    if (!result) {
      throw new NotFoundException(`Profile with ID "${id}" not found`);
    }

    return result;
  }
}
