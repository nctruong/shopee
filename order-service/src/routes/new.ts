import express, {Request, Response, NextFunction} from 'express';
import {OrderStatus, requireAuth, validateRequest} from '@willnguyen/shopee-common';
import {Order} from '../models/order'
import {OrderCreatedPublisher} from "../events/publishers/order-created-publisher";
import {kafkaClient} from "../lib/kafka-wrapper";

const router = express.Router()

interface OrderedProduct {
    id: string;
    price: number;
}
const orderedProducts: OrderedProduct[] = []
router.post('/api/orders', requireAuth, validateRequest,
    async (req: Request, res: Response) => {
        const {userId, products} = req.body;
        const status = OrderStatus.Created;
        const order = new Order({userId, status, products});
        await order.save();

        products.forEach((product: OrderedProduct) => {
            orderedProducts.push(product);
        })

        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() + 20);

        new OrderCreatedPublisher(kafkaClient).publish({
            id: order.id,
            version: order.version,
            status: order.status,
            userId: order.userId,
            expiresAt: expiresAt,
            products: orderedProducts
        });

        res.status(200).send(order);
    }
)

export {router as createOrderRouter}
