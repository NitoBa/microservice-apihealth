import { Service } from './service';

export interface IServicesInMemory {
  services: Service[];
}

export class ServicesInMemory implements IServicesInMemory {
  services: Service[] = [];
  private static instance: ServicesInMemory;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static get getInstance(): ServicesInMemory {
    if (!ServicesInMemory.instance) {
      ServicesInMemory.instance = new ServicesInMemory();
    }
    return ServicesInMemory.instance;
  }
}
