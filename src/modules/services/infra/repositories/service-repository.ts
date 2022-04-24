import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/prisma/prisma.service';
import { CheckServiceStatusDTO } from '../../application/dtos/check-status-dto';
import { IServiceRepository } from '../../application/repositories/iservice-repository';
import { Service } from '../../entities/service';
import { ServiceModel } from '../models/service-model';
import axios from 'axios';

@Injectable()
export class ServiceRepository implements IServiceRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async getAll(): Promise<Service[]> {
    const services = await this.prismaService.service.findMany();

    if (!services) {
      return [];
    }

    return services.map((service) => ServiceModel.fromPrisma(service));
  }

  async getNewService(serviceId: string): Promise<Service> {
    const service = await this.prismaService.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return null;
    }

    return ServiceModel.fromPrisma(service);
  }

  async checkStatus(input: CheckServiceStatusDTO): Promise<boolean> {
    const response = await axios.get(input.addressUrl);
    return response.status === 200;
  }
}
