
import { Kafka } from 'kafkajs'
import {EventNames} from "./event-names";
import { Event } from './event'

export abstract class Publisher<T extends Event> {
  abstract topic: T['topic'];
  protected kafka: Kafka;

  constructor(client: Kafka) {
    this.kafka = client;
  }

  async publish(data: any)  {
    const producer = this.kafka.producer();

    await producer.connect()
    await producer.send({
      topic: this.topic,
      messages: [
        { value: JSON.stringify(data) },
      ]
    })
    await producer.disconnect()
  }
}
