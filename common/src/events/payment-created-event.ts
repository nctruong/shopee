import { EventNames } from './event-names';

export interface PaymentCreatedEvent {
  subject: EventNames.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}
