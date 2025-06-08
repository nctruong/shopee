import { EventNames, Publisher, OrderCancelledEvent } from '@willnguyen/shopee-common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  topic: EventNames.OrderCancelled = EventNames.OrderCancelled;
}
