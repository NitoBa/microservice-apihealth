import { Service } from '@prisma/client';
import { Service as ServiceEntity } from '../../entities/service';

export class ServiceModel extends ServiceEntity {
  constructor() {
    super();
  }

  public static fromPrisma(service: Service): ServiceModel {
    const serviceModel = new ServiceModel();
    serviceModel.id = service.id;
    serviceModel.addressUrl = service.addressUrl;
    return serviceModel;
  }
}
