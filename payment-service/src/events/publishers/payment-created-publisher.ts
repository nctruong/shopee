import { Subjects, Publisher, PaymentCreatedEvent } from '@digital-market/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
