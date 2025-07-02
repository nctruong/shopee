import { EventNames } from './event-names';

export interface PaymentCreatedEvent {
  topic: EventNames.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}
