import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Channels } from './enums/channels';
import { Exchanges } from './enums/exchanges';
import { Queues } from './enums/queues';
import { RoutingKeys } from './enums/routing-keys';

interface PublishMessageProps {
  exchange: string;
  routingKey: string;
  message: any;
}

@Injectable()
export class RabbitMqService implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: Exchanges.apiHealthExchange,
    routingKey: RoutingKeys.newServices,
    queue: Queues.newServices,
    queueOptions: {
      channel: Channels.apiHealthChannel,
    },
  })
  message(message) {
    console.log(`Message received: ${message}`);
  }

  async publishMessage(publishMessageProps: PublishMessageProps) {
    const { exchange, routingKey, message } = publishMessageProps;
    await this.amqpConnection.publish(exchange, routingKey, message);
  }

  onModuleDestroy() {
    console.log('RabbitMqService destroyed');
  }

  onModuleInit() {
    console.log('RabbitMqService initialized');
  }
}
