import { Service } from './service';

export enum Status {
  UP = 'UP',
  DOWN = 'DOWN',
}

export class ServiceStatus {
  id: string;
  service: Service;
  status: Status;
}
