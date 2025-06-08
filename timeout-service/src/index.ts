import { OrderCreatedListener } from './events/listeners/order-created-listener';
import {kafkaClient} from "./lib/kafka-wrapper";

const start = async () => {

  try {
    new OrderCreatedListener(kafkaClient).listen();
  } catch (err) {
    console.error(err);
  }
};

start();
