import {EachMessagePayload, Kafka, KafkaMessage, MessageSetEntry} from 'kafkajs'
import { EventNames } from './event-names';
import {Event} from './event';

export abstract class Listener<T extends Event> {
  abstract topic: T['topic'];
  protected group: string = 'shopee';
  protected kafka: Kafka;

  constructor(client: Kafka) {
    this.kafka = client;
  }

  async listen() {
    const consumer = this.kafka.consumer({ groupId: this.group });
    await consumer.connect();
    await consumer.subscribe({ topic: this.topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async (payload:  EachMessagePayload) => {
        const { topic, partition, message } = payload

        console.log({
          topic,
          partition,
          key: message.key?.toString(),
          value: message.value?.toString(),
          offset: message.offset,
        });
      },
    });
  }
}
