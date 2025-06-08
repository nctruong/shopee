import {
  EventNames,
  Publisher,
  ExpirationCompleteEvent,
} from '@willnguyen/shopee-common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  topic: EventNames.ExpirationComplete = EventNames.ExpirationComplete;
}
