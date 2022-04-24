import { InMemoryServiceRepository } from '../../../infra/repositories/inMemory/in-memory-service-repository';
import { GetAllServicesUsecase } from './get-all-services-usecase';

const makeSut = () => {
  const repository = new InMemoryServiceRepository();
  const sut = new GetAllServicesUsecase(repository);
  return {
    sut,
    repository,
  };
};

describe('Get All Services Usecase', () => {
  it('should return a empty list if no one service is found', async () => {
    const { sut } = makeSut();
    const response = await sut.execute();

    expect(response.length).toBe(0);
  });

  it('should return a list if exists', async () => {
    const { sut, repository } = makeSut();

    for (let index = 0; index < 5; index++) {
      repository.services.push({
        id: `service-${index}`,
        addressUrl: `https://my-service-${index}.com`,
      });
    }

    const response = await sut.execute();

    expect(response.length).not.toBe(0);
  });
});
