import { Service } from '../../entities/service';
import { ServiceStatus } from '../../entities/service-status';
import { CheckServiceStatusDTO } from '../dtos/check-status-dto';

export interface IServiceRepository {
  getNewService(serviceId: string): Promise<Service>;
  checkStatus(input: CheckServiceStatusDTO): Promise<boolean>;
  getAll(): Promise<Service[]>;
}
