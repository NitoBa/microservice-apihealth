import { ServicesInMemory } from '../../../entities/services-in-memory';
import { InMemoryServiceRepository } from '../../../infra/repositories/inMemory/in-memory-service-repository';
import { InsertNewServiceUsecase } from './insert-new-service-usecase';

const makeSut = () => {
  const servicesInMemory = ServicesInMemory.getInstance;
  const repository = new InMemoryServiceRepository();
  const sut = new InsertNewServiceUsecase(repository, servicesInMemory);
  return {
    sut,
    repository,
    servicesInMemory,
  };
};

describe('Check Status Service Usecase', () => {
  it('should return a error if service not found', async () => {
    const { sut } = makeSut();
    const response = sut.execute('any_service_id');

    await expect(response).rejects.toThrow('Service not found');
  });

  it('should add a new service in services in memory', async () => {
    const { sut, repository, servicesInMemory } = makeSut();

    repository.services.push({
      id: 'any_service_id',
      addressUrl: 'any_address_url',
    });

    await sut.execute('any_service_id');
    await sut.execute('any_service_id');
    await sut.execute('any_service_id');

    expect(servicesInMemory.services).toHaveLength(1);
  });
});
