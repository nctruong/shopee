import { Listener, OrderCreatedEvent, EventNames } from '@willnguyen/shopee-common';
import { timeoutQueue } from '../../queues/timeout-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  topic: EventNames.OrderCreated = EventNames.OrderCreated;

  async onMessage(data: OrderCreatedEvent['data'], msg: string) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Waiting this many milliseconds to process the job:', delay);

    await timeoutQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      }
    );

  }
}
