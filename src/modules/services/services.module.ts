import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { CheckStatusServiceUsecase } from './application/usecases/checkStatusServiceUsecase/check-status-service-usecase';
import { GetAllServicesUsecase } from './application/usecases/getAllServicesUsecase/get-all-services-usecase';
import { InsertNewServiceUsecase } from './application/usecases/insertNewServiceUsecase/insert-new-service-usecase';
import { ServicesInMemory } from './entities/services-in-memory';
import { createRabbitMqConfig } from './external/rabbit-mq/config/rabbit-mq.config';
import { ServiceRepository } from './infra/repositories/service-repository';

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
    CheckStatusServiceUsecase,
    GetAllServicesUsecase,
    InsertNewServiceUsecase,
  ],
  exports: [ServiceRepository],
})
export class ServicesModule {}
