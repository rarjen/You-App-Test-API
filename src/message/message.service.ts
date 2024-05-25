import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'schema/message.schema';
import { SendMessageDTO } from './dto/send.message.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async saveMessage(sendMessageDTO: SendMessageDTO): Promise<Message> {
    const createdChat = new this.messageModel({
      ...sendMessageDTO,
      _id: uuidv4(),
      timestamp: new Date(),
    });

    return createdChat.save();
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }
}
