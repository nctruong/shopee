import { EventNames } from './event-names';

export interface ProductCreatedEvent extends Event {
  topic: EventNames.ProductCreated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}
