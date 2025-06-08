import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@digital-market/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
