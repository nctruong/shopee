import { OrderCancelledEvent } from '@willnguyen/shopee-common'
import { EventNames } from '@willnguyen/shopee-common'
import { Listener } from '@willnguyen/shopee-common';
import { Product } from '../../models/product';
import { ProductUpdatedPublisher } from '../publishers/product-updated-publisher';
import {KafkaMessage} from "kafkajs";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  topic: EventNames.OrderCancelled = EventNames.OrderCancelled;

  async onMessage(data: OrderCancelledEvent['data'], msg: KafkaMessage) {
    const product = await Product.findById(data.product.id);

    if (!product) {
      throw new Error('Product not found');
    }

    product.set({ orderId: undefined });
    await product.save();
    await new ProductUpdatedPublisher(this.kafka).publish({
      id: product.id,
      orderId: product.orderId,
      userId: product.userId,
      price: product.price,
      title: product.title,
      version: product.version,
    });

  }
}
