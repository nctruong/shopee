import express,  { Request, Response, NextFunction} from 'express';
import { requireAuth, validateRequest } from '@willnguyen/shopee-common';
import {Order} from "../models/order";

const router = express.Router()

router.get('/api/orders', requireAuth, validateRequest,
    async (req: Request, res: Response) => {
        const orders = await Order.find()
        console.log(orders)
        res.send(orders);
    }
)

export { router as indexOrderRouter }
