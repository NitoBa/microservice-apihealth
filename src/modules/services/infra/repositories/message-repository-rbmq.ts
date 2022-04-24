import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { PublishMessageDTO } from '../../application/dtos/publish-message-dto';
import { IMessageRepository } from '../../application/repositories/imessaging-repository';

@Injectable()
export class MessageRepositoryRBMQ implements IMessageRepository {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publishMessage(input: PublishMessageDTO): Promise<void> {
    await this.amqpConnection.publish(
      input.exchange,
      input.routingKey,
      input.message,
    );
  }
}
