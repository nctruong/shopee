import { Publisher, OrderCreatedEvent, EventNames } from '@willnguyen/shopee-common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  topic: EventNames.OrderCreated = EventNames.OrderCreated;
}
