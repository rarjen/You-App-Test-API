import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { JwtStrategyModule } from './jwt-strategy/jwt-strategy.module';
import { MessageService } from './message/message.service';
import { MessageModule } from './message/message.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    MessageModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/you_app'),
    MessageModule,
  ],
})
export class AppModule {}
