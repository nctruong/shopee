// kafka-wrapper.ts
import { Kafka } from 'kafkajs';

const kafka = new Kafka({ brokers: ['localhost:9092'] });

export const kafkaClient = kafka;
