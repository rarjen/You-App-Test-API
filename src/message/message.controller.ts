import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SendMessageDTO } from './dto/send.message.dto';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('/sendMessage')
  @UseGuards(AuthGuard('jwt'))
  async sendMessage(@Request() req, @Body() sendMessageDTO: SendMessageDTO) {
    try {
      const messageSended = { ...sendMessageDTO, sender_id: req.user.userId };
      const result = await this.messageService.saveMessage(messageSended);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Message saved successfully',
        data: result,
      };
    } catch (error) {
      throw error();
    }
  }

  @Get('/viewMessages')
  @UseGuards(AuthGuard('jwt'))
  async getAllMessages() {
    try {
      const result = await this.messageService.getAllMessages();
      return {
        statusCode: HttpStatus.OK,
        message: 'Success get all messages',
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }
}
