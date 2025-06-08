import { EventNames } from './event-names';

export interface ExpirationCompleteEvent {
  subject: EventNames.ExpirationComplete;
  data: {
    orderId: string;
  };
}
