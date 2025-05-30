import { EventNames } from './event-names';

export interface OrderCancelledEvent extends Event  {
  topic: EventNames.OrderCancelled;
  data: {
    id: string;
    version: number;
    product: {
      id: string;
    };
  };
}
