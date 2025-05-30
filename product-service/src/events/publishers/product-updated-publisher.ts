import { EventNames } from '@willnguyen/shopee-common'
import { Publisher } from '@willnguyen/shopee-common'
import { ProductUpdatedEvent } from '@willnguyen/shopee-common'

export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  topic: EventNames.ProductUpdated = EventNames.ProductUpdated;
}
