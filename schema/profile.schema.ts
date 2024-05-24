import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';

enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

@Schema({ timestamps: true })
export class Profile extends Document {
  @Prop()
  _id: string;

  @Prop()
  display_name: string;

  @Prop({ enum: Gender })
  gender: string;

  @Prop()
  birthday: string;

  @Prop()
  horoscope?: string;

  @Prop()
  zodiac?: string;

  @Prop()
  height: number;

  @Prop()
  heightInCentimenters: string;

  @Prop()
  heightInFeet: string;

  @Prop()
  weight: number;

  @Prop()
  weightInKilograms: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
