import { PublishMessageDTO } from '../dtos/publish-message-dto';

export interface IMessageRepository {
  publishMessage(input: PublishMessageDTO): Promise<void>;
}
