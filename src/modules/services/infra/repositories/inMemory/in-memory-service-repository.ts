import { CheckServiceStatusDTO } from 'src/modules/services/application/dtos/check-status-dto';
import { IServiceRepository } from 'src/modules/services/application/repositories/iservice-repository';
import { Service } from 'src/modules/services/entities/service';

export class InMemoryServiceRepository implements IServiceRepository {
  services: Service[] = [];
  status = false;
  async getNewService(serviceId: string): Promise<Service> {
    return this.services.find((service) => service.id === serviceId);
  }
  async checkStatus(input: CheckServiceStatusDTO): Promise<boolean> {
    return this.status;
  }
  async getAll(): Promise<Service[]> {
    return this.services;
  }
}
