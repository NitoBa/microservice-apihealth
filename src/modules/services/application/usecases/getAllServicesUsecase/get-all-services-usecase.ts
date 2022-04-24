import { Service } from '../../../entities/service';
import { IServiceRepository } from '../../repositories/iservice-repository';

export class GetAllServicesUsecase {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(): Promise<Service[]> {
    return await this.serviceRepository.getAll();
  }
}
