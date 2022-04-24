import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { CheckStatusServiceUsecase } from './application/usecases/checkStatusServiceUsecase/check-status-service-usecase';
import { GetAllServicesUsecase } from './application/usecases/getAllServicesUsecase/get-all-services-usecase';
import { InsertNewServiceUsecase } from './application/usecases/insertNewServiceUsecase/insert-new-service-usecase';
import { ServicesInMemory } from './entities/services-in-memory';
import { createRabbitMqConfig } from './external/rabbit-mq/config/rabbit-mq.config';
import { MessageRepositoryRBMQ } from './infra/repositories/message-repository-rbmq';
import { ServiceRepository } from './infra/repositories/service-repository';
import { ServiceController } from './presentation/controllers/service-controller';

@Module({
  imports: [
    DatabaseModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: createRabbitMqConfig,
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: 'IServiceRepository',
      useClass: ServiceRepository,
    },
    {
      provide: 'IServicesInMemory',
      useValue: ServicesInMemory.getInstance,
    },
    {
      provide: 'IMessageRepository',
      useClass: MessageRepositoryRBMQ,
    },
    CheckStatusServiceUsecase,
    GetAllServicesUsecase,
    InsertNewServiceUsecase,
    ServiceController,
  ],
  exports: [
    {
      provide: 'IServiceRepository',
      useClass: ServiceRepository,
    },
  ],
})
export class ServicesModule {}
