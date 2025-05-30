import { Kafka, Producer } from 'kafkajs';
import { ProductCreatedPublisher } from '../publishers/product-created-publisher';
import { EventNames } from '../event-names';

describe('Publisher', () => {
    let mockProducer: jest.Mocked<Producer>;
    let publisher: ProductCreatedPublisher;

    beforeEach(() => {
        // Mock Kafka producer methods
        mockProducer = {
            connect: jest.fn(),
            send: jest.fn(),
            disconnect: jest.fn(),
        } as unknown as jest.Mocked<Producer>;

        // Mock Kafka client
        const mockKafka = {
            producer: () => mockProducer,
        } as unknown as Kafka;

        // Create publisher instance
        publisher = new ProductCreatedPublisher(mockKafka);
    });

    it('should publish a message', async () => {
        const data = { foo: 'bar' };

        await publisher.publish(data);

        expect(mockProducer.connect).toHaveBeenCalled();
        expect(mockProducer.send).toHaveBeenCalledWith({
            topic: EventNames.ProductCreated,
            messages: [{ value: JSON.stringify(data) }],
        });
        expect(mockProducer.disconnect).toHaveBeenCalled();
    });
});
