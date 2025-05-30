import { EventNames } from './event-names'

export interface ProductUpdatedEvent extends Event {
  topic: EventNames.ProductUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
    orderId?: string;
  };
}
