import Queue from 'bull';
import { ExpirationCompletePublisher } from '../events/publishers/expiration-complete-publisher';
import {kafkaClient} from "../lib/kafka-wrapper";

interface Payload {
  orderId: string;
}

const timeoutQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

timeoutQueue.process(async (job) => {
  await new ExpirationCompletePublisher(kafkaClient).publish({
    orderId: job.data.orderId,
  });
});

export { timeoutQueue };
