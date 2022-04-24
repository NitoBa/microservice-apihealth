import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createRabbitMqConfig } from './external/rabbit-mq/config/rabbit-mq.config';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: createRabbitMqConfig,
      inject: [ConfigService],
    }),
  ],
})
export class ServicesModule {}
