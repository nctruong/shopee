import { EventNames } from './event-names';

export interface ExpirationCompleteEvent {
  topic: EventNames.ExpirationComplete;
  data: {
    orderId: string;
  };
}
