import { EventNames } from '@willnguyen/shopee-common'
import { Publisher } from '@willnguyen/shopee-common'
import {Kafka} from "kafkajs";
import {ProductCreatedEvent} from "@willnguyen/shopee-common";

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  topic: EventNames.ProductCreated = EventNames.ProductCreated;
}
