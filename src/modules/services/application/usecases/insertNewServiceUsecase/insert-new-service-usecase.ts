import { IServiceRepository } from '../../repositories/iservice-repository';
import { IServicesInMemory } from '../../../entities/services-in-memory';

export class InsertNewServiceUsecase {
  constructor(
    private serviceRepository: IServiceRepository,
    private servicesInMemory: IServicesInMemory,
  ) {}

  async execute(serviceId: string): Promise<void> {
    const service = await this.serviceRepository.getNewService(serviceId);
    if (!service) {
      throw new Error('Service not found');
    }

    this.servicesInMemory.services = [
      ...new Set([...this.servicesInMemory.services, service]),
    ];

    console.log(this.servicesInMemory.services);
  }
}
