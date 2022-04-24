import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/prisma/prisma.service';
import { CheckServiceStatusDTO } from '../../application/dtos/check-status-dto';
import { IServiceRepository } from '../../application/repositories/iservice-repository';
import { Service } from '../../entities/service';

@Injectable()
export class ServiceRepository implements IServiceRepository {
  constructor(private readonly prismaService: PrismaService) {}
  getAll(): Promise<Service[]> {
    throw new Error('Method not implemented.');
  }

  getNewService(serviceId: string): Promise<Service> {
    throw new Error('Method not implemented.');
  }
  async checkStatus(input: CheckServiceStatusDTO): Promise<boolean> {
    const response = await fetch(input.addressUrl);
    return response.status === 200;
  }
}
