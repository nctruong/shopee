// kafka-wrapper.ts
import { Kafka } from 'kafkajs';

const kafka = new Kafka({ brokers: ['kafka:9092'] });

export const kafkaClient = kafka;
