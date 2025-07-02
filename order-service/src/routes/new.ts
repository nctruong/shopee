import express, {Request, Response, NextFunction} from 'express';
import {BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest} from '@willnguyen/shopee-common';
import {Order, OrderItem} from '../models/order'
import {OrderCreatedPublisher} from "../events/publishers/order-created-publisher";
import {kafkaClient} from "../lib/kafka-wrapper";
import axiosClient from "../lib/axiosClient";

const router = express.Router()

interface OrderedProduct {
    id: string;
    price: number;
}
const orderedProducts: OrderedProduct[] = []
router.post('/api/orders', requireAuth, validateRequest,
    async (req: Request, res: Response) => {
        const { productId } = req.body;

        // const productRes = await axiosClient.get(`/api/products/${productId}`);
        // if (productRes.status == 200) {
        //     const product = productRes.body
        //     console.log(`product ${product}`)
        // }
        //
        // if (product !== undefined) {
        //     throw new NotFoundError();
        // }

        // Calculate an expiration date for this order
        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + 20);

        const orderItem: OrderItem = {
            productId, quantity: 1, price: 10
        }
        const order = Order.build({
            userId: req.currentUser!.id,
            status: OrderStatus.Created,
            expiresAt: expiration,
            totalPrice: 10,
            orderItems: [ orderItem ]
        });
        await order.save();

        new OrderCreatedPublisher(kafkaClient).publish({
            id: order.id,
            version: order.version,
            status: order.status,
            userId: order.userId,
            expiresAt: order.expiresAt.toISOString(),
            products: orderedProducts
        });

        res.status(200).send(order);
    }
)

export {router as createOrderRouter}
