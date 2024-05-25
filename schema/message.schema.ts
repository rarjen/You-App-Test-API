import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop()
  _id: string;

  @Prop()
  sender_id: string;

  @Prop()
  message: string;

  @Prop()
  timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
