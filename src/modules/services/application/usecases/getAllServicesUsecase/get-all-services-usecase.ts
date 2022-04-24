import { Inject } from '@nestjs/common';
import { Service } from '../../../entities/service';
import { IServiceRepository } from '../../repositories/iservice-repository';

export class GetAllServicesUsecase {
  constructor(
    @Inject('IServiceRepository')
    private readonly serviceRepository: IServiceRepository,
  ) {}

  async execute(): Promise<Service[]> {
    return await this.serviceRepository.getAll();
  }
}
