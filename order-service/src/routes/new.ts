import express,  { Request, Response, NextFunction} from 'express';
import {OrderStatus, requireAuth, validateRequest} from '@willnguyen/shopee-common';
import { Order } from '../models/order'

const router = express.Router()

router.post('/api/orders', requireAuth, validateRequest,
    async (req: Request, res: Response) => {
        const { userId, products } = req.body;
        const status = OrderStatus.Created;
        const order = new Order({ userId, status, products });
        await order.save();
        res.status(200).json({ status: 'success' });
    }
)

export { router as createOrderRouter }
