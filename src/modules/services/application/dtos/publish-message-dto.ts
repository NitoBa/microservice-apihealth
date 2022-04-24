export type PublishMessageDTO = {
  message: any;
  routingKey: string;
  exchange: string;
  queue: string;
};
