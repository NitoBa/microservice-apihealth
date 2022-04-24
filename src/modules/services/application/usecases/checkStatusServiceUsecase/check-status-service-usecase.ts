import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Service } from '../../../entities/service';
import { ServiceStatus, Status } from '../../../entities/service-status';
import { IServiceRepository } from '../../repositories/iservice-repository';

@Injectable()
export class CheckStatusServiceUsecase {
  constructor(
    @Inject('IServiceRepository')
    private readonly serviceRepository: IServiceRepository,
  ) {}

  async execute(service: Service): Promise<ServiceStatus> {
    const serviceStatus = new ServiceStatus();

    const response = await this.serviceRepository.checkStatus({
      addressUrl: service.addressUrl,
    });

    if (response) {
      serviceStatus.status = Status.UP;
    } else {
      serviceStatus.status = Status.DOWN;
    }

    Object.assign(serviceStatus, {
      id: randomUUID(),
      service: service,
    });

    return serviceStatus;
  }
}
