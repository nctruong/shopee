import { EventNames } from '../event-names'
import { Publisher } from '../base-publisher'
import {Kafka} from "kafkajs";
import {ProductCreatedEvent} from "../product-created-event";

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  topic: EventNames.ProductCreated = EventNames.ProductCreated;
}
