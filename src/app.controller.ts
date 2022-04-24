import { Controller, Get } from '@nestjs/common';
import { Exchanges } from './modules/messaging/rabbit-mq/enums/exchanges';
import { RoutingKeys } from './modules/messaging/rabbit-mq/enums/routing-keys';
import { RabbitMqService } from './modules/messaging/rabbit-mq/rabbit-mq.service';

@Controller()
export class AppController {
  constructor(private readonly rabbitMqService: RabbitMqService) {}
  @Get()
  async getHello(): Promise<{ message: string }> {
    await this.rabbitMqService.publishMessage({
      exchange: Exchanges.apiHealthExchange,
      routingKey: RoutingKeys.newServices,
      message: 'Hello World!',
    });
    return {
      message: 'Hello World!',
    };
  }
}
