import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { JwtStrategyModule } from './jwt-strategy/jwt-strategy.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/you_app'),
  ],
})
export class AppModule {}
