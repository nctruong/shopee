import { Publisher, PaymentCreatedEvent, EventNames } from '@willnguyen/shopee-common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  topic: EventNames.PaymentCreated = EventNames.PaymentCreated;
}
