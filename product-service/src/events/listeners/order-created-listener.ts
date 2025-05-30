import { OrderCreatedEvent } from '../order-created-event'
import { EventNames } from '../event-names'
import { Listener } from '../base-listener';
import { queueGroupName } from './queue-group-name';
import { Product } from '../../models/product';
import { ProductUpdatedPublisher } from '../publishers/product-updated-publisher';
import {KafkaMessage} from "kafkajs";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  topic: EventNames.OrderCreated = EventNames.OrderCreated;

  async onMessage(data: OrderCreatedEvent['data'], msg: KafkaMessage) {
    const product = await Product.findById(data.product.id);

    if (!product) {
      throw new Error('Product not found');
    }

    product.set({ orderId: data.id });

    await product.save();
    await new ProductUpdatedPublisher(this.kafka).publish({
      id: product.id,
      price: product.price,
      title: product.title,
      userId: product.userId,
      orderId: product.orderId,
      version: product.version,
    });

  }
}
