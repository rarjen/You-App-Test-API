import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Profile, ProfileSchema } from 'schema/profile.schema';
import { Horroscopehelper } from 'src/helpers/horroscope.helpers';
import { ConversionHelper } from 'src/helpers/conversion.helpers';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, Horroscopehelper, ConversionHelper, JwtStrategy],
})
export class UsersModule {}
