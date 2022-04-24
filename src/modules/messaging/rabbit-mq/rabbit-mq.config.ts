import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';
import { Channels } from './enums/channels';
import { Exchanges } from './enums/exchanges';

export const createRabbitMqConfig = (configService: ConfigService) => {
  const config: RabbitMQConfig = {
    exchanges: [
      {
        name: Exchanges.apiHealthExchange,
        type: 'direct',
      },
    ],
    channels: {
      [Channels.apiHealthChannel]: {
        default: true,
      },
    },
    uri: configService.get<string>('RABBITMQ_CONNECTION_URL'),
    connectionInitOptions: { wait: true },
  };
  return config;
};
