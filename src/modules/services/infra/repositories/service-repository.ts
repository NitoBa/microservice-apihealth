import { Injectable } from '@nestjs/common';
import { CheckServiceStatusDTO } from '../../application/dtos/check-status-dto';
import { IServiceRepository } from '../../application/repositories/iservice-repository';
import { Service } from '../../entities/service';

@Injectable()
export class ServiceRepository implements IServiceRepository {
  getAll(): Promise<Service[]> {
    throw new Error('Method not implemented.');
  }

  getNewService(serviceId: string): Promise<Service> {
    throw new Error('Method not implemented.');
  }
  checkStatus(input: CheckServiceStatusDTO): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
