import { Controller, Get } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class AppController {
  constructor(private eventEmitter: EventEmitter2) {}

  @Get('/')
  addService() {
    return {
      message: 'Hello World!',
    };
  }

  @Get('/stop')
  stop() {
    this.eventEmitter.emit('notifier.remote', true);
    return {
      message: 'Stopped',
    };
  }

  @Get('/start')
  start() {
    this.eventEmitter.emit('notifier.remote', false);
    return {
      message: 'Started',
    };
  }
}
