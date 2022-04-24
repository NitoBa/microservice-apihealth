import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServicesModule } from '../services/services.module';
import { AppController } from './presentation/controllers/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    ServicesModule,
  ],
  exports: [EventEmitterModule.forRoot()],
  controllers: [AppController],
})
export class AppModule {}
