import { EventNames } from './event-names';
import { OrderStatus } from './order-status';

export interface OrderCreatedEvent extends Event  {
  topic: EventNames.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    product: {
      id: string;
      price: number;
    };
  };
}
