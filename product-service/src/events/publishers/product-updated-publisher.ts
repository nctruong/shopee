import { EventNames } from '../event-names'
import { Publisher } from '../base-publisher'
import { ProductUpdatedEvent } from '../product-updated-event'

export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  topic: EventNames.ProductUpdated = EventNames.ProductUpdated;
}
