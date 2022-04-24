import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './presentation/controllers/app.controller';
import { RabbitModule } from '../messaging/rabbit-mq/rabbit-mq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
