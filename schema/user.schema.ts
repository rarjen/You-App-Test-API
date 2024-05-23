import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop()
  _id: string;

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  display_name: string;

  @Prop()
  gender: string;

  @Prop()
  birthday: string;

  @Prop()
  horoscope: string;

  @Prop()
  zodiac: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});
