import { Service } from '../../../entities/service';
import { Status } from '../../../entities/service-status';
import { InMemoryServiceRepository } from '../../../infra/repositories/inMemory/in-memory-service-repository';
import { CheckStatusServiceUsecase } from './check-status-service-usecase';

const makeSut = () => {
  const repository = new InMemoryServiceRepository();
  const sut = new CheckStatusServiceUsecase(repository);
  return {
    sut,
    repository,
  };
};

describe('Check Status Service Usecase', () => {
  it('should return status service like UP if service is UP', async () => {
    const { sut, repository } = makeSut();
    repository.status = true;
    const service = new Service();

    Object.assign(service, {
      id: 'service-id',
      addressUrl: 'https://my-service.com',
    });

    const response = await sut.execute(service);

    expect(response.status).toBe(Status.UP);
    expect(response.service.id).toBe('service-id');
    expect(response.service.addressUrl).toBe('https://my-service.com');
  });

  it('should return status service like DOWN if service is DOWN', async () => {
    const { sut, repository } = makeSut();
    repository.status = false;
    const service = new Service();

    Object.assign(service, {
      id: 'service-id',
      addressUrl: 'https://my-service.com',
    });

    const response = await sut.execute(service);

    expect(response.status).toBe(Status.DOWN);
    expect(response.service.id).toBe('service-id');
    expect(response.service.addressUrl).toBe('https://my-service.com');
  });
});
