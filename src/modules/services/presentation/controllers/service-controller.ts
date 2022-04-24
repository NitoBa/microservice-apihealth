import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Inject, OnApplicationBootstrap } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { delay } from '../../../../shared/utils/delay';
import { NewServiceDTO } from '../../application/dtos/new-service-dto';
import { IMessageRepository } from '../../application/repositories/imessaging-repository';
import { CheckStatusServiceUsecase } from '../../application/usecases/checkStatusServiceUsecase/check-status-service-usecase';
import { GetAllServicesUsecase } from '../../application/usecases/getAllServicesUsecase/get-all-services-usecase';
import { InsertNewServiceUsecase } from '../../application/usecases/insertNewServiceUsecase/insert-new-service-usecase';
import { IServicesInMemory } from '../../entities/services-in-memory';
import { Exchanges } from '../../external/rabbit-mq/enums/exchanges';
import { Queues } from '../../external/rabbit-mq/enums/queues';
import { RoutingKeys } from '../../external/rabbit-mq/enums/routing-keys';

export class ServiceController implements OnApplicationBootstrap {
  constructor(
    private readonly checkStatusServiceUsecase: CheckStatusServiceUsecase,
    private readonly getAllServicesUsecase: GetAllServicesUsecase,
    private readonly insertNewServiceUsecase: InsertNewServiceUsecase,
    @Inject('IMessageRepository')
    private readonly messageRepository: IMessageRepository,
    @Inject('IServicesInMemory')
    private readonly servicesInMemory: IServicesInMemory,
  ) {}

  private stopNotifier = false;

  async onApplicationBootstrap() {
    await this.initService();
  }

  @OnEvent('notifier.remote')
  private async handleNotifyEvent(stopNotifier: boolean) {
    this.stopNotifier = stopNotifier;

    if (!stopNotifier) {
      this.listenStatusService();
    }
  }

  private async initService() {
    const services = await this.getAllServicesUsecase.execute();
    console.log(services.length);
    if (services.length === 0) {
      return;
    }

    for await (const service of services) {
      await this.insertNewServiceUsecase.execute(service.id);
    }

    this.handleNotifyEvent(false);
    this.listenStatusService();
  }

  @RabbitSubscribe({
    exchange: Exchanges.apiHealthExchange,
    routingKey: RoutingKeys.newServices,
    queue: Queues.newServices,
  })
  private async newService(message: NewServiceDTO): Promise<void> {
    try {
      console.log('new service called');
      await this.insertNewServiceUsecase.execute(message.serviceId);
    } catch (error) {
      console.error(error);
    }
  }

  private async listenStatusService(): Promise<void> {
    // console.log(this.stopNotifier);
    try {
      if (this.stopNotifier) return;
      const services = this.servicesInMemory.services;
      if (services.length === 0) {
        return;
      }

      for await (const service of services) {
        const status = await this.checkStatusServiceUsecase.execute(service);
        console.log(status);
        await this.messageRepository.publishMessage({
          message: JSON.stringify(status),
          routingKey: RoutingKeys.statusService,
          exchange: Exchanges.apiHealthExchange,
          queue: Queues.serviceStatus,
        });
      }
      await delay(10000);
      await this.listenStatusService();
    } catch (error) {
      console.error(error);
      this.handleNotifyEvent(true);
    }
  }
}
