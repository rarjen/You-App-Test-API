import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SendMessageDTO } from './dto/send.message.dto';
import { MessageService } from './message.service';

@WebSocketGateway()
export class ChatGateWay {
  @WebSocketServer()
  server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: SendMessageDTO): Promise<void> {
    await this.messageService.saveMessage(message);

    this.server.emit(message, 'message');
  }
}
